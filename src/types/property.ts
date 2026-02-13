// =============================================================================
// PROPERTY LISTING TYPES (Matches Backend Schema)
// =============================================================================

export type FurnishingType = 'unfurnished' | 'semi_furnished' | 'fully_furnished';
export type TenantType = 'family' | 'bachelors' | 'students' | 'any';
export type ListingStatus = 'draft' | 'active' | 'under_offer' | 'leased' | 'inactive';

/**
 * Property listing from backend API
 * Matches PropertyListingRead schema from backend
 */
export interface PropertyListing {
  id: number;
  public_id: string;
  ops_ref: string | null;
  property_id: number;
  property_public_id: string | null;
  title: string;
  description: string | null;
  rent_amount: number;
  security_deposit: number;
  maintenance_amount: number;
  city: string;
  image_url: string | null;  // Hero image URL from Supabase
  locality: string | null;
  bedrooms: number;
  bathrooms: number | null;
  area_sqft: number | null;
  furnishing_type: FurnishingType;
  amenities: string[];
  tenant_type_allowed: TenantType;
  minimum_lease_months: number;
  available_from: string | null;
  status: string; // Using string to accept any status from backend
  views_count: number;
  application_count: number;
  listed_by_user_id: number | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

/**
 * Search filters for listings
 */
export interface ListingSearchFilters {
  city?: string;
  locality?: string;
  min_rent?: number;
  max_rent?: number;
  bedrooms?: number;
  furnishing_type?: FurnishingType;
  tenant_type_allowed?: TenantType;
  amenities?: string[];
  available_from?: string;
}

// =============================================================================
// LEGACY TYPES (For backwards compatibility with mock data)
// =============================================================================

/** @deprecated Use PropertyListing instead */
export interface Property {
  id: string;
  title: string;
  description: string;
  locality: string;
  city: string;
  state: string;
  bhk: number;
  bathrooms: number;
  area_sqft: number;
  rent: number;
  deposit: number;
  maintenance?: number;
  furnishing: 'unfurnished' | 'semi-furnished' | 'furnished' | 'fully-furnished';
  property_type: 'apartment' | 'house' | 'villa' | 'studio';
  amenities: string[];
  images: string[];
  available_from: string;
  posted_date: string;
}

/** @deprecated Use ListingSearchFilters instead */
export interface PropertyFilters {
  city?: string;
  bhk?: number;
  minRent?: number;
  maxRent?: number;
  type?: string;
  locality?: string;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Convert backend listing to display-friendly format
 */
export function formatListing(listing: PropertyListing) {
  return {
    ...listing,
    // Format rent for display
    rentDisplay: `₹${listing.rent_amount.toLocaleString('en-IN')}`,
    depositDisplay: `₹${listing.security_deposit.toLocaleString('en-IN')}`,
    // Normalize furnishing for display
    furnishingDisplay: listing.furnishing_type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    // Format area
    areaDisplay: listing.area_sqft ? `${listing.area_sqft} sq.ft` : null,
  };
}

/**
 * Convert old Property format to new PropertyListing format (for migration)
 */
export function legacyPropertyToListing(property: Property): PropertyListing {
  const furnishingMap: Record<string, FurnishingType> = {
    'unfurnished': 'unfurnished',
    'semi-furnished': 'semi_furnished',
    'furnished': 'fully_furnished',
    'fully-furnished': 'fully_furnished',
  };

  return {
    id: parseInt(property.id.replace(/\D/g, '')) || 0,
    public_id: property.id,
    ops_ref: property.id,
    property_id: 0,
    property_public_id: null,
    title: property.title,
    description: property.description,
    rent_amount: property.rent,
    security_deposit: property.deposit,
    maintenance_amount: property.maintenance || 0,
    city: property.city,
    locality: property.locality,
    bedrooms: property.bhk,
    bathrooms: property.bathrooms,
    area_sqft: property.area_sqft,
    furnishing_type: furnishingMap[property.furnishing] || 'unfurnished',
    amenities: property.amenities,
    tenant_type_allowed: 'any',
    minimum_lease_months: 11,
    available_from: property.available_from,
    status: 'active',
    views_count: 0,
    application_count: 0,
    listed_by_user_id: null,
    created_at: property.posted_date,
    updated_at: property.posted_date,
    published_at: property.posted_date,
    image_url: property.images?.[0] || null,
  };
}

// =============================================================================
// VISIT & INQUIRY TYPES
// =============================================================================

export interface VisitRequest {
  property_id: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: 'morning' | 'afternoon' | 'evening';
  contact_method: 'phone' | 'whatsapp' | 'email';
  message?: string;
}

export interface OwnerInquiry {
  name: string;
  email: string;
  phone: string;
  city: string;
  property_type: string;
  contact_method: 'phone' | 'whatsapp' | 'email';
  message?: string;
}
