# PropThinks Marketing Site - Copilot Instructions

## Project Overview

PropThinks Marketing Site (`www.propthinks.com`) - Public-facing property search and discovery platform for the Andhra Pradesh real estate market.

**Purpose:** Enable property search, tenant visit scheduling, and owner lead generation.

**Current Phase:** 🚀 **Next.js 15 Migration** - Rebuilding from Vite to Next.js 15 for SEO, performance, and proper SSR/ISR.

**Tech Stack:** Next.js 15, React 19, TypeScript 5.9+, Tailwind CSS 4, shadcn/ui, TanStack Query v5, pnpm

---

## Architecture Overview

### Two-Site System

**Marketing Site (THIS PROJECT - www.propthinks.com):**
- Public property search and discovery
- No authentication required
- SEO-optimized for organic traffic
- Lead generation (visit requests, owner inquiries)

**Authenticated App (app.propthinks.com):**
- Property management dashboard
- Tenant/Owner/Manager/Admin roles
- Full CRUD operations
- Already built and in QA testing

**Integration Flow:**
```
www.propthinks.com (Property Search)
    ↓ User clicks "Schedule Visit" or "Sign Up"
    ↓
app.propthinks.com (Authenticated Dashboard)
```

---

## Tech Stack (2026 Latest)

### Core Framework
- **Next.js 15.1+** (App Router, Server Components, Server Actions)
- **React 19** (latest stable)
- **TypeScript 5.7+** (strict mode)
- **pnpm** (package manager - faster than npm/yarn)

### Styling & UI
- **Tailwind CSS 4** (latest, CSS-first configuration)
- **shadcn/ui** (2026 components - NOT a library, copy-paste approach)
- **Framer Motion 11.15+** (smooth animations, 60fps target)
- **Lucide React** (modern icon set)
- **CVA** (class-variance-authority for component variants)

### Data & Forms
- **TanStack Query v5** (server state management)
- **React Hook Form 7.54+** (form state management)
- **Zod 3.24+** (runtime validation)
- **Axios 1.7+** (HTTP client)

### SEO & Performance
- **next-seo 6.6+** (meta tags, Open Graph)
- **next-sitemap 4.2+** (automatic sitemap generation)
- **@vercel/analytics** (performance monitoring)
- **@vercel/speed-insights** (Core Web Vitals tracking)

### Security
- **Helmet middleware** (security headers)
- **validator** (input sanitization)
- **rate-limiter-flexible** (API rate limiting)
- **CSP headers** (Content Security Policy)

---

## Project Structure

```
propthinks-marketing/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout (global)
│   │   ├── page.tsx              # Homepage
│   │   ├── properties/
│   │   │   ├── page.tsx          # Property search/listings
│   │   │   └── [id]/page.tsx    # Property detail
│   │   ├── owners/
│   │   │   └── page.tsx          # List your property
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── api/                  # API routes
│   │       ├── contact/route.ts
│   │       └── inquiries/route.ts
│   ├── components/
│   │   ├── ui/                   # shadcn components (copy-paste)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── property/             # Property-specific components
│   │   │   ├── PropertyCard.tsx
│   │   │   ├── PropertyGrid.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── FilterSidebar.tsx
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   └── forms/                # Form components
│   │       ├── ScheduleVisitForm.tsx
│   │       └── OwnerInquiryForm.tsx
│   ├── lib/
│   │   ├── api.ts                # API client (Axios instance)
│   │   ├── utils.ts              # Utility functions (cn, formatters)
│   │   └── validations.ts        # Zod schemas
│   ├── types/
│   │   ├── property.ts           # Property types
│   │   └── api.ts                # API response types
│   ├── config/
│   │   ├── site.ts               # Site metadata
│   │   └── navigation.ts         # Navigation items
│   ├── hooks/
│   │   ├── useProperties.ts      # TanStack Query hooks
│   │   └── useSearch.ts
│   └── styles/
│       └── globals.css           # Global styles + Tailwind imports
├── public/
│   ├── images/
│   └── icons/
├── .env.local                    # Local environment variables
├── .env.production               # Production environment variables
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── components.json               # shadcn/ui configuration
├── package.json
└── README.md
```

---

## Core Principles

