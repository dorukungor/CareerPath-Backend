# Frontend & Integration Troubleshooting Log (MVP 1)

**Date:** 09.12.2025
**Role:** Berkay (Frontend) & Kerem (Backend Support)
**Task:** Frontend Setup & Integration (CR-10)

## 1. Tailwind CSS v4 vs v3 Mismatch
*   **Issue:** The project was initialized with the latest Vite and Tailwind CSS versions. Tailwind CSS v4 was installed, but the configuration files (`tailwind.config.js`, `postcss.config.js`) and CSS directives (`@tailwind base;` etc.) were initialized using v3 standards.
*   **Error Message:** `[plugin:vite:css] [postcss] It looks like you're trying to use 'tailwindcss' directly as a PostCSS plugin...`
*   **Solution:**
    *   Installed the dedicated PostCSS plugin: `npm install @tailwindcss/postcss`
    *   Updated `postcss.config.js` to use `@tailwindcss/postcss`.
    *   Updated `src/index.css` to use the new CSS import syntax: `@import "tailwindcss";` instead of the 3-line directives.

## 2. TypeScript `import type` Restriction
*   **Issue:** The Vite/TypeScript configuration enforces strict rules regarding type imports. Importing an interface as a regular module caused runtime errors because interfaces do not exist in the compiled JavaScript.
*   **Error Message:** `Uncaught SyntaxError: The requested module ... does not provide an export named 'Profession'`
*   **Solution:**
    *   Updated all interface imports to use the explicit `import type` syntax.
    *   Example: `import type { Profession } from '../types/profession';`

## 3. Backend Circular Dependency (JSON Serialization)
*   **Issue:** Fetching professions caused an HTTP 500 error due to the bidirectional relationship between `Profession` and `RoadmapStep` entities (Circular Reference). The JSON serializer entered an infinite loop.
*   **Error Message:** `System.Text.Json.JsonException: A possible object cycle was detected.`
*   **Solution (Backend):**
    *   Implemented the **DTO (Data Transfer Object)** pattern.
    *   Created `ProfessionDto` to define exactly what data is sent to the client.
    *   Updated `ProfessionService` to map Entities to DTOs, severing the circular graph loop.

## 4. UI/UX Polishing
*   **Issue:** Initial rendering was blank or unstyled due to the errors above.
*   **Solution:**
    *   Implemented `react-router-dom` for navigation.
    *   Created `ProfessionCard` with dynamic gradients based on job titles.
    *   Added a "Roadmap Detail" placeholder page for navigation testing.
