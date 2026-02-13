'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Bath, BedDouble, ChevronLeft, ChevronRight, Home, MapPin, Phone, MessageCircle, Mail, Check, Calendar, Sofa, Building2, Loader2, AlertCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getListingDetail, searchListings, schedulePropertyVisit, type PropertyListing } from '@/lib/api';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';

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

// Normalize API listing to display format
function normalizeProperty(data: PropertyListing): NormalizedProperty {
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

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  const { isAuthenticated, user } = useAuth();
  
  const [property, setProperty] = useState<NormalizedProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp' | 'email'>('phone');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [similarProperties, setSimilarProperties] = useState<PropertyListing[]>([]);
  const [listingData, setListingData] = useState<PropertyListing | null>(null);
  
  const [visitForm, setVisitForm] = useState({
    name: user?.full_name || '',
    contact: '',
    message: '',
  });

  useEffect(() => {
    async function fetchProperty() {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch from API
        const listing = await getListingDetail(propertyId);
        setListingData(listing);
        setProperty(normalizeProperty(listing));
        
        // Get similar properties from API (same city, exclude current)
        try {
          const similarListings = await searchListings({
            city: listing.city,
            limit: 4,
          });
          setSimilarProperties(
            similarListings.filter((l) => l.public_id !== propertyId).slice(0, 3)
          );
        } catch {
          // Similar properties are non-critical, ignore errors
        }
      } catch {
        setError('Property not found');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProperty();
  }, [propertyId]);

  // Update form when user logs in
  useEffect(() => {
    if (user?.full_name) {
      setVisitForm(prev => ({ ...prev, name: user.full_name }));
    }
  }, [user]);

  const nextImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      // Redirect to login with return URL
      router.push(`/login?return=/properties/${propertyId}`);
      return;
    }
    
    if (!listingData) {
      setSubmitError('Property listing data not available');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Parse requested date and time slot from form
      const today = new Date();
      const requestedDate = new Date(today);
      requestedDate.setDate(today.getDate() + 2); // Schedule 2 days from now
      
      await schedulePropertyVisit({
        property_id: listingData.property_id,
        visit_type: 'rental',
        listing_id: listingData.id,
        requested_date: requestedDate.toISOString().split('T')[0],
        requested_time_slot: visitForm.message || 'Morning (10 AM - 12 PM)',
        visitor_phone: visitForm.contact,
        visitor_notes: visitForm.message,
      });
      
      setFormSubmitted(true);
      setVisitForm({ name: user?.full_name || '', contact: '', message: '' });
    } catch (err: any) {
      console.error('Failed to schedule visit:', err);
      setSubmitError(err.response?.data?.detail || 'Failed to schedule visit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                  {similarProperties.map((p) => {
                    const imageUrl = p.image_url
                      ? (p.image_url.startsWith('http') ? p.image_url : `${SUPABASE_STORAGE_URL}/${p.image_url}`)
                      : null;
                    return (
                      <Link
                        key={p.public_id}
                        href={`/properties/${p.public_id}`}
                        className="group block rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <div className="relative aspect-[4/3]">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={p.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gray-100">
                              <Home className="h-8 w-8 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-gray-900 text-sm line-clamp-1">{p.title}</p>
                          <p className="text-[#1fb6e0] font-semibold text-sm">₹{p.rent_amount.toLocaleString()}/mo</p>
                        </div>
                      </Link>
                    );
                  })}
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

                  {!isAuthenticated ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogIn className="h-8 w-8 text-[#1fb6e0]" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Login Required</h3>
                      <p className="text-gray-500 text-sm mb-4">
                        Please login or create an account to schedule a property visit.
                      </p>
                      <Button
                        onClick={() => router.push(`/login?return=/properties/${propertyId}`)}
                        className="w-full bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white mb-2"
                      >
                        Login to Schedule Visit
                      </Button>
                      <p className="text-xs text-gray-400 mt-2">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-[#1fb6e0] hover:underline">
                          Sign up here
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {submitError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-red-700">{submitError}</p>
                        </div>
                      )}

                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <Input 
                          id="name" 
                          placeholder="Enter your name" 
                          required 
                          value={visitForm.name}
                          onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                          disabled={isSubmitting}
                        />
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
                            disabled={isSubmitting}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                              contactMethod === 'phone'
                                ? 'border-[#1fb6e0] bg-[#1fb6e0]/5 text-[#1fb6e0]'
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                            } disabled:opacity-50`}
                          >
                            <Phone className="h-5 w-5 mb-1" />
                            <span className="text-xs font-medium">Phone</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setContactMethod('whatsapp')}
                            disabled={isSubmitting}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                              contactMethod === 'whatsapp'
                                ? 'border-[#1fb6e0] bg-[#1fb6e0]/5 text-[#1fb6e0]'
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                            } disabled:opacity-50`}
                          >
                            <MessageCircle className="h-5 w-5 mb-1" />
                            <span className="text-xs font-medium">WhatsApp</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setContactMethod('email')}
                            disabled={isSubmitting}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                              contactMethod === 'email'
                                ? 'border-[#1fb6e0] bg-[#1fb6e0]/5 text-[#1fb6e0]'
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                            } disabled:opacity-50`}
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
                          value={visitForm.contact}
                          onChange={(e) => setVisitForm({ ...visitForm, contact: e.target.value })}
                          disabled={isSubmitting}
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
                          value={visitForm.message}
                          onChange={(e) => setVisitForm({ ...visitForm, message: e.target.value })}
                          disabled={isSubmitting}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Request Visit'
                        )}
                      </Button>
                    </form>
                  )}

                  {isAuthenticated && (
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
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Received!</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Our team will contact you shortly to arrange a visit.
                  </p>
                  <div className="space-y-2">
                    <Button
                      onClick={() => router.push('/properties')}
                      className="w-full bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white"
                    >
                      Browse More Properties
                    </Button>
                    <p className="text-xs text-gray-400 mt-3">
                      You can schedule visits for different properties. Max 2 active visits at a time.
                    </p>
                  </div>
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
