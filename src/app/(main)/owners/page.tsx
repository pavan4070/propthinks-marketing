'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, 
  Wallet, 
  Wrench, 
  FileCheck, 
  Users, 
  Home,
  CheckCircle,
  Phone,
  MessageCircle,
  Mail,
  ArrowRight,
  Building2,
  Calendar,
  BadgeCheck,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/config/site';
import { submitOwnerInquiry } from '@/lib/api';

const benefits = [
  {
    icon: Shield,
    title: 'Professional Tenant Screening',
    description: 'We handle all KYC verification and background checks. You never deal with strangers.',
  },
  {
    icon: Wallet,
    title: 'Guaranteed Rent Collection',
    description: 'Monthly rent deposited directly to your account. No chasing tenants.',
  },
  {
    icon: Wrench,
    title: 'Maintenance Coordination',
    description: 'All repairs and maintenance handled by us. You just approve expenses.',
  },
  {
    icon: FileCheck,
    title: 'Legal Documentation',
    description: 'Lease agreements, renewals, and compliance - all managed professionally.',
  },
  {
    icon: Users,
    title: 'Zero Direct Contact',
    description: 'PropThinks is your intermediary. No tenant calls at odd hours.',
  },
  {
    icon: Home,
    title: 'Property Inspections',
    description: 'Regular inspections with photo documentation and detailed reports.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Submit Your Inquiry',
    description: 'Fill the form below and our team will contact you within 24 hours.',
  },
  {
    step: '02',
    title: 'Property Assessment',
    description: 'We visit your property, assess its condition, and discuss your requirements.',
  },
  {
    step: '03',
    title: 'Sign Agreement',
    description: 'Simple management agreement with clear terms. No hidden charges.',
  },
  {
    step: '04',
    title: 'We Handle Everything',
    description: 'From listing to tenant placement to rent collection - sit back and relax.',
  },
];

export default function OwnersPage() {
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp' | 'email'>('phone');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form field state
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Map display property types to backend-accepted values
    const propertyTypeMap: Record<string, string> = {
      '1bhk': 'apartment',
      '2bhk': 'apartment',
      '3bhk': 'apartment',
      'house': 'house',
      'villa': 'villa',
      'other': 'other',
    };

    try {
      await submitOwnerInquiry({
        name: name.trim(),
        email: contactMethod === 'email' ? contactValue.trim() : `${name.trim().toLowerCase().replace(/\s+/g, '.')}@inquiry.propthinks.com`,
        phone: contactMethod !== 'email' ? contactValue.trim() : '0000000000',
        property_type: propertyTypeMap[propertyType] || 'other',
        city: city || undefined,
        message: message.trim() || undefined,
      });
      setFormSubmitted(true);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { detail?: string } } };
      setError(
        axiosError?.response?.data?.detail ||
        'Something went wrong. Please try again or contact us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
            alt="Property management"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-[#1fb6e0]/20 text-[#1fb6e0] text-sm font-medium rounded-full mb-6">
              For Property Owners
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-sm">
              Zero Hassle.
              <span className="block text-[#1fb6e0]">Passive Income.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed drop-shadow-sm">
              List your property with PropThinks and enjoy truly passive rental income. 
              We handle everything - from finding tenants to collecting rent - so you don't have to.
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-[#1fb6e0]" />
                <span>8% Commission Only</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-[#1fb6e0]" />
                <span>No Upfront Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-[#1fb6e0]" />
                <span>Full-Service Management</span>
              </div>
            </div>

            <a href="#inquiry-form">
              <Button size="lg" className="bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Owners Love PropThinks</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We take property management seriously so you can focus on what matters to you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-[#1fb6e0]/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-[#1fb6e0]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started is simple. Just four steps to hassle-free property management.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-[#1fb6e0]/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {index < howItWorks.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 h-6 w-6 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Transparency */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0b3c78] to-[#1fb6e0] rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-white/80">No hidden fees. No surprises. Just straightforward management.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">8%</div>
                <div className="text-lg font-medium mb-4">Monthly Commission</div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1fb6e0] mt-0.5 flex-shrink-0" />
                    <span>Of collected rent only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1fb6e0] mt-0.5 flex-shrink-0" />
                    <span>No rent = No commission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1fb6e0] mt-0.5 flex-shrink-0" />
                    <span>Includes all services</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">₹0</div>
                <div className="text-lg font-medium mb-4">Upfront Cost</div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1fb6e0] mt-0.5 flex-shrink-0" />
                    <span>Free property listing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1fb6e0] mt-0.5 flex-shrink-0" />
                    <span>Free tenant search</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1fb6e0] mt-0.5 flex-shrink-0" />
                    <span>Pay only when occupied</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[#0b3c78] to-[#1fb6e0] p-8 text-white text-center">
              <Building2 className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">List Your Property</h2>
              <p className="text-white/80">
                Tell us about your property and we'll get back to you within 24 hours
              </p>
            </div>
            
            <div className="p-8">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Property City *
                      </label>
                      <select
                        id="city"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1fb6e0] focus:border-transparent disabled:opacity-50"
                      >
                        <option value="">Select city</option>
                        {siteConfig.markets.map((market) => (
                          <option key={market.slug} value={market.name}>
                            {market.name}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type *
                    </label>
                    <select
                      id="propertyType"
                      required
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1fb6e0] focus:border-transparent disabled:opacity-50"
                    >
                      <option value="">Select type</option>
                      <option value="1bhk">1 BHK Apartment</option>
                      <option value="2bhk">2 BHK Apartment</option>
                      <option value="3bhk">3 BHK Apartment</option>
                      <option value="house">Independent House</option>
                      <option value="villa">Villa</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Contact Method Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setContactMethod('phone')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${
                          contactMethod === 'phone'
                            ? 'border-[#1fb6e0] bg-[#1fb6e0]/5 text-[#1fb6e0]'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <Phone className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Phone</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setContactMethod('whatsapp')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${
                          contactMethod === 'whatsapp'
                            ? 'border-[#1fb6e0] bg-[#1fb6e0]/5 text-[#1fb6e0]'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <MessageCircle className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setContactMethod('email')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${
                          contactMethod === 'email'
                            ? 'border-[#1fb6e0] bg-[#1fb6e0]/5 text-[#1fb6e0]'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <Mail className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Email</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                      {contactMethod === 'phone' && 'Phone Number *'}
                      {contactMethod === 'whatsapp' && 'WhatsApp Number *'}
                      {contactMethod === 'email' && 'Email Address *'}
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
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Details (Optional)
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your property..."
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    By submitting, you agree to our{' '}
                    <Link href="/terms" className="text-[#1fb6e0] hover:underline">Terms</Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-[#1fb6e0] hover:underline">Privacy Policy</Link>
                  </p>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    We've received your inquiry. Our team will contact you within 24 hours to discuss your property.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Prefer to talk?</h3>
          <p className="text-gray-600 mb-6">Call us directly or reach out on WhatsApp</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${siteConfig.contact.phone}`}>
              <Button variant="outline" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                {siteConfig.contact.phone}
              </Button>
            </a>
            <a href={`https://wa.me/${siteConfig.contact.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
