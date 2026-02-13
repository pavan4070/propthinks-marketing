# Changelog

All notable changes to the PropThinks Marketing Site will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2026-02-13

### Added - Authentication System (CRITICAL)
- **Complete authentication integration**: Marketing site now handles user signup/login locally
  - Created `AuthContext` provider for global authentication state management
  - Integrated backend auth API (`/api/v1/auth/login`, `/api/v1/auth/signup`)
  - Added OTP email verification flow for tenant/owner signup
  - Token storage in localStorage + HttpOnly refresh cookie support
  - Axios request interceptor automatically adds auth token to API calls
- **Login page**: Real authentication flow (no more redirect to app.propthinks.com)
  - Email/password login with error handling
  - "Remember me" and "Forgot password" options
  - Redirects to return URL after successful login
- **Signup page**: Multi-step registration with OTP verification
  - Step 1: User fills registration form (name, email, phone, city, password)
  - Step 2: User enters 6-digit OTP sent to email
  - Step 3: Account created, automatically logged in
  - Support for tenant/owner role selection
- **Schedule Visit**: Authentication-aware property visit scheduling
  - Unauthenticated users see "Login Required" prompt with button
  - Authenticated users can submit visit requests directly to backend
  - API integration with `/api/v1/property-visits` endpoint
  - Form pre-fills with user's name from profile
  - Real-time submission with loading states and error handling

### Changed - Architecture
- **BREAKING**: Marketing site is now self-contained for tenant experience
  - Users signup/login on marketing site (not app.propthinks.com)
  - Property visits scheduled from marketing site
  - app.propthinks.com is for property management only (owners/managers/admin)
- **API client**: Added request interceptor for automatic token injection
- **Root layout**: Wrapped app with AuthProvider for global auth access

**Impact:**
- ✅ Seamless user experience - no external redirects for signup/login
- ✅ Proper authentication required for scheduling property visits
- ✅ Token-based auth with automatic refresh (HttpOnly cookies)
- ✅ Clear separation: Marketing site for tenants, App for property management
- ⚠️ BREAKING: Old login/signup redirects to app.propthinks.com removed

**Testing Required:**
- [ ] Signup flow: Email OTP verification, account creation
- [ ] Login flow: Authentication, token storage, redirect to return URL
- [ ] Schedule Visit: Auth check, form submission, API integration
- [ ] Token refresh: Automatic renewal when access token expires
- [ ] Logout: Clear tokens and redirect to homepage

**Files Changed:**
- `src/contexts/AuthContext.tsx` (NEW) - Authentication state management
- `src/lib/api.ts` - Added auth endpoints + token interceptor
- `src/app/(auth)/login/page.tsx` - Real API integration
- `src/app/(auth)/signup/page.tsx` - OTP verification flow
- `src/app/(main)/properties/[id]/page.tsx` - Auth-aware visit scheduling
- `src/app/layout.tsx` - Wrapped with AuthProvider

### Fixed - Property Listing Images
- **Removed mock data fallback**: Homepage no longer falls back to mock data when API fails
  - `getFeaturedProperties()` now returns empty array instead of `mockProperties`
  - Better to show "Coming Soon" message than outdated mock data
- **Added empty state UI**: Homepage Featured Properties section now shows friendly message when no properties available
  - Displays "Coming Soon" message with contact link
  - Gracefully handles API errors without exposing them to users
- **Backend integration**: All listing endpoints now return guaranteed non-null `image_url` values
  - Backend `ImageService` provides Unsplash placeholders when no photos uploaded
  - No more empty image boxes on property cards

### Changed
- **Removed mock data import**: Cleaned up homepage import of `mockProperties`
- **Updated type annotations**: `getFeaturedProperties()` returns `PropertyListing[]` instead of mixed types
- **Error handling**: API errors logged to console but don't break user experience

