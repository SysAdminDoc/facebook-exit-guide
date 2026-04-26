# Facebook Exit Guide Roadmap

Forward-looking scope for the single-HTML Facebook migration walkthrough (progress tracking in `localStorage`).

## Planned Features

### Discovery
- Facebook data-export parser (upload the ZIP, extract `apps_and_websites_off_of_facebook`, generate a pre-populated app checklist).
- Email-search templates for the top 20 email providers (Gmail filter URLs, Outlook query, Yahoo, Proton Mail) to surface login-with-Facebook emails.
- Browser-password export parser (Chrome CSV, Firefox CSV, Bitwarden JSON, 1Password 1pux) that flags entries whose username is your FB email.
- Android/iOS settings walkthrough with deep-links where the OS supports them (app-store connected-apps panel, iOS Sign-In-With-Apple audit).

### Migration Guides
- Expand service library from 9 categories to ~50 common services with specific reset-password + migrate-login flows.
- Community-contributed migration snippets loaded from a static JSON (read-only GitHub raw URL).
- "Account-detection scan" that runs locally and probes common service subdomains (`/login`, `/oauth`) via `Accept: application/json` to confirm an account might exist (opt-in, CORS-permitting only).

### Checklist UX
- Progress bar per category (currently global).
- Reminder scheduling: set a browser notification to follow up on critical items in N days.
- Evidence vault: allow users to paste confirmation emails / screenshots per item (stored in IndexedDB, local only).
- Multi-profile support: run a fresh checklist for each family member from the same browser.

### Pre-Deletion
- "What will break" simulator: list every service that will lose login, categorized by severity.
- Safety backup checklist: download photos, Messenger archives, event calendars before hitting deletion.
- Alternate-platform recommendations per category (Meta-free social graph replacements).

## Competitive Research
- **JustDeleteMe** — directory of deletion URLs; borrow the "difficulty rating" system for each service.
- **Solid Project / Mastodon migration guides** — focused on social move-outs; link as "if you want to rebuild your social graph".
- **Proton / Tuta "leave Google" guides** — similar exit-guide pattern; the progress-tracking + service-specific checklist is Facebook Exit Guide's edge.
- **Off-Facebook Activity tool** — Meta's built-in feature that disconnects apps; walk users through it before they delete.

## Nice-to-Haves
- Multi-language build (at least Spanish + German) with a single-file i18n layer.
- Print-optimized stylesheet so the checklist renders clean for users who prefer paper.
- Export the whole checklist to a calendar file (ICS) where each critical task becomes a dated event.
- Sibling guides (`instagram-exit-guide`, `x-exit-guide`, `linkedin-exit-guide`) reusing the same shell with a different service catalog.
- Optional "regret buffer": a 30-day waiting-period reminder between finishing the checklist and actually deleting the account.
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
- Local-only processing guarantee front-and-center in onboarding copy (Expunged) — matches our single-HTML trust story
- Live counter progress UI with ETA (facebook-chat-cleaner) — better signal than silent progress bars during long checklists
- Date-range scoping of cleanup actions (fb-post-bulk-delete) — let users purge pre-2015 data without touching recent content
- Explicit "no undo" modal before any irreversible step (shared safety pattern across all four) — gate before "Delete Account"
- Skip-by-type filters (C3 tool's profile-picture guard) — warn before deleting auto-generated albums inside "Download Data"
- Graph API Data Deletion Callback awareness (flyingdogz) — show users which third-party apps also need to be notified, not just logged out
- Platform switcher UX (Expunged FB↔TikTok) — informs the sibling-guide architecture already on the roadmap

### Patterns & Architectures Worth Studying
- Token-scoped vs DOM-driven cleanup tradeoffs — Graph API tools hit rate limits and lose permissions; DOM tools break on UI changes; a hybrid with feature-detection fallback is the resilient path
- Sequential state machine with resumable checkpoints — persist progress to `localStorage` so a tab crash doesn't restart a multi-day migration
- Browser-extension-as-guide vs static-site-as-guide — extensions can read the live Facebook DOM to auto-check items; worth evaluating as a v2 distribution channel alongside GitHub Pages
