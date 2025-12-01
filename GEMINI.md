# Gemini Project Context: sjsuttwebsite

This document provides context for the Gemini AI assistant about the `sjsuttwebsite` project.

## Project Overview

This is the official website for the Omega Epsilon chapter of the Theta Tau professional co-ed engineering fraternity at San José State University (SJSU).

The project is a modern, responsive web application built with:

*   **Framework**: Next.js (using the App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Package Manager**: npm

The application is designed to be statically generated and deployed on Vercel. It features several pages, including a homepage, a page for brothers, a careers page, and a rush page. The content, such as member information and company logos, is primarily managed through static JSON files.

## Building and Running

To get the project set up and running locally, follow these steps:

1.  **Install Dependencies**:
    If you haven't already, install the necessary Node.js packages.

    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    This command starts the Next.js development server, typically on `http://localhost:3000`.

    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    This command creates an optimized production build of the application.

    ```bash
    npm run build
    ```

## Development Conventions

*   **Component-Based Architecture**: The UI is built with React components, which are located in `src/components/`.
*   **Static Data**: Most of the dynamic content, such as the list of brothers and their roles, is managed in JSON files located in `src/components/activeInfo/`.
*   **Styling**: The project uses Tailwind CSS for utility-first styling. Custom styles and animations are included in `src/app/globals.css` and within individual components using JSX-styled components.
*   **Client-Side Rendering**: Many pages and components use the `'use client';` directive, indicating that they are rendered on the client-side to allow for React hooks and animations.
*   **Linting**: The project is set up with ESLint for code quality. Run `npm run lint` to check for issues.

## Key Files

*   `next.config.ts`: The configuration file for Next.js.
*   `package.json`: Defines the project's dependencies and scripts.
*   `tailwind.config.mjs`: The configuration file for Tailwind CSS.
*   `src/app/layout.tsx`: The root layout for all pages, which includes the main Navbar and Footer.
*   `src/app/page.tsx`: The main homepage component.
*   `src/components/Navbar.tsx`: The navigation bar component.
*   `src/components/Footer.tsx`: The footer component.
*   `src/components/activeInfo/roster.json`: Contains the data for the executive board, chairs, and active members.
*   `src/components/BrotherCard.tsx`: A component for displaying information about a brother.
*   `public/`: Contains all static assets like images and logos.

---

## Instructions for Gemini AI

*   **Git Operations**: Do not use `git add`, `git commit`, `git status`, or `git diff` unless explicitly instructed to. The user will handle all Git operations.