**Impact:**
- ✅ Homepage works reliably with real backend data
- ✅ No more confusion between mock and real data
- ✅ Better UX with empty state messaging
- ✅ All images display correctly (uploaded photos or placeholders)

## [Unreleased] - 2026-02-03

### Fixed
- **Main layout spacing**: aligned page content top offset with the fixed header for consistent vertical rhythm.
- **Homepage alignment**: improved markets row wrapping so links and separators don’t look cramped or misaligned.
- **Search bar responsiveness**: increased padding and made the submit button full-width on small screens.
- **Global CSS reset**: removed `* { padding: 0; margin: 0; }` which was overriding Tailwind spacing utilities and causing cramped layouts.
- **Internal page heroes**: strengthened hero headings/subtitles (typography + contrast) so they don’t look dull or washed out.
- **Branding assets**: updated marketing logo and navbar/footer logos to use the provided images from `propthinks-app`.
- **Favicon**: switched to the provided PNG logo (`/favicon.png`) and added `/favicon.ico` for broad browser compatibility.
- **Images**: fixed global CSS that unintentionally hid lazy-loaded images (including the footer logo).
- **Auth forms**: added `autocomplete` hints on login/signup inputs for better autofill and fewer console warnings.

### Changed
- **Homepage hero background**: added subtle blurred accent shapes behind the hero for a more polished look (no layout changes).
- **Homepage property search**: redesigned the search component to a modern "unified bar" (pill-shaped) style with floating labels and clean dividers.

## [0.3.0] - 2025-01-27

### Added
- **Contact Form Component** (`src/components/forms/ContactForm.tsx`):
  - Professional contact form with subject selection dropdown
  - Zod validation with comprehensive error handling
  - Loading/success/error states with proper icons
  - Integrated into Contact page

- **Select UI Component** (`src/components/ui/select.tsx`):
  - Custom styled select dropdown matching brand design
  - ChevronDown icon indicator
  - Consistent with Input component styling

### Changed
- **Site Configuration** (`src/config/site.ts`):
  - Updated phone from placeholder `+91-XXXXXXXXXX` to actual `+91 86390 12345`
  - Added WhatsApp contact number
  - Added metadataBase for proper SEO

- **Root Layout** (`src/app/layout.tsx`):
  - Changed font from Poppins to Inter (matching CSS theme)
  - Added comprehensive metadata with keywords, authors, robots
  - Added metadataBase to fix console warnings
  - Added suppressHydrationWarning for hydration stability

- **Global CSS** (`src/styles/globals.css`):
  - Fixed @import order (Google Fonts before Tailwind)
  - Eliminates CSS build warnings

- **UI Components**:
  - Input: Improved with h-11, rounded-xl, brand focus states
  - Textarea: Consistent styling with min-h-[120px], rounded-xl

- **Owner Inquiry Form** (`src/components/forms/OwnerInquiryForm.tsx`):
  - Complete refactor with grid layout
  - Uses new Select component for dropdowns
  - Brand-colored submit button with loading state
  - Proper error display with AlertCircle icon

- **Schedule Visit Form** (`src/components/forms/ScheduleVisitForm.tsx`):
  - Added dark header section with Calendar icon
  - Improved layout and visual hierarchy

- **Contact Page** (`src/app/contact/page.tsx`):
  - Added ContactForm component
  - Restructured with 5-column grid layout
  - Improved contact info cards with hover effects
  - Added office hours and quick response sections

- **Properties Page** (`src/components/property/PropertySearch.tsx`):
  - Removed non-functional quick filter buttons
  - Added informational badges (verified, professional, no broker fees)

- **Terms Page** (`src/app/terms/page.tsx`):
  - Added hero section with Legal badge
  - Styled payment terms in clean table format
  - Improved list styling with brand colors

- **Privacy Page** (`src/app/privacy/page.tsx`):
  - Added hero section matching Terms page
  - Added key highlights bar with icons (Shield, Lock, Eye, UserCheck)
  - Information collection in styled grid
  - Data security section with 4-column grid
  - Improved overall visual hierarchy

