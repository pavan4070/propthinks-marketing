'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, Bath, BedDouble, ChevronLeft, ChevronRight, Home, MapPin, Phone, MessageCircle, Mail, Check, Calendar, Sofa, Building2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getPropertyById, mockProperties } from '@/data/mock-properties';
import { getListingDetail, getScheduleVisitUrl, type PropertyListing } from '@/lib/api';
import type { Property } from '@/types/property';
import { siteConfig } from '@/config/site';

// Supabase storage base URL for property photos
const SUPABASE_STORAGE_URL = 'https://vlyxfxkhpqtabrmbmsxu.supabase.co/storage/v1/object/public/property-photos';

// Helper to construct full image URL from storage path
function getFullImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  // If already a full URL, return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  // Otherwise, construct full Supabase storage URL
  return `${SUPABASE_STORAGE_URL}/${imageUrl}`;
}

// Normalized property type for display
interface NormalizedProperty {
  id: string;
  title: string;
  description: string;
  locality: string;
  city: string;
  bhk: number;
  bathrooms: number;
  area_sqft: number;
  rent: number;
  deposit: number;
  maintenance: number;
  furnishing: string;
  amenities: string[];
  images: string[];
  available_from: string;
}

// Normalize API listing or mock property to common format
function normalizeProperty(data: PropertyListing | Property): NormalizedProperty {
  if ('public_id' in data) {
    // It's a PropertyListing from API
    // Convert image_url (single string) to images array with full URL
    const fullImageUrl = getFullImageUrl(data.image_url);
    const images = fullImageUrl ? [fullImageUrl] : [];
    return {
      id: data.public_id,
      title: data.title,
      description: data.description || '',
      locality: data.locality || '',
      city: data.city,
      bhk: data.bedrooms,
      bathrooms: data.bathrooms || 1,
      area_sqft: data.area_sqft || 0,
      rent: data.rent_amount,
      deposit: data.security_deposit,
      maintenance: data.maintenance_amount,
      furnishing: data.furnishing_type.replace(/_/g, ' '),
      amenities: data.amenities,
      images: images,
      available_from: data.available_from || 'Immediate',
    };
  }
  // It's a legacy Property
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    locality: data.locality,
    city: data.city,
    bhk: data.bhk,
    bathrooms: data.bathrooms,
    area_sqft: data.area_sqft,
    rent: data.rent,
    deposit: data.deposit,
    maintenance: data.maintenance || 0,
    furnishing: data.furnishing,
    amenities: data.amenities,
    images: data.images,
    available_from: data.available_from,
  };
}

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.id as string;
  
  const [property, setProperty] = useState<NormalizedProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp' | 'email'>('phone');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchProperty() {
      setLoading(true);
      setError(null);
      
      try {
        // Try fetching from API first
        const listing = await getListingDetail(propertyId);
        setProperty(normalizeProperty(listing));
        
        // Get similar properties from mock data for now
        // TODO: Add API endpoint for similar properties
        const similar = mockProperties
          .filter((p) => p.city.toLowerCase() === listing.city.toLowerCase() && p.id !== propertyId)
          .slice(0, 3);
        setSimilarProperties(similar);
      } catch (apiError) {
        console.warn('API fetch failed, trying mock data:', apiError);
        
        // Fallback to mock data
        const mockProperty = getPropertyById(propertyId);
        if (mockProperty) {
          setProperty(normalizeProperty(mockProperty));
          const similar = mockProperties
            .filter((p) => p.city === mockProperty.city && p.id !== mockProperty.id)
            .slice(0, 3);
          setSimilarProperties(similar);
        } else {
          setError('Property not found');
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchProperty();
  }, [propertyId]);

  const nextImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, redirect to authenticated app for proper visit scheduling
    const scheduleUrl = getScheduleVisitUrl(propertyId);
    window.open(scheduleUrl, '_blank');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#1fb6e0] mx-auto mb-4" />
          <p className="text-gray-500">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Error/Not found state
  if (error || !property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/properties" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to properties
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-[16/10]">
              {property.images.length > 0 && property.images[currentImageIndex] ? (
                <Image
                  src={property.images[currentImageIndex]}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-800 to-gray-900">
                  <Home className="h-16 w-16 text-gray-600" />
                </div>
              )}
              
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-900" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-900" />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <p className="text-gray-500 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.locality}, {property.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#1fb6e0]">₹{property.rent.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">per month</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{property.bhk} BHK</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{property.bathrooms} Bath</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sofa className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900 capitalize">{property.furnishing}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">Apartment</span>
                </div>
              </div>

              {/* Description */}
              <div className="py-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">About this property</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Deposit Info */}
              <div className="py-4 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Pricing Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Monthly Rent</p>
                    <p className="text-gray-900 font-medium">₹{property.rent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Security Deposit</p>
                    <p className="text-gray-900 font-medium">₹{property.deposit.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <div className="py-4 border-t border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        <Check className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Properties in {property.city}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similarProperties.map((p) => (
                    <Link
                      key={p.id}
                      href={`/properties/${p.id}`}
                      className="group block rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={p.images[0]}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-gray-900 text-sm line-clamp-1">{p.title}</p>
                        <p className="text-[#1fb6e0] font-semibold text-sm">₹{p.rent.toLocaleString()}/mo</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Schedule Visit Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
              {!formSubmitted ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-[#1fb6e0]" />
                    <h2 className="text-lg font-semibold text-gray-900">Schedule a Visit</h2>
                  </div>
                  <p className="text-gray-500 text-sm mb-6">
                    Interested in this property? Let us know and we'll arrange a visit for you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input id="name" placeholder="Enter your name" required />
                    </div>

                    {/* Contact Method Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How should we contact you?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setContactMethod('phone')}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                            contactMethod === 'phone'
                              ? 'border-[#1fb6e0] bg-[#1fb6e0]/5 text-[#1fb6e0]'
                              : 'border-gray-200 text-gray-500 hover:border-gray-300'
                          }`}
                        >
                          <Phone className="h-5 w-5 mb-1" />
                          <span className="text-xs font-medium">Phone</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactMethod('whatsapp')}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                            contactMethod === 'whatsapp'
                              ? 'border-[#1fb6e0] bg-[#1fb6e0]/5 text-[#1fb6e0]'
                              : 'border-gray-200 text-gray-500 hover:border-gray-300'
                          }`}
                        >
                          <MessageCircle className="h-5 w-5 mb-1" />
                          <span className="text-xs font-medium">WhatsApp</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactMethod('email')}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                            contactMethod === 'email'
                              ? 'border-[#1fb6e0] bg-[#1fb6e0]/5 text-[#1fb6e0]'
                              : 'border-gray-200 text-gray-500 hover:border-gray-300'
                          }`}
                        >
                          <Mail className="h-5 w-5 mb-1" />
                          <span className="text-xs font-medium">Email</span>
                        </button>
                      </div>
                    </div>

                    {/* Contact Input */}
                    <div>
                      <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                        {contactMethod === 'phone' && 'Phone Number'}
                        {contactMethod === 'whatsapp' && 'WhatsApp Number'}
                        {contactMethod === 'email' && 'Email Address'}
                      </label>
                      <Input
                        id="contact"
                        type={contactMethod === 'email' ? 'email' : 'tel'}
                        placeholder={
                          contactMethod === 'phone' || contactMethod === 'whatsapp'
                            ? 'Enter your phone number'
                            : 'Enter your email address'
                        }
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message (Optional)
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Any specific questions or preferred visit time?"
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white">
                      Request Visit
                    </Button>
                  </form>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    By submitting, you agree to our{' '}
                    <Link href="/terms" className="text-[#1fb6e0] hover:underline">
                      Terms
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-[#1fb6e0] hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Received!</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Our team will contact you shortly to arrange a visit.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFormSubmitted(false)}
                    className="text-sm"
                  >
                    Submit another request
                  </Button>
                </div>
              )}
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-[#0b3c78] to-[#1fb6e0] rounded-2xl p-6 text-white mt-6">
              <h3 className="font-semibold mb-2">Need help?</h3>
              <p className="text-white/80 text-sm mb-4">
                Our team is here to answer your questions.
              </p>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center text-white hover:text-white/90 font-medium"
              >
                <Phone className="h-4 w-4 mr-2" />
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
