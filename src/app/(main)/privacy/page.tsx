import type { Metadata } from 'next';
import { Shield, Database, Lock, Eye, UserCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | PropThinks',
  description: 'PropThinks privacy policy and data protection practices.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#1fb6e0]/20 text-[#1fb6e0] text-sm font-medium rounded-full mb-4">Legal</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/75">Last updated: January 2025</p>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-8 border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-[#1fb6e0]" />
                <span>Data Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock className="h-4 w-4 text-[#1fb6e0]" />
                <span>Secure Storage</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye className="h-4 w-4 text-[#1fb6e0]" />
                <span>Transparent Use</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UserCheck className="h-4 w-4 text-[#1fb6e0]" />
                <span>Your Rights</span>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-100">
                  <Database className="h-5 w-5 text-[#1fb6e0]" />
                  <h2 className="text-xl font-bold text-[#0f1729]">Information We Collect</h2>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We collect the following information to provide our property management services:
                </p>
                <div className="bg-slate-50 rounded-xl p-5 space-y-3">
                  <div className="flex gap-3">
                    <span className="font-medium text-[#0f1729] min-w-[140px]">Personal Info</span>
                    <span className="text-slate-600">Name, email, phone number, address</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-medium text-[#0f1729] min-w-[140px]">KYC Documents</span>
                    <span className="text-slate-600">Identity proof (Aadhaar/PAN), address proof</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-medium text-[#0f1729] min-w-[140px]">Financial Info</span>
                    <span className="text-slate-600">Bank account details for rent payments</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-medium text-[#0f1729] min-w-[140px]">Property Info</span>
                    <span className="text-slate-600">Property details, photos, documents</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-medium text-[#0f1729] min-w-[140px]">Usage Data</span>
                    <span className="text-slate-600">App interaction, visit history, preferences</span>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold text-[#0f1729] mb-4 pb-2 border-b border-slate-100">How We Use Your Information</h2>
                <p className="text-slate-600 leading-relaxed mb-4">Your information is used for:</p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Tenant screening and KYC verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Rent collection and payment processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Property maintenance coordination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Legal documentation (lease agreements)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Communication between owners, tenants, and PropThinks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Service improvement and analytics</span>
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold text-[#0f1729] mb-4 pb-2 border-b border-slate-100">Data Sharing</h2>
                <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-4">
                  <p className="text-green-800 font-medium">
                    We do NOT share your personal information with third parties except in limited circumstances.
                  </p>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>With your explicit consent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>When required by law or legal process</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>With service providers (payment gateways, storage) under strict confidentiality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>During property transactions (owner receives tenant KYC, tenant receives property details)</span>
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-100">
                  <Lock className="h-5 w-5 text-[#1fb6e0]" />
                  <h2 className="text-xl font-bold text-[#0f1729]">Data Security</h2>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We implement industry-standard security measures including:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <span className="text-[#0f1729] font-medium">Encrypted transmission</span>
                    <p className="text-sm text-slate-500 mt-1">HTTPS/TLS for all data</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <span className="text-[#0f1729] font-medium">Secure cloud storage</span>
                    <p className="text-sm text-slate-500 mt-1">Supabase infrastructure</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <span className="text-[#0f1729] font-medium">Access controls</span>
                    <p className="text-sm text-slate-500 mt-1">JWT authentication</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <span className="text-[#0f1729] font-medium">Regular audits</span>
                    <p className="text-sm text-slate-500 mt-1">Security reviews</p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold text-[#0f1729] mb-4 pb-2 border-b border-slate-100">Data Retention</h2>
                <p className="text-slate-600 leading-relaxed">
                  We retain your information for the duration of service + 7 years (as per Indian legal requirements).
                  You may request data deletion after lease termination, subject to legal retention obligations.
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-100">
                  <UserCheck className="h-5 w-5 text-[#1fb6e0]" />
                  <h2 className="text-xl font-bold text-[#0f1729]">Your Rights</h2>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">You have the right to:</p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Access your personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Request corrections to inaccurate data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Request data deletion (subject to legal obligations)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Opt-out of marketing communications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Withdraw consent (may affect service availability)</span>
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold text-[#0f1729] mb-4 pb-2 border-b border-slate-100">Contact Us</h2>
                <p className="text-slate-600 leading-relaxed">
                  For privacy-related queries or to exercise your rights, contact us at{' '}
                  <a href="mailto:support@propthinks.com" className="text-[#1fb6e0] hover:underline font-medium">
                    support@propthinks.com
                  </a>
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  This privacy policy is subject to change. We will notify users of significant updates.
                </p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
