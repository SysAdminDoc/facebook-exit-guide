import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const catalog = JSON.parse(await readFile(new URL('../migration-snippets.json', import.meta.url), 'utf8'));
const script = html.match(/<script>\s*([\s\S]*?)\s*<\/script>/)?.[1];

test('single-file application script parses', () => {
  assert.ok(script, 'inline application script should exist');
  assert.doesNotThrow(() => new Function(script));
});

test('roadmap feature controls and handlers are present', () => {
  for (const id of ['fbDataFile', 'passwordExportFiles', 'reminderAppSelect', 'evidenceAppSelect', 'difficultyDirectory']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  for (const handler of ['parseFacebookExport', 'parsePasswordExports', 'loadCommunitySnippets', 'scheduleReminder', 'addEvidenceText', 'addEvidenceFile', 'switchProfile']) {
    assert.match(html, new RegExp(`window\\.${handler}\\s*=`));
  }
});

test('community catalog has validated service entries', () => {
  assert.ok(Array.isArray(catalog.services) && catalog.services.length > 0);
  for (const service of catalog.services) {
    assert.equal(typeof service.name, 'string');
    assert.ok(['easy', 'medium', 'hard', 'locked'].includes(service.difficulty));
    assert.ok(Array.isArray(service.steps) && service.steps.length > 0);
  }
});

test('profiles keep checklist data isolated', () => {
  class FakeElement {
    constructor(id = '') {
      this.id = id;
      this.value = '';
      this.innerHTML = '';
      this.textContent = '';
      this.style = {};
      this.dataset = {};
      this.files = [];
      this.classList = {
        add: () => {},
        remove: () => {},
        toggle: () => {},
        contains: () => false
      };
    }

    addEventListener() {}
    appendChild() {}
    remove() {}
    focus() {}
    select() {}
    querySelector() { return new FakeElement(); }
  }

  const ids = [
    'activityLog', 'appNameInput', 'appNotes', 'appPriority', 'breakEmpty', 'breakList',
    'categoryProgress', 'checklist', 'checklistActions', 'communityStatus', 'confirmModal',
    'difficultyDirectory', 'emptyState', 'evidenceAppSelect', 'evidenceFile', 'evidenceList',
    'evidenceText', 'exportArea', 'exportText', 'fbDataFile', 'fbEmailInput', 'importResults',
    'languageSelect', 'modalConfirm', 'modalMessage', 'modalTitle', 'passwordExportFiles',
    'profileNameInput', 'profileSelect', 'progressFill', 'progressPct', 'regretActive',
    'regretCountdown', 'regretStatus', 'reminderAppSelect', 'reminderDaysInput', 'reminderList',
    'statCompleted', 'statRemaining', 'statTotal', 'themeSelect', 'toastStack'
  ];
  const elements = new Map(ids.map(id => [id, new FakeElement(id)]));
  elements.get('appPriority').value = 'important';
  elements.get('languageSelect').value = 'en';
  elements.get('themeSelect').value = 'dark';
  const tabs = [new FakeElement('tab-discover'), new FakeElement('tab-apps')];
  tabs.forEach((tab, index) => { tab.dataset.tab = index ? 'my-apps' : 'discover'; });
  const documentStub = {
    body: new FakeElement('body'),
    documentElement: { lang: 'en' },
    getElementById: id => elements.get(id) || new FakeElement(id),
    querySelector: selector => selector === 'meta[name="theme-color"]' ? new FakeElement('meta') : null,
    querySelectorAll: selector => selector === '.tab' ? tabs : [],
    createElement: () => {
      const element = new FakeElement();
      Object.defineProperty(element, 'innerHTML', {
        get() { return element.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); },
        set(value) { element.textContent = String(value); }
      });
      return element;
    },
    addEventListener() {}
  };
  const storage = new Map();
  const localStorageStub = {
    getItem: key => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, String(value))
  };
  const windowStub = { setInterval: () => 0 };

  const originalSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = () => 0;
  try {
    new Function('window', 'document', 'localStorage', script)(windowStub, documentStub, localStorageStub);
    elements.get('appNameInput').value = 'Spotify';
    windowStub.addApp();
    const firstState = JSON.parse(storage.get('fb-exit-guide'));
    const firstProfileId = firstState.activeProfileId;
    const firstAppId = firstState.profiles[0].apps[0].id;

    windowStub.addProfile();
    const secondState = JSON.parse(storage.get('fb-exit-guide'));
    const secondProfileId = secondState.activeProfileId;
    assert.notEqual(firstProfileId, secondProfileId);
    assert.equal(secondState.profiles.find(profile => profile.id === secondProfileId).apps.length, 0);

    elements.get('appNameInput').value = 'Airbnb';
    windowStub.addApp();
    windowStub.switchProfile(firstProfileId);
    const finalState = JSON.parse(storage.get('fb-exit-guide'));
    assert.deepEqual(finalState.profiles.find(profile => profile.id === firstProfileId).apps.map(app => app.id), [firstAppId]);
    assert.equal(finalState.profiles.find(profile => profile.id === secondProfileId).apps[0].name, 'Airbnb');
  } finally {
    globalThis.setTimeout = originalSetTimeout;
  }
});
