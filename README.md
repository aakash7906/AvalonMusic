# 🎵 Avalon Music — Premier Live Band & DJ Booking Mobile App

A modern, high-end mobile web application built for **Avalon Music** ([theavalonmusic.com](https://theavalonmusic.com/)), Houston's #1 live music booking agency since 1993.

---

## 🌟 Key Highlights

- **Desktop Mobile Frame Simulator**: When opened on desktop or widescreen displays, the app is showcased in a realistic smartphone shell (inspired by [`survival-tab-app.pages.dev`](https://survival-tab-app.pages.dev/)) featuring:
  - **Dynamic Island** with real-time audio playback equalizer animation.
  - **Status Bar** with live clock, 5G carrier badge, Wi-Fi, and battery indicator.
  - **Desktop Utility Controls**: Toggle between Mobile Frame Mode & Full Screen Mode, switch device finishes (**Titanium**, **Midnight**, **Gold**, **Silver**), scan QR code to open on mobile, copy app link, or trigger one-click concierge calling.
- **Native 100% Responsive Mobile Mode**: On mobile viewports (screen width `< 768px`), all simulated phone frames gracefully disappear, giving users a 100% native mobile app experience with zero horizontal clipping.
- **Sticky Floating Capsule Bottom Navigation**: Sleek, elevated floating navigation dock (`rounded-full bg-card/90 backdrop-blur-2xl`) with synchronized floating Mini Audio Player.
- **Original Content & High-Res Assets**: Curated directly from `theavalonmusic.com`:
  - **Roster**: *The Party Feels*, *CC Rider Band*, *Champagne Nights*, *David Caceres Jazz*, *The Outsiders*, *The Pictures Band*, *20 RIDE*.
  - **Look & Listen**: Real studio audio tracks (with waveform visualizer) and YouTube live performance video modals.
  - **Event Types**: Weddings & Ceremonies, Corporate Galas, Private Parties, and DJ/MC services.
  - **Client Testimonials**: Verified quotes from *Haley Hughes*, *Jon Naylor*, *Lola Weller*, *Radhika J. Day*, and *Jim Gray*.
  - **Trust Badges**: *The Knot Best of Weddings*, *WeddingWire Couples' Choice*, *Zola Top Vendor*, and *BBB A+ accredited*.
- **Integrated Audio Player Engine**:
  - Global floating mini-player bar docked right above the navigation pill.
  - Expandable full-screen vinyl player with spinning record animation, scrub bar, volume control, like button, and direct band booking shortcut.
  - YouTube live video performance modal.

---

## 🎨 Master Design System & Single-File Theming (`src/index.css`)

All colors, surface backgrounds, borders, shadows, typography, border radii, and paddings are centralized in **[`src/index.css`](src/index.css)** using CSS custom properties (design tokens). 

### How to customize or rebrand the entire app:
To change the look, feel, or brand accent of the app in the future, simply edit the `:root` variables in `src/index.css` without modifying individual component files:

```css
:root {
  /* Brand Accent: Avalon Gold & Deep Slate */
  --primary: #f5a623;             /* Main accent color */
  --primary-hover: #ffb84d;       /* Hover state */
  --primary-foreground: #090d14;  /* Text on primary buttons */
  --primary-glow: rgba(245, 166, 35, 0.22);

  --secondary: #172033;           /* Surface cards & pills */
  --secondary-foreground: #f8fafc;

  --background: #090d14;          /* App background */
  --foreground: #f8fafc;          /* Default text */

  --card: #131b2c;                /* Card container background */
  --border: #23314d;              /* Borders & dividers */

  /* Radii & Roundness */
  --radius-sm: 0.625rem;
  --radius-md: 0.875rem;
  --radius-lg: 1.25rem;
  --radius-xl: 1.75rem;
  --radius-pill: 9999px;

  /* Typography */
  --font-family-body: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-family-heading: 'Space Grotesk', system-ui, sans-serif;
}
```

Components use semantic utility classes (`bg-primary`, `bg-secondary`, `bg-card`, `bg-background`, `text-primary`, `text-muted-foreground`, `border-border`) mapped automatically through Tailwind CSS v4 `@theme`.

---

## 📱 Implemented Pages & Standard Mobile Flows

| Page | Route | Description |
| :--- | :--- | :--- |
| **Splash Screen** | `#/splash` | Animated logo reveal, sound wave pulse, 30+ year Houston legacy badge, and progress bar entry. |
| **Onboarding** | `#/onboarding` | 3-step carousel covering talent curation, audio/video previews, and stress-free event production. |
| **Authentication** | `#/auth` | Sign In, Create Account (with Event Role selector: Bride/Groom, Event Planner, Corporate Coordinator), Forgot Password, and one-tap **"Continue as Guest"**. |
| **Discover / Home** | `#/` | Hero showcase banner, quick event category shortcuts, horizontal featured band cards with inline audio previews, 4 pillars, testimonials, trust badges, and direct call concierge hotline. |
| **Look & Listen** | `#/music` | Genre filter chips (*Variety Bands*, *R&B / Soul*, *Country Pop*, *Jazz & Swing*, *Chamber Music*), Audio vs Video showcase tab switcher with YouTube live video popups. |
| **Bands Roster** | `#/roster` | Search bar with sorting by *Top Rated*, *Most Popular*, and *Pricing*. Detailed band cards showing member counts, starting rates, and verified reviews. |
| **Band Detail Modal** | *Modal* | High-res cover hero, audio sample audition, live YouTube showcase embed, member configurations, and repertoire preview. |
| **Booking & Quote Calculator** | `#/book` | Interactive step-by-step quote calculator: select event type, band/DJ, event date, duration (2–5 hrs), guest count, and metro area venue with real-time investment calculation. |
| **Live Showcases** | `#/events` | Houston venue showcase dates (The Corinthian, The Post Oak Hotel, Hotel Granduca) with 1-tap Free RSVP. |
| **Frequently Asked Questions** | `#/faq` | Categorized FAQ accordion (Wedding Bands, Corporate Galas, Pricing & Budget, Booking Process, Technical & Logistics, Houston Coverage). |
| **About Avalon Music** | `#/about` | 30-year history since 1993, founder philosophy, Shining Star Award, milestones, and Greater Houston coverage areas. |
| **Profile & Saved** | `#/profile` | Shortlisted bands and favorited tracks, active booking quote tracking with status badges (*Confirmed*, *Reviewing*), direct Avalon Concierge hotline `(832) 723-8886`, and desktop frame finish settings. |
| **Quick Search Modal** | *Global* | Instant search overlay searching across bands and tracks with direct navigation. |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native `@tailwindcss/vite` and CSS variable design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/) (using `HashRouter` for zero-configuration static preview hosting support)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5175/` (or the port shown in terminal) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production build is generated into the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📞 Avalon Music Concierge

- **Phone**: [(832) 723-8886](tel:8327238886)
- **Website**: [https://theavalonmusic.com/](https://theavalonmusic.com/)
- **Location**: Houston, Texas — Established 1993
