import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Home, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatArea } from '@/lib/utils';
import type { PropertyListing } from '@/types/property';

// Supabase storage base URL for property photos
const SUPABASE_STORAGE_URL = 'https://vlyxfxkhpqtabrmbmsxu.supabase.co/storage/v1/object/public/property-photos';

// Helper to construct full image URL from storage path
function getFullImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  return `${SUPABASE_STORAGE_URL}/${imageUrl}`;
}

interface PropertyCardProps {
  property: PropertyListing;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = getFullImageUrl(property.image_url);
  const locality = property.locality || '';
  const area_sqft = property.area_sqft || 0;
  
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-gray-100 rounded-2xl shadow-sm">
      <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
            <Home className="h-12 w-12 text-gray-300" />
          </div>
        )}
        {/* BHK Badge */}
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
          {property.bedrooms} BHK
        </div>
        {/* Verified Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 shadow-sm">
          <CheckCircle2 className="h-4 w-4 text-[#1fb6e0]" />
          Verified
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-base text-gray-500 mb-3">
          <MapPin className="h-4 w-4 text-[#1fb6e0]" />
          <span className="line-clamp-1">{locality}{locality ? ', ' : ''}{property.city}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span>{property.bedrooms} Bed</span>
          <span className="text-gray-300">•</span>
          <span>{property.bathrooms || 1} Bath</span>
          {area_sqft > 0 && (
            <>
              <span className="text-gray-300">•</span>
              <span>{formatArea(area_sqft)}</span>
            </>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(property.rent_amount)}
          </p>
          <span className="text-gray-500">/month</span>
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <Button 
          asChild 
          variant="outline"
          className="w-full h-11 text-base font-medium hover:bg-[#1fb6e0] hover:text-white hover:border-[#1fb6e0] transition-colors"
        >
          <Link href={`/properties/${property.public_id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
