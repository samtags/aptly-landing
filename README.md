# Aptly Landing

Next.js 15 application with App Router and TypeScript.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
aptly-landing/
├── public/                          # Static assets
│   └── image/                       # Image assets
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (admin)/                 # Admin route group
│   │   ├── (content)/               # Content route group
│   │   │   └── LandingPage/
│   │   │       └── _components/
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   └── globals.css              # Global styles
│   │
│   ├── components/                  # Shared components
│   ├── lib/                         # Library code
│   │   ├── api/                     # API clients
│   │   ├── constants/               # Constants
│   │   ├── context/                 # React context
│   │   └── utils/                   # Utility functions
│
├── .gitignore
├── global.d.ts
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── server.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run server` - Run custom server

## Routes

- `/` - Home page
- `/LandingPage` - Landing page with components
- `/dashboard` - Admin dashboard

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- ESLint
