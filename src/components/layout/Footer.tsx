import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <Image
                src="/brand/logo-navbar-footer.png"
                alt="PropThinks"
                width={220}
                height={56}
                className="h-10 w-auto"
              />
              <span className="sr-only">PropThinks</span>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
              Find verified properties for rent in Andhra Pradesh. Professional property management so you can focus on what matters.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <a 
                href={`mailto:${siteConfig.contact.email}`} 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-base"
              >
                <Mail className="h-5 w-5 text-[#1fb6e0]" />
                <span>{siteConfig.contact.email}</span>
              </a>
              <a 
                href={`tel:${siteConfig.contact.phone}`} 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-base"
              >
                <Phone className="h-5 w-5 text-[#1fb6e0]" />
                <span>{siteConfig.contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* Properties */}
            <div>
              <h3 className="font-bold text-white mb-5 text-base">Properties</h3>
              <ul className="space-y-3">
                {siteConfig.markets.map((market) => (
                  <li key={market.slug}>
                    <Link 
                      href={`/${market.slug}`} 
                      className="text-gray-400 hover:text-white transition-colors text-base"
                    >
                      {market.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-white mb-5 text-base">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-white mb-5 text-base">Resources</h3>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-white mb-5 text-base">Legal</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} PropThinks. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>Serving Andhra Pradesh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/owners', label: 'For Owners' },
  { href: '/contact', label: 'Contact' },
];

const resourceLinks = [
  { href: '/properties', label: 'Browse Properties' },
  { href: '/signup', label: 'Create Account' },
  { href: '/login', label: 'Login' },
];

const legalLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
];
