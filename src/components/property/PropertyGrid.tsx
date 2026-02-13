'use client';

import { PropertyListing } from '@/types/property';
import { PropertyCard } from './PropertyCard';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PropertyGridProps {
  properties: PropertyListing[];
  showEmpty?: boolean;
  city?: string;
}

export function PropertyGrid({ properties, showEmpty = true, city }: PropertyGridProps) {
  if (properties.length === 0 && showEmpty) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-2xl">
        <Home className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          {city 
            ? `We're currently adding more properties in ${city}. Check back soon or explore other cities.`
            : "Try adjusting your filters to find available properties."}
        </p>
        <Link href="/properties">
          <Button variant="outline">View all properties</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.public_id} property={property} />
      ))}
    </div>
  );
}
