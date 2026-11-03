# Eventora — Event Management Website

A responsive event discovery and registration website built for the K Explore Web Designing assignment.

## Features

- Responsive landing page with event listings and event cards
- Search events by title, category, venue, or description
- Filter events by category
- Event details modal with date, venue, description, price, and countdown timer
- Registration form with JavaScript validation
- Registration records saved in browser Local Storage
- Dark/light theme toggle (theme preference persists)
- Newsletter form validation (demo only; no email is sent)
- Mobile navigation and responsive layouts
- Keyboard support for event cards and Escape-to-close modals

## Tech stack

- HTML5
- CSS3 (responsive layouts, CSS variables, transitions)
- Vanilla JavaScript
- Browser Local Storage
- Git and GitHub

## Run locally

No build tools or dependencies are required.

1. Download or clone this repository.
2. Open `index.html` in a browser.

Recommended: use VS Code with the Live Server extension for local development.

## Project structure

```text
eventora-event-management/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Registration data

Successful registrations are saved in the browser under the Local Storage key:

`eventoraRegistrations`

This is a frontend demonstration only. It does not send registrations to a server, and Local Storage data is only available in the same browser/device. Do not use real sensitive personal data in this demo.

## Customization

- Edit the `events` array near the top of `script.js` to add or change events.
- Replace the sample event images with your own images or reliable image URLs.
- Update event dates, venue details, categories, and pricing before submission.
- Update the footer and platform branding if desired.

## Deployment

### GitHub Pages
1. Push this project to a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`.
5. Save and wait for GitHub Pages to publish the site.
6. Copy the live URL shown in the Pages section.

### Netlify
1. Go to Netlify and sign in.
2. Choose **Add new site → Import an existing project**.
3. Connect your GitHub repository.
4. Since this is a static site, leave the build command empty and publish directory as `/` (or the repository root).
5. Deploy and copy the generated website URL.

## Important notes

- The event data and venues are sample/demo content. Replace them with accurate information if your assignment requires real events.
- The registration flow is client-side only. A production registration system would require a backend and database.
- The newsletter form displays a demo success message and does not send emails.

## Assignment checklist

- [x] HTML5, CSS3, JavaScript
- [x] Responsive design
- [x] Event cards with event details
- [x] Search and category filtering
- [x] Registration form and validation
- [x] Registration confirmation
- [x] Dark/light mode
- [x] Countdown timer
- [x] Local Storage registration data
- [x] README
- [ ] Push to GitHub
- [ ] Deploy website and test the live link
- [ ] Submit GitHub + live URL through the official Google Form