### 1. Next.js 15 App Router Patterns

**Server Components by Default:**
```tsx
// ✅ CORRECT - Server Component (default)
export default async function PropertiesPage() {
  const properties = await fetch('https://api.propthinks.com/properties');
  return <PropertyGrid properties={properties} />;
}

// ❌ WRONG - Don't fetch on client unless needed
'use client';
export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  useEffect(() => { fetch(...) }, []);
}
```

**Use Client Components Only When Needed:**
```tsx
// ✅ CORRECT - Mark client components explicitly
'use client';
export function SearchBar() {
  const [query, setQuery] = useState('');
  return <input onChange={(e) => setQuery(e.target.value)} />;
}
```

**Server Actions for Forms:**
```tsx
// ✅ CORRECT - Server Action
async function submitInquiry(formData: FormData) {
  'use server';
  const data = { name: formData.get('name'), ... };
  await api.post('/inquiries', data);
}
```

### 2. TypeScript Strict Mode

**Always Define Types:**
```typescript
// ✅ CORRECT - Explicit types
interface PropertyCardProps {
  property: Property;
  onScheduleVisit?: (id: string) => void;
}

// ❌ WRONG - Any types
function PropertyCard(props: any) { }
```

### 3. Tailwind CSS 4 Patterns

**Use Utility Classes:**
```tsx
// ✅ CORRECT - Utility classes
<div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md">

// ❌ WRONG - Inline styles
<div style={{ display: 'flex', alignItems: 'center' }}>
```

**Component Variants with CVA:**
```tsx
// ✅ CORRECT - CVA for variants
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  "rounded-md font-semibold transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
  }
);
```

### 4. shadcn/ui Components

**Copy Components, Don't Import:**
```bash
# ✅ CORRECT - Add components via CLI
pnpm dlx shadcn@latest add button card input dialog

# ❌ WRONG - Don't install as npm package
npm install @shadcn/ui
```

**Customize After Copying:**
```tsx
// src/components/ui/button.tsx
// ✅ CORRECT - Modify copied component to match brand
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700", // Brand color
      },
    },
  }
);
```

---

## Design System

### Color Palette (Match Authenticated App)

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          // ... blue scale
          600: '#2563eb', // Main brand color
          700: '#1d4ed8',
        },
        accent: {
          500: '#10b981', // Green for success/CTAs
          600: '#059669',
        },
        neutral: {
          // Gray scale 50-900
        },
      },
    },
  },
};
```

**Usage:**
```tsx
// ✅ CORRECT - Use semantic color names
<button className="bg-primary-600 hover:bg-primary-700">Search</button>

// ❌ WRONG - Hardcoded colors
<button className="bg-blue-600">Search</button>
```

### Typography

**Font:** Poppins (match authenticated app)

```typescript
// tailwind.config.ts
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

// Apply in layout.tsx
<body className={poppins.variable}>
```

**Type Scale:**
```tsx
// ✅ CORRECT - Use Tailwind typography utilities
<h1 className="text-4xl font-bold">Find Your Home</h1>
<h2 className="text-2xl font-semibold">Featured Properties</h2>
<p className="text-base font-normal">Description text</p>
```

### Spacing

**Consistent 4px Grid:**
```tsx
// ✅ CORRECT - Use spacing scale
<div className="p-6 gap-4">          // 24px padding, 16px gap
<div className="mt-8 mb-12">         // 32px top, 48px bottom
```

---

## Security (NO COMPROMISE)

### 1. Content Security Policy (CSP)

**Strict CSP Headers:**
```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://api.propthinks.com https://web-production-43694.up.railway.app",
      "frame-ancestors 'none'",
    ].join('; '),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];
```

### 2. Input Validation (ALWAYS)

**Zod Schemas for All Forms:**
```typescript
// lib/validations.ts
import { z } from 'zod';

export const scheduleVisitSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  email: z.string().email().toLowerCase(),
  propertyId: z.string().uuid(),
  preferredDate: z.string().datetime(),
  message: z.string().max(500).optional(),
});

// ✅ CORRECT - Validate before API call
const result = scheduleVisitSchema.safeParse(formData);
if (!result.success) {
  return { error: result.error.flatten() };
}
```

**Sanitize User Inputs:**
```typescript
// ✅ CORRECT - Sanitize HTML content
import validator from 'validator';

