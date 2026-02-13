# PropThinks Marketing Site

Public-facing property search and discovery platform for PropThinks. Built with Next.js 15, React 19, TypeScript, Tailwind CSS 4.

**Status:** ✅ Component Library Complete - Ready for Backend Integration  
**Last Updated:** January 2025

## Tech Stack

- **Framework:** Next.js 15.5.9 (App Router, Server Components)
- **React:** 19.0.0
- **TypeScript:** 5.9.3 (strict mode, zero errors)
- **Styling:** Tailwind CSS 4.1.18 with @tailwindcss/postcss
- **Forms:** React Hook Form 7.54.2 + Zod 3.24.1
- **HTTP:** Axios 1.7.9
- **State:** TanStack Query 5.62.17
- **UI Components:** shadcn/ui (copy-paste approach)
- **Icons:** Lucide React 0.468.0
- **Package Manager:** npm (pnpm had Windows path issues)

## Quick Start

Install dependencies:
```bash
npm install
```

Run dev server:
```bash
npm run dev
# Open http://localhost:3000
```

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

Type check:
```bash
npm run type-check
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with fonts, analytics, SEO
│   ├── page.tsx            # Homepage (hero, features, markets)
│   ├── properties/         # Property listings with PropertyGrid
│   ├── owners/             # Owner inquiry with OwnerInquiryForm
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── terms/              # Terms of service
│   └── privacy/            # Privacy policy
│
├── components/
│   ├── ui/                 # shadcn/ui components (Button, Card, Input, Textarea)
│   ├── property/           # Property components (PropertyCard, PropertyGrid, SearchBar)
│   ├── forms/              # Form components (ScheduleVisitForm, OwnerInquiryForm)
│   └── layout/             # Layout components (Header, Footer)
│
├── lib/                    # Utilities and API client
│   ├── api.ts              # Axios client with interceptors
│   ├── env.ts              # Environment validation with Zod
│   ├── utils.ts            # Utility functions (cn, formatCurrency, etc.)
│   ├── validations.ts      # Zod validation schemas
│   └── rate-limit.ts       # Rate limiting utility
│
├── types/                  # TypeScript definitions
│   ├── property.ts         # Property and PropertyListing interfaces
│   └── api.ts              # API response and error types
│
├── config/
│   └── site.ts             # Site configuration (name, markets, contact)
│
└── styles/
    └── globals.css         # Tailwind imports and CSS reset
```

## Environment Variables

Create `.env.local` for development:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_APP_URL=http://localhost:5173
NODE_ENV=development
```

Production environment (`.env.production`):

```bash
NEXT_PUBLIC_API_URL=https://propthinks-backend-production.up.railway.app/api/v1
NEXT_PUBLIC_SITE_URL=https://www.propthinks.com
NEXT_PUBLIC_AUTH_APP_URL=https://app.propthinks.com
NODE_ENV=production
```

## Current Features

### ✅ Completed
- **Component Library:** shadcn/ui components (Button, Card, Input, Textarea)
- **Property Components:** PropertyCard, PropertyGrid, SearchBar, PropertyStructuredData
- **Forms:** ScheduleVisitForm and OwnerInquiryForm with validation
- **Layout:** Header (with mobile menu) and Footer (with links)
- **Pages:** All pages migrated to component-based architecture with Header/Footer
- **Infrastructure:** Security headers, SEO metadata, environment validation
- **Build:** Zero TypeScript errors, production build successful

### 🚧 In Progress (Phase 3: Backend Integration)
- Connect forms to backend API endpoints
- Property detail page with dynamic routing
- Real property data from backend
- Property images with Next Image
- Set metadataBase for social media previews

## Architecture Patterns

### Component Types
- **Server Components:** Default for all components (Header, Footer, PropertyCard, etc.)
- **Client Components:** Only for interactivity (SearchBar, forms with `'use client'`)
- **Form Validation:** React Hook Form + Zod for all forms

### API Pattern
All API calls go through `src/lib/api.ts`:
```typescript
import { getProperties, scheduleVisit, submitOwnerInquiry } from '@/lib/api';

// In component or Server Action
const properties = await getProperties({ city: 'Nellore' });
```

### Styling Pattern
Use Tailwind CSS with utility classes:
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h1 className="text-4xl font-bold mb-4">Title</h1>
</div>
```

## Deployment (Vercel)

### Via CLI
```bash
npm install -g vercel
vercel          # Preview deployment
vercel --prod   # Production deployment
```

### Via GitHub
1. Connect repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Auto-deploy on push to main branch

### Build Configuration
- **Framework:** Next.js (auto-detected)
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install`

## Key Features

- **SEO Optimized:** Server-side rendering, metadata exports, structured data (JSON-LD), sitemap
- **Security:** CSP headers, rate limiting (10 req/60s), input validation, no XSS vulnerabilities
- **Performance:** Next.js Image optimization, code splitting, fast page loads (~100ms after initial)
- **Mobile-First:** Responsive design with Tailwind CSS, mobile menu in Header
- **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation

## Business Rules (Reflected in Content)

1. **Zero direct communication** - PropThinks is mandatory intermediary
2. **Physical signing only** - Manager coordinates in-person signing
3. **PropThinks screens tenants** - Owner is passive observer (NO approval authority)
4. **Token** - 10% of rent, non-refundable, deducted from first month
5. **Security deposit** - 2 months rent, held by PropThinks
6. **Rent** - Due 1st of month, 5-day grace period, 5% late fee
7. **Commission** - 8% of monthly rent for management services
8. **Primary markets** - Nellore, Guntur, Vijayawada, Tirupati

## Documentation

- **STATUS.md** - Current status, completed features, next steps
- **CHANGELOG.md** - Version history and notable changes
- **copilot-instructions.md** - Development guidelines and patterns

## Related Repositories

- **Backend API:** [propthinks-backend](https://github.com/your-org/propthinks-backend)
- **Authenticated App:** [propthinks-app](https://github.com/your-org/propthinks-app)

## Support

For issues or questions:
- Email: support@propthinks.com
- Documentation: See STATUS.md for detailed current state
- Business Reference: See backend repo docs/PROPTHINKS_BUSINESS_REFERENCE.md

## Key Business Rules

- No direct owner-tenant contact information displayed
- All communication through PropThinks
- Physical signing only (no digital signatures)
- Properties managed by PropThinks team

## Related Projects

- **Authenticated App:** `propthinks-app` (React + Vite)
- **Backend API:** `propthinks-backend` (FastAPI + PostgreSQL)

---

**Status:** Active Development  
**Last Updated:** January 21, 2026
