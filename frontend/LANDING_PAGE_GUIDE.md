# Learn2Launch Landing Page

## Overview
A futuristic dark-themed landing page with scroll sections for three user types: Students, Developers, and Investors.

## Features Implemented

### 🎨 Design Theme
- **Dark gradient background**: `#0B0C14 → #101120`
- **Neon accents**: 
  - Student: Aqua `#00E0FF`
  - Developer: Violet-Pink `#8B5CF6 → #FF007A`
  - Investor: Gold `#FACC15` + Deep Blue `#1E3A8A`
- **Typography**: System fonts with clean, modern styling
- **Animations**: Framer Motion for smooth transitions

### 📦 Component Structure

```
/components/landing/
  ├── Navbar.tsx                 - Fixed top navigation with glassmorphism
  ├── VerticalKnowMoreButton.tsx - Dynamic left-side scroll button
  ├── SectionStudent.tsx         - Student zone (aqua theme)
  ├── SectionDeveloper.tsx       - Developer hub (violet theme, 18+)
  ├── SectionInvestor.tsx        - Investor network (gold theme)
  └── Footer.tsx                 - Social links and company info
```

### 🔧 Key Features

#### 1. **Fixed Navbar**
- Glassmorphic effect with backdrop blur
- Smooth shrink animation on scroll
- Gradient logo and CTA buttons with glow effects

#### 2. **Vertical "Know More" Button**
- Fixed on left edge
- Updates dynamically based on active section
- Rotated vertical text with section-specific colors
- Smooth scroll to section on click

#### 3. **Section 1 - Student Zone**
- Headline: "Learn. Build. Launch."
- Animated particles background
- Floating code block visualization
- CTAs: Explore Courses, Join Leaderboard
- Scroll indicator

#### 4. **Section 2 - Developer Hub (18+)**
- Headline: "Code the Future of Finance."
- Animated grid and flowing code lines
- Terminal interface mockup
- Age restriction badge (🔞 18+)
- CTAs: View Developer Dashboard, Build With Us

#### 5. **Section 3 - Investor Network**
- Headline: "Invest Intelligently with AI-Powered Vaults."
- Glowing nodes and pulse wave effects
- Animated dashboard preview with charts
- Key features: Secure & Transparent, Real-time Analytics
- CTAs: View Vaults, Get Early Access

#### 6. **Footer**
- Gradient divider line
- Three columns: Logo/Tagline, Quick Links, Social Icons
- Hover effects on social icons with glow
- Copyright notice

### 🎯 Scroll Behavior
- **Scroll snapping**: `snap-y snap-mandatory` for smooth section transitions
- **Active section detection**: Updates vertical button dynamically
- **Smooth scroll**: Global CSS smooth scroll behavior

### 🎬 Animations
All components use Framer Motion for:
- Initial fade-in animations
- Parallax effects
- Hover states with glow effects
- Animated backgrounds (particles, code lines, charts)
- Scroll-triggered animations with `whileInView`

## Running the Application

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to see the landing page.

## Responsive Design
- Desktop: Full-screen sections with side-by-side layouts
- Mobile: Stacked vertical layout with touch-friendly swipe support
- Navbar adapts with mobile menu (if implemented)

## Technologies Used
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion 11** - Animation library
- **Lucide React** - Icon library

## Future Enhancements
- [ ] Add mobile hamburger menu
- [ ] Implement modal popups for "Know More" actions
- [ ] Add Lottie animations for more complex visuals
- [ ] Create dedicated info pages for each section
- [ ] Add intersection observer for more precise scroll detection
- [ ] Implement prefers-reduced-motion for accessibility

## Color Palette Reference

| Section | Primary | Secondary | Usage |
|---------|---------|-----------|-------|
| Student | `#00E0FF` | `#FFFFFF` | Buttons, accents, particles |
| Developer | `#8B5CF6` | `#FF007A` | Terminal, gradient backgrounds |
| Investor | `#FACC15` | `#1E3A8A` | Charts, premium elements |
| Background | `#0B0C14` | `#101120` | Base gradient |

## Notes
- The landing page uses smooth scroll snapping for a premium UX
- Each section is viewport height (`h-screen`) for immersive experience
- Animations are optimized for performance
- The design is consistent with the existing dashboard themes
