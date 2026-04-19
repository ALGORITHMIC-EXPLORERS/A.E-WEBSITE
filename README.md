<<<<<<< HEAD
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
=======
# A.E-WEBSITE

Algorithmic Explorers is a React + TypeScript frontend project built with Vite and Tailwind CSS.

## Project Structure

- `frontend/` - React + TypeScript application
  - `frontend/src/pages/` - page-level screens such as `HomePage`, `GuruCircle`, and `LearningCohort`
  - `frontend/src/components/` - shared UI components such as `Navbar` and `Footer`
  - `frontend/src/index.css` - global styles and Tailwind-related styling
- `backend/` - API server and database services (coming soon)
>>>>>>> f39ff02f7ef22733f3222c765612f236992277ed

## Design Reference

Figma file: [ALGORITHMIC EXPLORERS WEBSITE](https://www.figma.com/design/DyTuPXcfnYue1igNIR8TKc/ALGORITHMIC-EXPLORERS-WEBSITE?node-id=0-1)

<<<<<<< HEAD
## Notes

- Keep UI components focused on presentation.
- Keep page files thin and move reusable behavior into hooks or shared utilities.

## Contributing

- Read the root [README.md](../README.md) before making changes so the workspace setup and contributor expectations stay aligned.
- Keep UI changes tied to the Figma reference and avoid introducing unrelated layout changes.
- Run `npm run lint` and `npm run build` before opening a pull request.
- Keep reusable UI in `src/components/` and page-specific logic inside `src/pages/`.
=======
## How To Run

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Backend

Backend setup instructions will be added once the backend folder is initialized.

## Useful Scripts

Run these commands from inside `frontend/`:

- `npm run dev` - start the local development server
- `npm run build` - type-check and build the app for production
- `npm run lint` - run ESLint across the project
- `npm run preview` - preview the production build locally


## Contributors Guide

Use this section as the working guide for anyone contributing to the project.

### Before You Start

- Read the Figma design before making UI changes so the implementation stays aligned with the intended layout and visual language.
- Work inside the `frontend/` folder unless a task explicitly requires changes at the repository root.
- Keep changes focused on one feature or fix at a time.

### Recommended Workflow

1. Pull the latest changes before starting work.
2. Install dependencies with `npm install` inside `frontend/` if needed.
3. Run the app with `npm run dev` and verify changes in the browser.
4. Use `npm run lint` before opening a pull request.
5. Build with `npm run build` to confirm the app is production-ready.

### Code Style

- Keep page files thin and move reusable UI into components.
- Keep styling consistent with the existing Tailwind setup and theme tokens.
- Prefer clear component and file names that match the feature they serve.
- Avoid mixing layout, business logic, and API code in the same file when it can be separated cleanly.

### Pull Request Checklist

- The change matches the Figma design or the requested behavior.
- The app runs without console errors.
- Lint passes locally.
- Build passes locally.
- Any new reusable UI has been placed in the appropriate `frontend/src/components/` folder.

## Notes

- The app entry flow is `src/main.tsx` -> `src/App.tsx` -> `src/pages/HomePage.tsx`.
- Backend integration is in progress.
>>>>>>> f39ff02f7ef22733f3222c765612f236992277ed
