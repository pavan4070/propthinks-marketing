import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, 
  Users, 
  Building2, 
  Heart,
  ArrowRight,
  MapPin,
  CheckCircle,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { getCityListingCount } from '@/lib/api';

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About PropThinks | Property Management in AP',
  description: 'PropThinks is a property management company serving Andhra Pradesh. We make renting simple for tenants and owners.',
};

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'Verified properties, clear pricing, and honest communication. No surprises, no hidden fees.',
  },
  {
    icon: Users,
    title: 'People First',
    description: 'Whether you\'re a tenant or owner, your needs come first. We listen, understand, and deliver.',
  },
  {
    icon: Heart,
    title: 'Care for Properties',
    description: 'We treat every property like our own. Regular inspections, proper maintenance, genuine care.',
  },
  {
    icon: Building2,
    title: 'Local Expertise',
    description: 'Deep roots in Andhra Pradesh. We know these cities, neighborhoods, and what works here.',
  },
];

const stats = [
  { value: '4', label: 'Cities Served' },
  { value: '100+', label: 'Properties Managed' },
  { value: '8%', label: 'Commission Rate' },
  { value: '24hr', label: 'Response Time' },
];

export default async function AboutPage() {
  // Fetch live listing counts per city
  const cityCounts = await Promise.all(
    siteConfig.markets.map((m) => getCityListingCount(m.slug))
  );
  const marketsWithCounts = siteConfig.markets.map((m, i) => ({
    ...m,
    listingCount: cityCounts[i],
  }));
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
            alt="Modern home"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-sm">
              Making Renting
              <span className="block text-[#1fb6e0]">Simple & Stress-Free</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed drop-shadow-sm">
              PropThinks is a property management company serving Andhra Pradesh. 
              We connect tenants with their perfect homes and give property owners 
              truly passive rental income.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-[#1fb6e0]">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  PropThinks was born from a simple observation: renting in Andhra Pradesh 
                  was unnecessarily complicated. Tenants struggled to find verified properties, 
                  and owners spent too much time managing their rentals.
                </p>
                <p>
                  We set out to change that. By acting as the professional intermediary between 
                  owners and tenants, we remove the friction from the rental process. Owners get 
                  passive income. Tenants get a hassle-free home. Everyone wins.
                </p>
                <p>
                  Today, we serve four cities across AP - Nellore, Guntur, Vijayawada, and Tirupati - 
                  with plans to expand. But our mission remains the same: make renting simple.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
                alt="PropThinks team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our values guide everything we do - from how we treat properties to how we treat people.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-14 h-14 bg-[#1fb6e0]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-[#1fb6e0]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
                  alt="Property management"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How We're Different</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Full-Service Management</h4>
                    <p className="text-gray-600">We're not just a listing platform. We manage properties end-to-end.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Intermediary Model</h4>
                    <p className="text-gray-600">No direct owner-tenant contact. We handle all communication professionally.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Verified Properties Only</h4>
                    <p className="text-gray-600">Every listing is physically verified. No fake photos or misleading info.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Transparent Pricing</h4>
                    <p className="text-gray-600">8% commission for owners. No brokerage for tenants. Simple.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cities We Serve */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cities We Serve</h2>
            <p className="text-gray-600">
              Proudly serving property owners and tenants across Andhra Pradesh
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketsWithCounts.map((market) => (
              <Link
                key={market.slug}
                href={`/${market.slug}`}
                className="group block bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-[#1fb6e0]" />
                  <h3 className="text-lg font-semibold text-gray-900">{market.name}</h3>
                </div>
                <p className="text-gray-600">{market.listingCount} {market.listingCount === 1 ? 'property' : 'properties'}</p>
                <div className="mt-4 flex items-center text-[#1fb6e0] font-medium group-hover:underline">
                  Explore
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0b3c78] to-[#1fb6e0] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience PropThinks?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Whether you're looking for a home or want to list your property, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/properties">
              <Button size="lg" className="bg-white text-[#0b3c78] hover:bg-gray-100">
                Browse Properties
              </Button>
            </Link>
            <Link href="/owners">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                List Your Property
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Have Questions?</h3>
          <p className="text-gray-600 mb-6">We'd love to hear from you</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
            <a href={`tel:${siteConfig.contact.phone}`}>
              <Button variant="outline" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                {siteConfig.contact.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
