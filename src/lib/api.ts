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
// FORM SUBMISSIONS (Placeholder - Will connect to backend later)
// =============================================================================

export interface OwnerInquiryData {
  name: string;
  phone: string;
  email: string;
  property_type: string;
  city?: string;
  message?: string;
  contact_method?: string;
}

export interface ScheduleVisitData {
  property_id: string;
  name: string;
  phone: string;
  email: string;
  preferred_date: string;
  preferred_time?: string;
  message?: string;
}

/**
 * Submit owner inquiry
 * Note: Currently stores locally and shows success. 
 * Backend endpoint to be added in future.
 */
export async function submitOwnerInquiry(data: OwnerInquiryData): Promise<{ success: boolean }> {
  // Log inquiry for now (will be sent to backend later)
  console.log('Owner inquiry submitted:', data);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, this would POST to backend
  // For now, just return success
  return { success: true };
}

/**
 * Schedule a property visit
 * Note: For unauthenticated users, this stores the request locally.
 * Full visit scheduling requires authentication via app.propthinks.com
 */
export async function scheduleVisit(data: ScheduleVisitData): Promise<{ success: boolean }> {
  // Log visit request for now (will be sent to backend later)
  console.log('Visit request submitted:', data);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, this would POST to backend
  // For now, just return success
  return { success: true };
}
