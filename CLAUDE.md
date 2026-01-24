# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for the Omega Epsilon chapter of Theta Tau professional co-ed engineering fraternity at San José State University. Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4, deployed on Vercel.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

The development server runs at http://localhost:3000.

## Architecture

### Authentication System

The codebase uses **Supabase** for authentication with `@supabase/ssr` for proper Next.js App Router support:

**Client Setup:**
- `src/lib/supabase/client.ts`: Browser client using `createBrowserClient()` from `@supabase/ssr`
- `src/lib/supabase/server.ts`: Server client using `createServerClient()` with cookie handling

**Auth Flow:**
- `src/contexts/AuthContext.tsx`: Provides `AuthProvider` and `useAuth()` hook. Wraps the entire app in `src/app/layout.tsx`.
- `src/components/withAuth.tsx`: HOC that redirects unauthenticated users to `/login`.
- `src/app/auth/callback/route.ts`: OAuth callback route handler (uses server client).
- `src/app/login/page.tsx`: Login page with Google OAuth.
- `src/app/profile/page.tsx`: Protected page example using `withAuth()`.
- `src/components/LogoutButton.tsx`: Logout functionality.

**Usage:**
- Client components: Use `createClient()` from `@/lib/supabase/client`
- Server components/routes: Use `await createClient()` from `@/lib/supabase/server`
- Auth state: Use `useAuth()` hook from `AuthContext`

**Environment Variables Required** (see `.env.local.example`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Data Management

The app currently uses **static JSON files** for content in `src/components/activeInfo/`:
- `roster.json`: Executive board, chairs, and active members
- `careers.json`: Job and internship data
- `alumni.json`: Alumni information
- `greekAlphabet.json`: Greek letter data

The `src/lib/database.types.ts` file is a placeholder for future Supabase database type definitions.

### Layout Structure

- `src/app/layout.tsx`: Root layout wrapping all pages with `AuthProvider`, `Navbar`, and `Footer`. Sets up the Geist font and applies `--navbar-height` CSS variable for consistent spacing.
- All pages automatically have top padding via `main { padding-top: var(--navbar-height) }` in `globals.css`.

### Styling

- **Tailwind CSS v4** is imported directly in `src/app/globals.css` via `@import "tailwindcss"`.
- Custom CSS variables defined in `:root` for `--background`, `--foreground`, and `--navbar-height`.
- Theme-aware design with dark mode support via `prefers-color-scheme`.
- No separate `tailwind.config.js`—Tailwind v4 uses inline theme configuration in CSS.

### Component Architecture

Key reusable components in `src/components/`:
- `Navbar.tsx`: Main navigation (uses auth context for conditional rendering)
- `Footer.tsx`: Site footer
- `BrotherCard.tsx`, `OfficerCard.tsx`: Member display cards
- `CompanyLogoDisplay.tsx`: Interactive company logo display
- `Carousel.tsx`: Image carousel using `react-responsive-carousel`
- `ValueCard.tsx`: Value proposition cards
- `LogoutButton.tsx`: Auth-aware logout button

Most components use `'use client'` directive for client-side interactivity (React hooks, animations with framer-motion).

### Page Routes

- `/` - Homepage (`src/app/page.tsx`)
- `/brothers` - Active members listing
- `/careers` - Job and internship information
- `/rush` - Rush information and timeline
- `/FAQ` - Frequently asked questions
- `/login` - Authentication page
- `/profile` - Protected user profile (requires authentication)

## Deployment

- **Production**: Pushes to `main` branch auto-deploy to Vercel.
- **Preview**: Pull requests create preview deployments.
- Environment variables are managed in Vercel project settings—never commit secrets to the repository.
- Contact the webmaster for deployment configuration changes.

## Git Workflow

- Main branch is protected—use feature branches with the pattern `name/feature-description`.
- All changes must go through pull requests.

## Future Considerations

- The authentication system is in place but many pages are still using static JSON data.
- `database.types.ts` suggests planned migration to Supabase database for dynamic content.
- Future work includes database-backed features for rushee applications and activity tracking.
