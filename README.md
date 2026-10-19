# Ansu Edu Support Hub

A responsive information and request website for Ansu Edu Support Hub, an educational and digital support platform serving students, graduates, and job seekers in Pakistan.

## Run locally

No build tools or package installation are required. From the project directory, run:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser.

## Features

- Responsive homepage with service, audience, team, and contact sections
- Searchable and filterable service listings
- Request form with validation and service preselection
- Reduced-motion support and scroll-reveal effects
- Request form opens a prefilled email draft; there is no backend service

## Project files

- `index.html` — page structure and content
- `css/style.css` — layout, responsive styles, and motion
- `js/main.js` — service filtering, navigation, and request form behavior

## Contact configuration

The request form uses the email configured as `CONTACT.email` in `js/main.js`. Update it if the support email changes. Submitting the form opens the visitor's default email application with a prefilled message.

## External assets

Google Fonts and audience photos are loaded from Google Fonts and Unsplash. An internet connection is needed for these assets to appear.