const sanitizedMessage = validator.escape(userMessage);
```

### 3. Rate Limiting (API Routes)

```typescript
// lib/rate-limit.ts
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per 60 seconds
});

export async function rateLimit(identifier: string) {
  try {
    await rateLimiter.consume(identifier);
    return { success: true };
  } catch {
    return { success: false, error: 'Too many requests' };
  }
}

// API route usage
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await rateLimit(ip);
  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }
  // Process request...
}
```

### 4. Environment Variables

**Validation on Startup:**
```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  CONTACT_EMAIL_API_KEY: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

export const env = envSchema.parse(process.env);
```

**Never Expose Secrets:**
```typescript
// ✅ CORRECT - Server-side only (no NEXT_PUBLIC_ prefix)
const apiKey = process.env.CONTACT_EMAIL_API_KEY;

// ❌ WRONG - Exposed to client
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
```

---

## SEO Best Practices

### 1. Meta Tags (Every Page)

```typescript
// app/properties/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties for Rent in Andhra Pradesh | PropThinks',
  description: 'Browse verified properties for rent in Nellore, Guntur, Vijayawada, and Tirupati. Professional property management by PropThinks.',
  keywords: ['properties for rent', 'Nellore', 'Guntur', 'Vijayawada', 'Tirupati'],
  openGraph: {
    title: 'Find Your Perfect Home | PropThinks',
    description: 'Verified properties for rent in AP',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properties for Rent | PropThinks',
    description: 'Find your perfect home in AP',
  },
};
```

### 2. Structured Data (JSON-LD)

```typescript
// components/property/PropertyStructuredData.tsx
export function PropertyStructuredData({ property }: { property: Property }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: property.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address.street,
      addressLocality: property.address.city,
      addressRegion: property.address.state,
      postalCode: property.address.pincode,
    },
    numberOfRooms: property.bhk,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area_sqft,
      unitCode: 'FTK',
    },
    offers: {
      '@type': 'Offer',
      price: property.rent_amount,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

### 3. Dynamic Sitemap

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const properties = await fetch('https://api.propthinks.com/properties').then(r => r.json());
  
  const propertyUrls = properties.map((property) => ({
    url: `https://www.propthinks.com/properties/${property.ops_ref}`,
    lastModified: property.updated_at,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://www.propthinks.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://www.propthinks.com/properties',
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    ...propertyUrls,
  ];
}
```

---

## Performance Optimization

### 1. Image Optimization

**Always Use Next.js Image:**
```tsx
import Image from 'next/image';

// ✅ CORRECT - Next.js Image with optimization
<Image
  src={property.photo_url}
  alt={property.name}
  width={400}
  height={300}
  className="rounded-lg"
  loading="lazy"
  placeholder="blur"
  blurDataURL="/placeholder.jpg"
/>

// ❌ WRONG - Regular img tag
<img src={property.photo_url} alt={property.name} />
```

### 2. Code Splitting

**Dynamic Imports for Heavy Components:**
```tsx
// ✅ CORRECT - Lazy load heavy components
import dynamic from 'next/dynamic';

const PropertyMap = dynamic(() => import('./PropertyMap'), {
  loading: () => <div>Loading map...</div>,
  ssr: false, // Disable SSR for client-only components
});
```

### 3. Data Fetching Strategy

**Static Generation for Listings (ISR):**
```tsx
// ✅ CORRECT - Incremental Static Regeneration
export const revalidate = 300; // Revalidate every 5 minutes

export default async function PropertiesPage() {
  const properties = await fetch('https://api.propthinks.com/properties', {
    next: { revalidate: 300 },
  });
  return <PropertyGrid properties={properties} />;
}
```

**Client-side for Filters:**
```tsx
// ✅ CORRECT - TanStack Query for interactive filtering
'use client';
import { useQuery } from '@tanstack/react-query';

export function PropertySearch() {
  const { data, isLoading } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => api.getProperties(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
```

---

## Backend Integration

### API Base URL

```typescript
// lib/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
```

### Public Endpoints (No Auth)

**Property Search:**
```typescript
// lib/api.ts
export async function getProperties(filters?: PropertyFilters) {
  const params = new URLSearchParams();
  if (filters?.city) params.append('city', filters.city);
  if (filters?.bhk) params.append('bhk', filters.bhk.toString());
  if (filters?.min_rent) params.append('min_rent', filters.min_rent.toString());
  if (filters?.max_rent) params.append('max_rent', filters.max_rent.toString());

  const { data } = await api.get(`/public/properties?${params}`);
  return data;
}
```

**Schedule Visit (Unauthenticated):**
```typescript
export async function scheduleVisit(visitData: ScheduleVisitInput) {
  const { data } = await api.post('/public/visit-requests', visitData);
  return data;
}
```

**Owner Inquiry:**
```typescript
export async function submitOwnerInquiry(inquiryData: OwnerInquiryInput) {
  const { data } = await api.post('/public/owner-inquiries', inquiryData);
  return data;
}
```

---

## Mobile-First Design

### Responsive Breakpoints

```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
};
```

**Mobile-First Utility Classes:**
```tsx
// ✅ CORRECT - Mobile first, desktop overrides
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// ❌ WRONG - Desktop first
<div className="grid grid-cols-3 md:grid-cols-1">
```

### Touch-Friendly Interactions

```tsx
// ✅ CORRECT - Minimum 44px tap targets
<button className="min-h-[44px] min-w-[44px] p-3">

// ✅ CORRECT - Swipeable galleries on mobile
<div className="overflow-x-auto snap-x snap-mandatory">
```

---

## Form Patterns

### React Hook Form + Zod

```tsx
// components/forms/ScheduleVisitForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { scheduleVisitSchema } from '@/lib/validations';

export function ScheduleVisitForm({ propertyId }: { propertyId: string }) {
  const form = useForm({
    resolver: zodResolver(scheduleVisitSchema),
    defaultValues: {
      propertyId,
      name: '',
      phone: '',
      email: '',
      preferredDate: '',
    },
  });

  async function onSubmit(data: z.infer<typeof scheduleVisitSchema>) {
    try {
      await api.scheduleVisit(data);
      toast.success('Visit request submitted!');
      form.reset();
    } catch (error) {
      toast.error('Failed to submit request');
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input {...form.register('name')} placeholder="Full Name" />
      {form.formState.errors.name && (
        <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
      )}
      {/* ... other fields */}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Submitting...' : 'Schedule Visit'}
      </Button>
    </form>
  );
}
```

---

## Key Business Rules

### 1. Property Visibility

```typescript
// ✅ CORRECT - Only show active properties
export async function getPublicProperties() {
  // Backend filters for status='active' AND listing.status='active'
  // Frontend displays only verified, available properties
}
```

### 2. Pricing Display

```typescript
// ✅ CORRECT - Show all pricing components
interface PropertyPricing {
  rent_amount: number;           // Monthly rent
  security_deposit: number;      // 2 months rent
  maintenance_charge: number;    // Monthly maintenance
  token_amount: number;          // 10% of rent (refundable if not selected)
}

// Display format: ₹15,000/month + ₹30,000 deposit
```

### 3. Visit Scheduling Flow

```
User on www.propthinks.com → Clicks "Schedule Visit"
    ↓
If NOT logged in → Redirect to app.propthinks.com/signup
    ↓
After signup → Auto-create visit request
    ↓
Redirect back to app.propthinks.com/tenant/visits (authenticated)
```

### 4. PropThinks Mediation (CRITICAL)

```
NO direct owner-tenant contact information
NO owner phone numbers on property listings
NO owner email addresses on property listings

ALL communication through PropThinks:
- Visit requests → Manager coordinates
- Questions → Contact form → PropThinks responds
- Applications → PropThinks screens
```

---

## Testing Strategy

### Unit Tests (Vitest)

```typescript
// __tests__/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency, formatArea } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats Indian currency correctly', () => {
    expect(formatCurrency(15000)).toBe('₹15,000');
    expect(formatCurrency(150000)).toBe('₹1,50,000');
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/property-search.spec.ts
import { test, expect } from '@playwright/test';

test('can search properties by city', async ({ page }) => {
  await page.goto('/properties');
  await page.fill('[name="city"]', 'Nellore');
  await page.click('button:has-text("Search")');
  await expect(page.locator('.property-card')).toHaveCount(10);
});
```

---

## Deployment

### Environment Variables

**Development (.env.local):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_APP_URL=http://localhost:5173
NODE_ENV=development
```

**Production (.env.production):**
```bash
NEXT_PUBLIC_API_URL=https://web-production-43694.up.railway.app/api/v1
NEXT_PUBLIC_SITE_URL=https://www.propthinks.com
NEXT_PUBLIC_AUTH_APP_URL=https://app.propthinks.com
NODE_ENV=production
```

### Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_URL": "https://web-production-43694.up.railway.app/api/v1",
    "NEXT_PUBLIC_SITE_URL": "https://www.propthinks.com",
    "NEXT_PUBLIC_AUTH_APP_URL": "https://app.propthinks.com"
  }
}
```

---

## Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| **Lighthouse Score** | 95+ (all categories) | Chrome DevTools |
| **First Contentful Paint** | < 1.2s | Core Web Vitals |
| **Largest Contentful Paint** | < 2.5s | Core Web Vitals |
| **Time to Interactive** | < 2.5s | Lighthouse |
| **Cumulative Layout Shift** | < 0.1 | Core Web Vitals |
| **Total Blocking Time** | < 200ms | Lighthouse |
| **Bundle Size** | < 200KB (initial) | @next/bundle-analyzer |

---

## Accessibility (WCAG 2.1 AA)

```tsx
// ✅ CORRECT - Semantic HTML + ARIA labels
<button
  aria-label="Schedule visit for Luxury Villa in Nellore"
  className="..."
>
  Schedule Visit
</button>

<img
  src={property.photo_url}
  alt={`${property.name} - ${property.bhk} BHK in ${property.city}`}
/>

// ✅ CORRECT - Keyboard navigation
<div
  tabIndex={0}
  role="button"
  onKeyDown={(e) => e.key === 'Enter' && onClick()}
>
```

---

## Analytics & Monitoring

### Vercel Analytics

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Custom Events

```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    window.gtag?.('event', eventName, properties);
  }
}

