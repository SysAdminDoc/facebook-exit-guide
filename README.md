# Facebook Exit Guide

[![Version](https://img.shields.io/badge/version-1.3.0-blue)](https://sysadmindoc.github.io/facebook-exit-guide/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/live-GitHub%20Pages-brightgreen)](https://sysadmindoc.github.io/facebook-exit-guide/)

A guided walkthrough to identify every app, service, and login tied to your Facebook account so you can migrate cleanly before deleting it.

**[Launch Facebook Exit Guide](https://sysadmindoc.github.io/facebook-exit-guide/)**

---

## What It Does

Leaving Facebook is harder than clicking "Delete Account." Most people have dozens of apps and services silently using Facebook as their login. If you delete your account without migrating those first, you lose access to all of them.

This tool walks you through the entire process:

- **Discover Logins** - Step-by-step methods to find every app using your Facebook login (Facebook settings, email search, browser passwords, phone audit, data download)
- **Common Services** - 9 categories of popular apps (Gaming, Shopping, Dating, Music, Social, Productivity, Travel, Fitness, Marketplace) with specific migration instructions
- **My Apps Checklist** - Add your own apps with priority levels, track migration progress, and get built-in how-to guides for popular services
- **Download Data** - Complete guide to downloading your Facebook data before deletion, plus local export tools
- **Delete Account** - Pre-deletion checklist, deactivation vs. deletion comparison, and step-by-step deletion instructions

## Features

- Progress tracking across all checklist items
- Priority tagging (Critical / Important / Optional)
- Built-in migration guides for Spotify, Airbnb, Uber, Tinder, Pinterest, Canva, and more
- Import Facebook data ZIP/JSON exports and password-manager exports (Chrome, Firefox, Bitwarden, 1Password)
- Local reminder notifications, profile-specific checklists, and an IndexedDB evidence vault
- Optional read-only community migration snippets and service difficulty ratings
- Export checklist as text or JSON
- All checklist, reminder, and evidence data stays local in your browser; the optional community catalog is read-only
- Dark theme, fully responsive, zero dependencies
- Single HTML file - works offline

## Usage

Open the live site or download `index.html` and open it in any browser. No server required.

## Privacy

This tool runs entirely in your browser. Checklist and reminder data is stored in localStorage, while pasted evidence and screenshots are stored in IndexedDB. Imported files are parsed in memory and are never uploaded. The optional community catalog is fetched read-only when you request it; no personal data is sent.
