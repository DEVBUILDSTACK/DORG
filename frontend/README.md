# Learn2Launch Frontend

This is the frontend application for the Learn2Launch platform, built with [Next.js](https://nextjs.org) 16.0.0.

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Tech Stack

- **Framework**: Next.js 16.0.0 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5+
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Linting**: ESLint with Next.js config

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication routes
│   │   ├── (landing-page)/      # Landing page
│   │   ├── dashboard/           # Dashboard for different user roles
│   │   │   ├── student/         # Student dashboard
│   │   │   ├── investor/        # Investor dashboard
│   │   │   └── developer/       # Developer dashboard
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/              # Reusable components
│   └── lib/                     # Utility functions
├── public/                      # Static assets
└── package.json
```

## Features

- 🎓 **Student Dashboard**: Courses, community, leaderboard, portfolio, vaults
- 💼 **Investor Dashboard**: Cohorts, impact metrics, portfolio, vaults
- 👨‍💻 **Developer Dashboard**: AI tools, analytics, API management, contracts
- 🔐 **Authentication**: Login and onboarding flow
- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- ⚡ **Fast**: Built with Next.js 16 and Turbopack

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - interactive Next.js tutorial

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
