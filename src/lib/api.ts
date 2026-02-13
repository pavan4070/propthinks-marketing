import axios from 'axios';
import type { PropertyListing, ListingSearchFilters } from '@/types/property';

// Re-export types for convenience
export type { PropertyListing, ListingSearchFilters };

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://web-production-43694.up.railway.app/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('propthinks_access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// =============================================================================
// PUBLIC ENDPOINTS (No Auth Required)
// =============================================================================

export interface ListingSearchParams {
  city?: string;
  locality?: string;
  min_rent?: number;
  max_rent?: number;
  bedrooms?: number;
  furnishing_type?: string;
  tenant_type_allowed?: string;
  amenities?: string; // Comma-separated
  available_from?: string; // ISO date
  skip?: number;
  limit?: number;
}

/**
 * Search property listings (public endpoint - no auth required)
 * @param filters - Search filters
 * @returns Array of property listings matching filters
 */
export async function searchListings(filters?: ListingSearchParams): Promise<PropertyListing[]> {
  const params = new URLSearchParams();
  
  if (filters?.city) params.append('city', filters.city);
  if (filters?.locality) params.append('locality', filters.locality);
  if (filters?.min_rent) params.append('min_rent', filters.min_rent.toString());
  if (filters?.max_rent) params.append('max_rent', filters.max_rent.toString());
  if (filters?.bedrooms) params.append('bedrooms', filters.bedrooms.toString());
  if (filters?.furnishing_type) params.append('furnishing_type', filters.furnishing_type);
  if (filters?.tenant_type_allowed) params.append('tenant_type_allowed', filters.tenant_type_allowed);
  if (filters?.amenities) params.append('amenities', filters.amenities);
  if (filters?.available_from) params.append('available_from', filters.available_from);
  if (filters?.skip !== undefined) params.append('skip', filters.skip.toString());
  if (filters?.limit !== undefined) params.append('limit', filters.limit.toString());

  const { data } = await api.get<PropertyListing[]>(`/listings/search?${params}`);
  return data;
}

/**
 * Get listing count for pagination (public endpoint)
 */
export async function getListingsCount(filters?: Omit<ListingSearchParams, 'skip' | 'limit'>): Promise<number> {
  const params = new URLSearchParams();
  
  if (filters?.city) params.append('city', filters.city);
  if (filters?.locality) params.append('locality', filters.locality);
  if (filters?.min_rent) params.append('min_rent', filters.min_rent.toString());
  if (filters?.max_rent) params.append('max_rent', filters.max_rent.toString());
  if (filters?.bedrooms) params.append('bedrooms', filters.bedrooms.toString());
  if (filters?.furnishing_type) params.append('furnishing_type', filters.furnishing_type);

  const { data } = await api.get<{ total: number }>(`/listings/count?${params}`);
  return data.total;
}

/**
 * Get popular listings (public endpoint)
 */
export async function getPopularListings(limit: number = 10): Promise<PropertyListing[]> {
  const { data } = await api.get<PropertyListing[]>(`/listings/popular?limit=${limit}`);
  return data;
}

/**
 * Get newest listings (public endpoint)
 */
export async function getNewestListings(limit: number = 10): Promise<PropertyListing[]> {
  const { data } = await api.get<PropertyListing[]>(`/listings/newest?limit=${limit}`);
  return data;
}

/**
 * Get listing detail by ID or public_id (public endpoint)
 * @param listingId - Numeric ID or UUID public_id
 */
export async function getListingDetail(listingId: string | number): Promise<PropertyListing> {
  const { data } = await api.get<PropertyListing>(`/listings/${listingId}`);
  return data;
}

// =============================================================================
// VISIT REQUESTS - Redirects to Auth App for Scheduling
// =============================================================================

/**
 * Generate URL to schedule a visit in the authenticated app
 * Note: Visit scheduling requires authentication. This redirects to app.propthinks.com
 * where users can log in and schedule their visit.
 */
export function getScheduleVisitUrl(listingPublicId: string): string {
  const authAppUrl = process.env.NEXT_PUBLIC_AUTH_APP_URL || 'https://app.propthinks.com';
  return `${authAppUrl}/tenant/schedule-visit?listing=${listingPublicId}`;
}

/**
 * Generate URL to apply for a property in the authenticated app
 */
export function getApplyUrl(listingPublicId: string): string {
  const authAppUrl = process.env.NEXT_PUBLIC_AUTH_APP_URL || 'https://app.propthinks.com';
  return `${authAppUrl}/tenant/apply?listing=${listingPublicId}`;
}

// =============================================================================
// OWNER SERVICES - Redirects to Auth App
// =============================================================================

/**
 * Generate URL for owner to list their property
 */
