# Theta Tau SJSU Website

This repository contains the source for Theta Tau's San José State University chapter website. The app is built with **Next.js**, **TypeScript**, and **Tailwind CSS**, providing a modern and responsive experience.

## Features

- Next.js 15 App Router with TypeScript for type-safe development
- Tailwind CSS v4 for utility-first styling
- Modular React components for navigation, carousels, and content sections
- Static JSON data for active members and career resources
- Optimized assets served from the `public/` directory

## 🛠️ Pre-TODO: Project Setup Tasks

These are the initial technical goals before adding full user-facing features:

- [ ] 🔧 Clean up `/src` folder structure (remove unused boilerplate)
- [ ] 📦 Integrate Supabase client and environment variables
- [ ] 🔐 Set up basic Supabase auth with roles (e.g., rushee, active)
- [ ] 🧪 Create a test page to validate Supabase DB connection
- [x] 🗂️ Organize `components/`, `lib/`, and `types/` folders
- [x] 📘 Replace default Next.js README with custom project documentation
- [ ] ✍️ Create `CONTRIBUTING.md` for team or future contributors
- [ ] 🧼 Add `.env.example` to document required secrets/config
- [ ] 🚀 Deploy initial version to Vercel for preview testing

## Getting Started

### Prerequisites

- Node.js 18.17 or newer
- npm 10 or newer (or an alternative package manager)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-org/sjsu-seo-tt-website.git
cd sjsu-seo-tt-website
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### Production

TODO ... Finish this section ... vercel deployment instructions

### Linting

Check the codebase with ESLint:

```bash
npm run lint
```

or just use prettier, which comes with standard syntax guidelines for typescript.

## Folder Structure

```txt
sjsu-seo-tt-website/
├── public/                # Static assets
│   ├── images/
│   ├── headshots/
│   └── companies/
├── src/
│   ├── app/               # Application routes
│   │   ├── FAQ/page.tsx
│   │   ├── brothers/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── rush/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── Carousel.tsx
│       ├── BrotherCard.tsx
│       ├── OfficerCard.tsx
│       ├── ValueCard.tsx
│       ├── CompanyLogoDisplay.tsx
│       └── activeInfo/
│           ├── roster.json
│           ├── careers.json
│           └── alumni.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Contributing

1. Create a feature branch:

    ```bash
    git checkout -b name/your-feature
    ```

2. Install dependencies and make your changes.
3. Run `npm run lint` and ensure the project builds.
4. Commit with clear messages and open a pull request describing your changes.

## License

This project does not currently specify a license. If you plan to use this code, please contact the maintainers.
