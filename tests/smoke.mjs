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
