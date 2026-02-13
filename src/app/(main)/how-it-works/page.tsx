import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  FileCheck, 
  Home,
  ArrowRight,
  CheckCircle,
  Shield,
  Phone,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'How It Works | PropThinks',
  description: 'Learn how PropThinks makes renting simple. From finding the perfect property to moving in, we handle everything.',
};

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Find Your Home',
    description: 'Browse verified rental properties across Nellore, Guntur, Vijayawada, and Tirupati. Filter by location, budget, and BHK to find exactly what you need.',
    features: [
      'Verified listings only',
      'Detailed photos and descriptions',
      'Transparent pricing',
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop',
  },
  {
    number: '02',
    icon: Calendar,
    title: 'Schedule a Visit',
    description: 'Found something you like? Request a visit and our team will coordinate a convenient time. No direct landlord calls - we handle all communication.',
    features: [
      'Flexible scheduling',
      'Accompanied property tours',
      'Ask all your questions',
    ],
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1996&auto=format&fit=crop',
  },
  {
    number: '03',
    icon: FileCheck,
    title: 'Apply & Get Approved',
    description: 'Submit your application with basic KYC documents. We verify everything and present your profile to the owner. No awkward negotiations - we handle it professionally.',
    features: [
      'Simple document submission',
      'Quick verification process',
      'Professional presentation',
    ],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
  },
  {
    number: '04',
    icon: Home,
    title: 'Move In',
    description: 'Once approved, sign the lease (we coordinate everything), pay your deposits, and move into your new home. Welcome to stress-free renting!',
    features: [
      'Clear lease terms',
      'Secure deposit handling',
      'Move-in assistance',
    ],
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop',
  },
];

const faqs = [
  {
    question: 'How long does the rental process take?',
    answer: 'Once you apply, the typical approval process takes 2-3 business days. You can move in as soon as the lease is signed and deposits are paid.',
  },
  {
    question: 'What documents do I need?',
    answer: 'Basic KYC documents including ID proof (Aadhaar), address proof, and income proof (salary slips or bank statements). We\'ll guide you through the exact requirements.',
  },
  {
    question: 'Is there a brokerage fee?',
    answer: 'No brokerage for tenants. We charge property owners, not you. What you see is what you pay - just rent and security deposit.',
  },
  {
    question: 'How is the security deposit handled?',
    answer: 'Security deposits are held by PropThinks (not the owner) and returned to you after inspection when you move out, subject to any deductions for damages.',
  },
  {
    question: 'Can I talk to the owner directly?',
    answer: 'PropThinks acts as the intermediary for all communication. This protects both parties and ensures professional handling of any issues that arise.',
  },
  {
    question: 'What if something breaks in the house?',
    answer: 'Simply report it through our app or call us. We coordinate all maintenance and repairs - you never need to contact the owner directly.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#1fb6e0]/20 text-[#1fb6e0] text-sm font-medium rounded-full mb-6">
            Simple Process
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            How PropThinks Works
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed">
            From finding your dream home to moving in, we make every step simple and stress-free. 
            Here's how it works.
          </p>
          <Link href="/properties">
            <Button size="lg" className="bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white">
              Start Browsing Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center mb-20 last:mb-0`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-[#1fb6e0] font-bold">Step {step.number}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="w-14 h-14 bg-[#1fb6e0]/10 rounded-2xl flex items-center justify-center mb-6">
                  <step.icon className="h-7 w-7 text-[#1fb6e0]" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">{step.description}</p>
                <ul className="space-y-3">
                  {step.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              PropThinks isn't just another listing platform. We're your property management partner.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-[#1fb6e0]/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-[#1fb6e0]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Verified Listings</h3>
              <p className="text-gray-600">
                Every property is physically verified by our team. No fake listings, no surprises.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-[#1fb6e0]/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#1fb6e0]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Intermediary Model</h3>
              <p className="text-gray-600">
                No awkward tenant-owner conversations. We handle all communication professionally.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-[#1fb6e0]/10 rounded-xl flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-[#1fb6e0]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ongoing Support</h3>
              <p className="text-gray-600">
                We don't disappear after you move in. Maintenance, renewals, issues - we're always there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0b3c78] to-[#1fb6e0] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your New Home?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Browse verified rentals across Andhra Pradesh and start your stress-free renting journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/properties">
              <Button size="lg" className="bg-white text-[#0b3c78] hover:bg-gray-100">
                <Search className="mr-2 h-4 w-4" />
                Browse Properties
              </Button>
            </Link>
            <a href={`tel:${siteConfig.contact.phone}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-4 w-4" />
                Talk to Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
