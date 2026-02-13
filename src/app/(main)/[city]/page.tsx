import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Home, ArrowRight, Phone, Building2, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { searchListings, getCityListingCount } from '@/lib/api';
import { siteConfig, localities, cityImages } from '@/config/site';

interface CityPageProps {
  params: Promise<{ city: string }>;
}

// Generate static params for all cities
export async function generateStaticParams() {
  return siteConfig.markets.map((market) => ({
    city: market.slug,
  }));
}

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

// Generate metadata for SEO
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const market = siteConfig.markets.find((m) => m.slug === city);
  
  if (!market) {
    return { title: 'City Not Found' };
  }

  return {
    title: `Rental Properties in ${market.name} | PropThinks`,
    description: `Find verified rental homes and apartments in ${market.name}. Browse properties with PropThinks - your trusted property management partner in Andhra Pradesh.`,
    openGraph: {
      title: `Rental Properties in ${market.name}`,
      description: `Find verified rental homes in ${market.name} with PropThinks`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const market = siteConfig.markets.find((m) => m.slug === city);
  
  if (!market) {
    notFound();
  }

  // Fetch real data from API
  const [properties, listingCount] = await Promise.all([
    searchListings({ city: market.slug, limit: 12 }).catch(() => []),
    getCityListingCount(market.slug),
  ]);
  const cityLocalities = localities[market.slug as keyof typeof localities] || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <Image
            src={cityImages[market.slug as keyof typeof cityImages] || cityImages.nellore}
            alt={`${market.name} cityscape`}
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#1fb6e0] mb-4">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Andhra Pradesh</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
              Rental Properties in {market.name}
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed drop-shadow-sm">
              Discover verified rental homes in {market.name}. From modern apartments to spacious houses, 
              find your perfect home with PropThinks' hassle-free property management.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/properties?city=${market.slug}`}>
                <Button size="lg" className="bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white">
                  Browse Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/owners">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1fb6e0]">{listingCount}</p>
              <p className="text-gray-600">Active Listings</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1fb6e0]">{cityLocalities.length}</p>
              <p className="text-gray-600">Localities Covered</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1fb6e0]">100%</p>
              <p className="text-gray-600">Verified Properties</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1fb6e0]">24/7</p>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Properties in {market.name}
              </h2>
              <p className="text-gray-600 mt-1">
                Explore our verified rental homes
              </p>
            </div>
            <Link href={`/properties?city=${market.slug}`}>
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <PropertyGrid properties={properties} city={market.name} />
        </div>
      </section>

      {/* Popular Localities */}
      {cityLocalities.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Popular Localities in {market.name}
            </h2>
            <p className="text-gray-600 mb-8">
              Find rentals in these sought-after neighborhoods
            </p>
            
            <div className="flex flex-wrap gap-3">
              {cityLocalities.map((locality) => (
                <Link
                  key={locality}
                  href={`/properties?city=${market.slug}&locality=${encodeURIComponent(locality)}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                >
                  {locality}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why PropThinks in This City */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Why Rent with PropThinks in {market.name}?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We make renting simple and stress-free in {market.name}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-[#1fb6e0]/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-[#1fb6e0]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                Every property is verified by our team. What you see is exactly what you get.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-[#1fb6e0]/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#1fb6e0]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                Our {market.name} team knows every neighborhood, helping you find the perfect home.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-[#1fb6e0]/10 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-[#1fb6e0]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Full-Service Support</h3>
              <p className="text-gray-600">
                From property visits to move-in, we handle everything so you can focus on settling in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0b3c78] to-[#1fb6e0] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Home in {market.name}?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Browse verified rentals or talk to our local team today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/properties?city=${market.slug}`}>
              <Button size="lg" className="bg-white text-[#0b3c78] hover:bg-gray-100">
                <Home className="mr-2 h-4 w-4" />
                Browse Properties
              </Button>
            </Link>
            <a href={`tel:${siteConfig.contact.phone}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-4 w-4" />
                Call Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Explore Other Cities
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {siteConfig.markets
              .filter((m) => m.slug !== market.slug)
              .map((m) => (
                <Link
                  key={m.slug}
                  href={`/${m.slug}`}
                  className="group"
                >
                  <div className="relative w-48 h-32 rounded-xl overflow-hidden">
                    <Image
                      src={cityImages[m.slug as keyof typeof cityImages] || cityImages.nellore}
                      alt={m.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-semibold">{m.name}</p>
                      <p className="text-white/70 text-sm">View properties</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
