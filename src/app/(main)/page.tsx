import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Shield, Headphones, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/property/PropertyCard';
import { SearchBar } from '@/components/property/SearchBar';
import { getNewestListings, getCityListingCount, type PropertyListing } from '@/lib/api';
import { siteConfig, cityImages } from '@/config/site';

// Revalidate every 60 seconds
export const revalidate = 60;

const whyPropThinks = [
  {
    title: 'Verified Properties',
    description: 'Every listing is inspected by our team. No fake listings, no surprises.',
    icon: Shield,
  },
  {
    title: 'No Hidden Charges',
    description: 'What you see is what you pay. Transparent pricing, always.',
    icon: CheckCircle,
  },
  {
    title: '24/7 Support',
    description: "We're here whenever you need us. Call, WhatsApp, or email.",
    icon: Headphones,
  },
];

const howItWorks = [
  {
    title: 'Search',
    description: 'Browse verified listings in your city',
  },
  {
    title: 'Visit',
    description: 'Schedule a free property visit',
  },
  {
    title: 'Apply',
    description: 'Submit your application online',
  },
  {
    title: 'Move In',
    description: 'Sign the lease and get your keys',
  },
];

const ownerBenefits = [
  'Verified tenants',
  'Timely rent collection',
  'Zero hassle maintenance',
];

/**
 * Fetch featured properties from API
 * Backend now guarantees non-null image_url values via ImageService
 */
async function getFeaturedProperties(): Promise<PropertyListing[]> {
  try {
    const listings = await getNewestListings(4);
    return listings;
  } catch (error) {
    console.error('Failed to fetch featured properties from API:', error);
    // Return empty array instead of mock data
    // Better to show "No properties available" than outdated mock data
    return [];
  }
}

export default async function HomePage() {
  // Get featured properties and city counts from API
  const [featuredProperties, ...cityCounts] = await Promise.all([
    getFeaturedProperties(),
    ...siteConfig.markets.map((m) => getCityListingCount(m.slug)),
  ]);

  // Build market data with live counts
  const marketsWithCounts = siteConfig.markets.map((m, i) => ({
    ...m,
    listingCount: cityCounts[i],
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0B3C78]/6 via-white to-white py-20 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#1fb6e0]/12 blur-3xl" />
          <div className="absolute top-16 right-[-140px] h-[360px] w-[360px] rounded-full bg-[#0B3C78]/10 blur-3xl" />
          <div className="absolute bottom-[-180px] left-[-140px] h-[420px] w-[420px] rounded-full bg-[#1fb6e0]/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Tagline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Find. Move. Live.
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto mb-12">
              Your perfect rental home is waiting. Browse verified properties in Andhra Pradesh.
            </p>

            {/* Search Bar */}
            <div className="mb-10">
              <SearchBar />
            </div>

            {/* Markets */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-base text-gray-500">
              <span className="font-medium">Serving:</span>
              {siteConfig.markets.map((market, index) => (
                <div key={market.slug} className="flex items-center gap-x-5 gap-y-2">
                  <Link
                    href={`/${market.slug}`}
                    className="text-gray-700 hover:text-[#1fb6e0] font-semibold transition-colors whitespace-nowrap"
                  >
                    {market.name}
                  </Link>
                  {index < siteConfig.markets.length - 1 && (
                    <span className="text-gray-300 select-none" aria-hidden>
                      •
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Featured Properties</h2>
              <p className="mt-3 text-lg text-gray-600">Handpicked homes, ready to move in</p>
            </div>
            {featuredProperties.length > 0 && (
              <Link 
                href="/properties" 
                className="text-[#1fb6e0] font-semibold text-lg flex items-center gap-2 hover:gap-3 transition-all"
              >
                View all properties
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <div className="text-gray-400 mb-4">
                <Home className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We're adding new properties daily. Check back soon or{' '}
                <Link href="/contact" className="text-[#1fb6e0] hover:underline">contact us</Link>
                {' '}if you're looking for something specific.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why PropThinks */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Why PropThinks</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              Renting should be simple. We make it happen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {whyPropThinks.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-[#1fb6e0]/10 text-[#1fb6e0] mb-6">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{item.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Four simple steps to your new home</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="relative text-center">
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[3px] bg-gray-200" />
                )}
                
                <div className="relative inline-flex mb-6">
                  <div className="h-16 w-16 rounded-full bg-[#1fb6e0] text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-[#1fb6e0]/30">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="font-bold text-xl text-gray-900 mb-3">{step.title}</h3>
                <p className="text-base text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white px-8 py-6 text-lg">
              <Link href="/properties">
                Start Searching
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Browse by City */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Browse by City</h2>
            <p className="mt-4 text-lg text-gray-600">Find homes in your preferred location</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {marketsWithCounts.map((market) => (
              <Link 
                key={market.slug}
                href={`/${market.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Image
                  src={cityImages[market.slug as keyof typeof cityImages]}
                  alt={`Properties in ${market.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-1">{market.name}</h3>
                  <p className="text-white/90 text-base">{market.listingCount} {market.listingCount === 1 ? 'property' : 'properties'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* For Owners CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0B3C78] to-[#0B3C78]/90 rounded-3xl p-10 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Own a property?
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Let us take care of everything. You relax. We manage.
                </p>
                <ul className="space-y-4">
                  {ownerBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-4 text-white text-lg">
                      <CheckCircle className="h-6 w-6 text-[#1fb6e0] flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex lg:justify-end">
                <Button asChild size="lg" className="bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white px-10 py-6 text-lg">
                  <Link href="/owners">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
