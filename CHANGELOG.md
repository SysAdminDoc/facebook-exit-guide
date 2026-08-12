# Changelog

All notable changes to facebook-exit-guide will be documented in this file.

## [Unreleased]

- Added: Local Facebook data-export parsing for ZIP and JSON files with reviewable checklist candidates
- Added: Chrome/Firefox CSV, Bitwarden JSON, and 1Password 1PUX password-export matching by Facebook email
- Added: Optional read-only community migration snippets and service difficulty ratings

## [v1.1.0] - 2026-06-19

- Added: Per-category progress bars (Critical/Important/Optional) in My Apps Checklist
- Added: Confirmation modal for all destructive actions (remove item, clear completed, clear all)
- Added: Email search templates for 8 providers (Gmail, Outlook, Yahoo, Proton Mail, Apple Mail, Zoho, Thunderbird) with copy-to-clipboard
- Added: Off-Facebook Activity walkthrough (step 6 in Discovery)
- Added: "What will break" simulator showing unmigrated apps and always-broken services
- Added: Safety backup checklist (photos, Messenger, events, groups, contacts, pages, posts)
- Added: Alternate platform recommendations (social, messaging, marketplace, groups/events)
- Added: Print-optimized stylesheet for paper output
- Added: Expanded migration guide library from 9 to 40+ services
- Added: Safety checklist progress included in global progress bar
- Added: Export now includes pre-deletion and safety checklist items

## [v1.0.0] - 2025-01-01

- Added: Add README with GitHub Pages link
- Initial release of Facebook Exit Guide v1.0.0

## Roadmap archive — 2026-08-10 — ROADMAP.md

<details>
<summary>Original roadmap snapshot</summary>

```markdown
# Facebook Exit Guide Roadmap

Forward-looking scope for the single-HTML Facebook migration walkthrough (progress tracking in `localStorage`).

## Planned Features

### Discovery
- Facebook data-export parser (upload the ZIP, extract `apps_and_websites_off_of_facebook`, generate a pre-populated app checklist).
- Browser-password export parser (Chrome CSV, Firefox CSV, Bitwarden JSON, 1Password 1pux) that flags entries whose username is your FB email.

### Migration Guides
- Community-contributed migration snippets loaded from a static JSON (read-only GitHub raw URL).

### Checklist UX
- Reminder scheduling: set a browser notification to follow up on critical items in N days.
- Evidence vault: allow users to paste confirmation emails / screenshots per item (stored in IndexedDB, local only).
- Multi-profile support: run a fresh checklist for each family member from the same browser.

### Pre-Deletion
- Difficulty rating per service (borrowing JustDeleteMe's system) showing how hard each migration is.

## Nice-to-Haves
- Multi-language build (at least Spanish + German) with a single-file i18n layer.
- Integration hint for password managers (Bitwarden, 1Password) that can auto-mark items once the credential is updated.

## Open-Source Research (Round 2)

### Related OSS Projects
- https://github.com/eranbes/expunged — Chrome extension that bulk-deletes Facebook/TikTok posts, reactions, comments with local-only processing and a platform switcher
- https://github.com/sandipbgt/fb-post-bulk-delete — Python script with unix-timestamp date range using Graph API tokens from the developer explorer
- https://github.com/Creative-Coders-Consortium-C3/Facebook-Page-Post-Deletion-Tool — CLI with Page-scope filters that explicitly skips "profile picture update" stories to avoid destructive side effects
- https://github.com/AharonC-collab/facebook-chat-cleaner — Chrome extension for Messenger thread cleanup with a live deletion counter and resume-from-N chat number
- https://gist.github.com/flyingdogz/4bf1e9a599322aae35fcd6389443ad79 — Reference Python implementation of Facebook's Data Deletion Callback endpoint (app-side GDPR/CCPA compliance)
- https://github.com/topics/delete-facebook-comments — topic hub for adjacent tools worth scraping for common UX patterns

### Features to Borrow
- Live counter progress UI with ETA (facebook-chat-cleaner) — better signal than silent progress bars during long checklists
- Date-range scoping of cleanup actions (fb-post-bulk-delete) — let users purge pre-2015 data without touching recent content
- Skip-by-type filters (C3 tool's profile-picture guard) — warn before deleting auto-generated albums inside "Download Data"
- Graph API Data Deletion Callback awareness (flyingdogz) — show users which third-party apps also need to be notified, not just logged out

### Patterns & Architectures Worth Studying
- Token-scoped vs DOM-driven cleanup tradeoffs — Graph API tools hit rate limits and lose permissions; DOM tools break on UI changes; a hybrid with feature-detection fallback is the resilient path
- Sequential state machine with resumable checkpoints — persist progress to `localStorage` so a tab crash doesn't restart a multi-day migration
- Browser-extension-as-guide vs static-site-as-guide — extensions can read the live Facebook DOM to auto-check items; worth evaluating as a v2 distribution channel alongside GitHub Pages
```

</details>
