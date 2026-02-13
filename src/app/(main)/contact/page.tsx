'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock,
  CheckCircle,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp' | 'email'>('phone');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Have questions? We're here to help. Reach out through any of our channels 
            and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="space-y-6">
            {/* Phone */}
            <a 
              href={`tel:${siteConfig.contact.phone}`}
              className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#1fb6e0]/10 rounded-xl flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-[#1fb6e0]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Us</h3>
              <p className="text-[#1fb6e0] font-medium">{siteConfig.contact.phone}</p>
              <p className="text-gray-500 text-sm mt-2">Mon-Sat, 9:00 AM - 7:00 PM</p>
            </a>

            {/* WhatsApp */}
            <a 
              href={`https://wa.me/${siteConfig.contact.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">WhatsApp</h3>
              <p className="text-green-600 font-medium">Chat with us</p>
              <p className="text-gray-500 text-sm mt-2">Quick responses during business hours</p>
            </a>

            {/* Email */}
            <a 
              href={`mailto:${siteConfig.contact.email}`}
              className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h3>
              <p className="text-blue-600 font-medium">{siteConfig.contact.email}</p>
              <p className="text-gray-500 text-sm mt-2">We'll reply within 24 hours</p>
            </a>

            {/* Office */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Our Office</h3>
              <p className="text-gray-600">Nellore, Andhra Pradesh</p>
              <p className="text-gray-500 text-sm mt-2">Serving AP markets</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              {!formSubmitted ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
                  <p className="text-gray-600 mb-6">
                    Fill out the form below and we'll get back to you shortly.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name *
                        </label>
                        <Input id="name" placeholder="Enter your name" required />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1fb6e0] focus:border-transparent"
                        >
                          <option value="">Select a topic</option>
                          <option value="rental">Looking for a rental</option>
                          <option value="list">Want to list my property</option>
                          <option value="support">Existing customer support</option>
                          <option value="partnership">Business partnership</option>
                          <option value="other">Other inquiry</option>
                        </select>
                      </div>
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
                          <Phone className="h-5 w-5 mb-1" />
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
                          <MessageCircle className="h-5 w-5 mb-1" />
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
                          <Mail className="h-5 w-5 mb-1" />
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
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>

                    <p className="text-xs text-gray-400 text-center">
                      By submitting, you agree to our{' '}
                      <Link href="/privacy" className="text-[#1fb6e0] hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-6 w-6 text-[#1fb6e0]" />
            <h2 className="text-xl font-bold text-gray-900">Business Hours</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Monday - Friday</h3>
              <p className="text-gray-600">9:00 AM - 7:00 PM IST</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Saturday</h3>
              <p className="text-gray-600">9:00 AM - 5:00 PM IST</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Sunday</h3>
              <p className="text-gray-600">Closed (Emergency only)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