export function getListPropertyUrl(): string {
  const authAppUrl = process.env.NEXT_PUBLIC_AUTH_APP_URL || 'https://app.propthinks.com';
  return `${authAppUrl}/owner/properties/new`;
}

/**
 * Generate URL for owner signup
 */
export function getOwnerSignupUrl(): string {
  const authAppUrl = process.env.NEXT_PUBLIC_AUTH_APP_URL || 'https://app.propthinks.com';
  return `${authAppUrl}/signup?role=owner`;
}

// =============================================================================
// FORM SUBMISSIONS (Connected to Backend API)
// =============================================================================

export interface OwnerInquiryData {
  name: string;
  phone: string;
  email: string;
  property_type: string;
  city?: string;
  message?: string;
}

export interface OwnerInquiryResponse {
  success: boolean;
  message: string;
  inquiry_id: string;
}

/**
 * Submit owner inquiry to backend API (public endpoint - no auth required)
 * POST /api/v1/public/owner-inquiries
 */
export async function submitOwnerInquiry(data: OwnerInquiryData): Promise<OwnerInquiryResponse> {
  const { data: response } = await api.post<OwnerInquiryResponse>('/public/owner-inquiries', data);
  return response;
}

// =============================================================================
// CONTACT INQUIRIES (Public)
// =============================================================================

export interface ContactInquiryData {
  name: string;
  email?: string;
  phone?: string;
  contact_method: 'phone' | 'whatsapp' | 'email';
  subject: 'rental' | 'list' | 'support' | 'partnership' | 'other';
  message: string;
}

export interface ContactInquiryResponse {
  public_id: string;
  message: string;
}

/**
 * Submit contact/general inquiry to backend API (public endpoint - no auth required)
 * POST /api/v1/public/contact-inquiries
 */
export async function submitContactInquiry(data: ContactInquiryData): Promise<ContactInquiryResponse> {
  const { data: response } = await api.post<ContactInquiryResponse>('/public/contact-inquiries', data);
  return response;
}

/**
 * Get listing count for a specific city (public endpoint)
 * Used to show live property counts instead of hardcoded values
 */
export async function getCityListingCount(city: string): Promise<number> {
  try {
    const params = new URLSearchParams();
    params.append('city', city);
    const { data } = await api.get<{ total: number }>(`/listings/count?${params}`);
    return data.total;
  } catch {
    return 0;
  }
}

// =============================================================================
// AUTHENTICATION (Marketing Site)
// =============================================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  role: string;  // "tenant" | "owner"
  city: string;
  state: string;
  otp_code: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  role: string;
  user: {
    id: number;
    email: string;
    role: string;
    full_name: string;
    is_verified: boolean;
  };
  profile: Record<string, any>;
  message: string;
}

export interface OTPRequest {
  identifier: string;  // Email or phone
  method: 'email' | 'whatsapp';
  purpose: 'signup' | 'login' | 'reset';
}

export interface OTPResponse {
  success: boolean;
  message: string;
  identifier: string;
}

/**
 * Request OTP for email verification
 */
export async function requestOTP(data: OTPRequest): Promise<OTPResponse> {
  const { data: response } = await api.post<OTPResponse>('/verification/send', data);
  return response;
}

/**
 * User login
 */
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', credentials, {
    withCredentials: true, // Include cookies for refresh token
  });
  return data;
}

/**
 * User signup (tenant/owner)
 */
export async function signup(signupData: SignupRequest): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/signup', signupData, {
    withCredentials: true, // Include cookies for refresh token
  });
  return data;
}

/**
 * User logout
 */
export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout', {}, {
      withCredentials: true,
    });
  } catch (error) {
    console.error('Logout error:', error);
    // Continue with local logout even if API call fails
  }
}

// =============================================================================
// AUTHENTICATED PROPERTY VISITS
// =============================================================================

export interface PropertyVisitRequest {
  property_id: number;
  visit_type: 'rental' | 'sales';
  listing_id?: number;
  sales_listing_id?: number;
  requested_date: string; // ISO date string (YYYY-MM-DD)
  requested_time_slot: string;
  visitor_phone: string;
  visitor_notes?: string;
}

export interface PropertyVisitResponse {
  id: number;
  public_id: string;
  property_id: number;
  property_public_id: string;
  listing_id?: number;
  listing_public_id?: string;
  visit_type: string;
  visitor_user_id: number;
  requested_date: string;
  requested_time_slot: string;
  visitor_phone: string;
  visitor_notes?: string;
  status: string;
  created_at: string;
}

/**
 * Schedule a property visit (authenticated users only)
 * Requires: Valid access token in Authorization header
 */
export async function schedulePropertyVisit(visitData: PropertyVisitRequest): Promise<PropertyVisitResponse> {
  const { data } = await api.post<PropertyVisitResponse>('/property-visits', visitData, {
    withCredentials: true,
  });
  return data;
}
