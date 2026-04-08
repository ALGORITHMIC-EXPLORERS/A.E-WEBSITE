# Frontend

This folder contains the main UI for Algorithmic Explorers.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- ESLint

## Run Locally

```bash
npm install
npm run dev
```

The Vite dev server will print a local URL in the terminal, usually `http://localhost:5173`.

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - type-check and build production assets
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build

## Folder Structure

- `src/main.tsx` - React entry point
- `src/App.tsx` - root app component
- `src/pages/` - page-level screens
- `src/components/ui/` - shared UI elements such as `Navbar` and `Footer`
- `src/components/shared/` - reusable shared pieces
- `src/assets/` - static assets
- `src/index.css` - global styles and theme tokens

## Current App Flow

The app currently mounts `HomePage` directly from `App.tsx`. If routing is added later, this is the place where the main navigation structure should be introduced.

## Design Reference

Figma file: [ALGORITHMIC EXPLORERS WEBSITE](https://www.figma.com/design/DyTuPXcfnYue1igNIR8TKc/ALGORITHMIC-EXPLORERS-WEBSITE?node-id=0-1)

## Notes

- Keep UI components focused on presentation.
- Keep page files thin and move reusable behavior into hooks or shared utilities.

## Contributing

- Read the root [README.md](../README.md) before making changes so the workspace setup and contributor expectations stay aligned.
- Keep UI changes tied to the Figma reference and avoid introducing unrelated layout changes.
- Run `npm run lint` and `npm run build` before opening a pull request.
- Keep reusable UI in `src/components/` and page-specific logic inside `src/pages/`.