// Usage
trackEvent('property_view', { property_id: 'PPTH0001', city: 'Nellore' });
trackEvent('visit_scheduled', { property_id: 'PPTH0001' });
```

---

## Anti-Patterns (NEVER DO)

❌ Client-side rendering for SEO-critical pages (use Server Components)
❌ Inline styles (use Tailwind utilities)
❌ Any types in TypeScript (always define proper types)
❌ Exposing API keys on client (use server-side only)
❌ Skipping input validation (always validate with Zod)
❌ Direct owner-tenant contact info on listings (business rule violation)
❌ Hardcoded colors/spacing (use Tailwind design tokens)
❌ Heavy JavaScript bundles (lazy load, code split)
❌ Missing alt text on images (accessibility violation)
❌ Not handling loading/error states (poor UX)

---

## Key Files

| Purpose | Location |
|---------|----------|
| Global styles | `src/styles/globals.css` |
| Tailwind config | `tailwind.config.ts` |
| Next.js config | `next.config.ts` |
| API client | `src/lib/api.ts` |
| Validation schemas | `src/lib/validations.ts` |
| Utility functions | `src/lib/utils.ts` |
| Site config | `src/config/site.ts` |
| Environment validation | `src/lib/env.ts` |
| shadcn config | `components.json` |

---

## Your Role

Assume multiple roles based on context:
- **CTO** - Technical architecture and infrastructure decisions
- **Lead Frontend Developer** - Code quality, performance, accessibility
- **UX Designer** - User experience and mobile-first design
- **SEO Specialist** - Search optimization and structured data
- **Security Engineer** - Zero compromise on security

**Always:**
- Follow Next.js 15 best practices (App Router, Server Components)
- Prioritize performance (Core Web Vitals)
- Ensure accessibility (WCAG 2.1 AA)
- Write secure code (input validation, CSP, rate limiting)
- Mobile-first responsive design
- SEO optimization for every page
- Test locally before committing

---

**Version:** 1.0  
**Last Updated:** January 20, 2026  
**Status:** Active Development
