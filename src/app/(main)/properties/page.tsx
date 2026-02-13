import type { Metadata } from 'next';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { PropertyFilters } from '@/components/property/PropertyFilters';
import { searchListings, type PropertyListing } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Properties for Rent | PropThinks',
  description: 'Browse verified properties for rent in Nellore, Guntur, Vijayawada, and Tirupati. All properties professionally managed by PropThinks.',
};

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

interface PropertiesPageProps {
  searchParams: Promise<{
    city?: string;
    bhk?: string;
    budget?: string;
    type?: string;
  }>;
}

/**
 * Fetch listings from API
 */
async function getListings(params: {
  city?: string;
  bhk?: string;
  budget?: string;
  type?: string;
}): Promise<PropertyListing[]> {
  // Parse budget range
  let min_rent: number | undefined;
  let max_rent: number | undefined;
  
  if (params.budget) {
    if (params.budget === '50000+') {
      min_rent = 50000;
    } else {
      const [min, max] = params.budget.split('-').map(Number);
      min_rent = min || undefined;
      max_rent = max || undefined;
    }
  }

  try {
    const listings = await searchListings({
      city: params.city,
      bedrooms: params.bhk ? parseInt(params.bhk) : undefined,
      min_rent,
      max_rent,
      limit: 50,
    });
    
    return listings;
  } catch (error) {
    console.warn('Failed to fetch listings from API:', error);
    return [];
  }
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  const listings = await getListings(params);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
            Properties for Rent
          </h1>
          <p className="mt-2 text-gray-700 leading-relaxed">
            {listings.length} verified {listings.length === 1 ? 'property' : 'properties'} available
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyFilters 
            currentCity={params.city}
            currentBhk={params.bhk}
            currentBudget={params.budget}
          />
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyGrid properties={listings} />
        </div>
      </section>
    </>
  );
}
