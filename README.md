# Pacific Trails Resort

A modern, responsive multi-page resort website built with HTML, CSS, and JavaScript.

## Overview

Pacific Trails Resort is a front-end website project for a coastal nature retreat. The current version focuses on a polished visual design, responsive layout behavior, and interactive UI elements across desktop, tablet, and mobile screen sizes.

## Current Pages

- **Home** (`index.html`): Hero banner, resort highlights, and promo video modal.
- **Yurts** (`yurts.html`): Package gallery with table-linked package selection.
- **Activities** (`activities.html`): Activity cards, click-to-zoom image modal with captions, and trail map section.
- **Reservations** (`reservations.html`): Reservation form with client-side date validation.

## Current Features

- Unified sticky header with brand, desktop navigation, and mobile hamburger menu.
- Active-link navigation state across desktop and mobile menus.
- Responsive typography and spacing tuned for multiple breakpoints.
- Home hero with cinematic overlay styling.
- Video modal experience with Safari desktop playback fallback logic.
- Yurt package click interactions that jump to and highlight matching table rows.
- Activity image modal that opens over the selected image with caption support.
- Reservation form with floating labels and past-date blocking for arrival date.
- Footer with contact details, quick links, and social icons with branded hover colors.

## Tech Stack

- **HTML5**
- **CSS3** (`CSS/main.css`, `CSS/responsive-design.css`)
- **Vanilla JavaScript** (`pacific.js` + page-level script where needed)
- **jQuery** (used for smooth scrolling/map interaction)
- **Font Awesome** (icons)

## Project Structure

```text
.
├── index.html
├── yurts.html
├── activities.html
├── reservations.html
├── pacific.js
├── CSS/
│   ├── main.css
│   └── responsive-design.css
├── images/
└── media/
```

## Run Locally

1. Open the project folder.
2. Start a local static server (recommended):
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

