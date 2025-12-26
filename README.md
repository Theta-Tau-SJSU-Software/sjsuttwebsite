# Theta Tau SJSU Website

This repository contains the source for Theta Tau's San José State University chapter website. The app is built with **Next.js**, **TypeScript**, and **Tailwind CSS**, providing a modern and responsive experience.

## Features

* Tailwind CSS v4 for utility-first styling
* Modular React components for navigation, carousels, and content sections
* Static JSON data for active members and career resources
* Optimized assets served from the `public/` directory

## Getting Started

### Prerequisites

* Node.js 18.17 or newer
* npm 10 or newer (or an alternative package manager)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Theta-Tau-SJSU-Software/sjsuttwebsite.git
cd sjsuttwebsite
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### Deployment (Vercel)

This project is deployed using [Vercel](https://vercel.com). The project is already setup on Vercel, the only active changes needed for deployment are going to be adding secrets/API keys, otherwise you don't need to worry.

* All commits pushed to `main` are automatically deployed to **Production**.
* Pull requests (PRs) create **Preview Deployments**, which let you test changes before merging.
* Environment variables (API keys, secrets, etc.) are managed directly in the Vercel project settings.

> [!CAUTION]
> If you need to update deployment settings (e.g., environment variables, build configuration, domain setup), please contact the **website maintainers/webmaster**. Do not commit secrets into the repository.

### Linting

Check the codebase with ESLint:

```bash
npm run lint
```

or just use prettier, which comes with standard syntax guidelines for typescript within your IDE.

## Folder Structure

```txt
sjsuttwebsite/
├── public/              # Static assets
│   ├── companies/       # Company logos
│   ├── headshots/       # Member photos
│   ├── images/          # Event/gallery images
│   └── *.svg/png        # Icons and misc assets
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── FAQ/
│   │   ├── brothers/
│   │   ├── careers/
│   │   ├── rush/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/      # Reusable UI
│       ├── BrotherCard.tsx
│       ├── Carousel.tsx
│       ├── CompanyLogoDisplay.tsx
│       ├── Footer.tsx
│       ├── Navbar.tsx
│       ├── OfficerCard.tsx
│       ├── ValueCard.tsx
│       └── activeInfo/  # Static JSON data
├── CHANGELOG.md
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── (lock/config files)
```

## Contributing

1. Create a feature branch:

    ```bash
    git checkout -b name/your-feature
    ```

2. Install dependencies and make your changes.
3. Run `npm run lint` and ensure the project builds.
4. Commit with clear messages and open a pull request describing your changes.

> [!NOTE]
> Main branch is locked from direct contributions. Use branches.

## License

This project does not currently specify a license. If you plan to use this code, please contact website maintainers.

## Future Work

* Authentication and role-based access
* Database-backed features (e.g., rushee applications, activity tracking)
* Expanded content management tools