### Fixed
- Placeholder phone number now shows real contact
- Font mismatch (Poppins declared, Inter used) now consistent
- CSS @import order warning resolved
- metadataBase console warning fixed

### Technical
- Build passes cleanly with no warnings
- All pages statically generated
- Sitemap generation working correctly

## [0.2.0] - 2025-01-XX

### Added
- Complete component library implementation:
  - shadcn/ui components: Button, Card, Input, Textarea with CVA variants
  - Property components: PropertyCard, PropertyGrid, SearchBar (client component)
  - Layout components: Header (with mobile menu), Footer (with links)
  - Form components: ScheduleVisitForm, OwnerInquiryForm (with React Hook Form + Zod validation)
  - SEO component: PropertyStructuredData (JSON-LD for search engines)

### Changed
- **All pages migrated to component-based architecture:**
  - Homepage: Uses Header, Footer, Button, Lucide icons
  - Properties: Uses Header, Footer, PropertyGrid with mock data
  - Owners: Uses Header, Footer, OwnerInquiryForm, CheckCircle icon
  - About: Uses Header, Footer with comprehensive content
  - Contact: Uses Header, Footer with siteConfig data, Mail/Phone/MapPin icons
  - Terms: Uses Header, Footer with detailed terms sections
  - Privacy: Uses Header, Footer with comprehensive privacy policy

- Improved all pages with:
  - Consistent Header/Footer layout across all pages
  - Gradient hero sections
  - Better typography and spacing
  - Comprehensive business information
  - Proper icon usage from Lucide React

### Technical
- All pages compile successfully without errors
- Homepage loads in 10.9s (626 modules), subsequent requests ~100ms
- Warning: metadataBase not set (will configure in next update)

## [0.1.0] - 2025-01-XX

### Added
- Initial Next.js 15 setup with App Router
- Complete infrastructure:
  - Security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy)
  - SEO infrastructure (next-seo, next-sitemap, metadata exports)
  - Environment validation with Zod
  - Rate limiting utility with rate-limiter-flexible
  - API client with Axios interceptors
  - Validation schemas with Zod (scheduleVisit, ownerInquiry, propertySearch)
  - Utility functions (cn, formatCurrency, formatArea, formatDate)

- Core pages:
  - Home: Hero, features, markets sections
  - Properties: Property listings page (mock data)
  - Owners: Owner inquiry page
  - About: Company information
  - Contact: Contact information
  - Terms: Terms of service
  - Privacy: Privacy policy

- Type definitions:
  - Property and PropertyListing interfaces
  - API response and error types

- Configuration:
  - Site config (name, markets, contact, social)
  - Tailwind v4 with PostCSS plugin
  - Next.js config with image optimization
  - TypeScript strict mode with paths alias

### Technical
- Framework: Next.js 15.5.9 with App Router
- React: 19.0.0
- TypeScript: 5.9.3
- Styling: Tailwind CSS 4.1.18, @tailwindcss/postcss 4.1.18
- Forms: React Hook Form 7.54.2, @hookform/resolvers 3.10.0, Zod 3.24.1
- HTTP: Axios 1.7.9
- State: TanStack Query 5.62.17
- UI: shadcn/ui components, CVA 0.7.1, clsx 2.1.1, tailwind-merge 2.6.0
- Icons: Lucide React 0.468.0
- SEO: next-seo 6.6.1, next-sitemap 4.2.3
- Analytics: @vercel/analytics 1.5.2, @vercel/speed-insights 1.1.1
- Security: rate-limiter-flexible 5.0.3, validator 13.12.0

### Changed
- Migrated from Vite to Next.js 15 for better SEO and server-side rendering
- Updated copilot-instructions.md to reflect Next.js 15 migration status

### Fixed
- PostCSS configuration for Tailwind v4 compatibility
- Environment validation and TypeScript configuration
- Security headers for production deployment
