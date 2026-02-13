import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | PropThinks',
  description: 'PropThinks terms of service and conditions for property management services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#1fb6e0]/20 text-[#1fb6e0] text-sm font-medium rounded-full mb-4">Legal</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-white/75">Last updated: January 2025</p>
        </div>
      </section>

        {/* Content */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-slate prose-headings:text-[#0f1729] prose-headings:font-bold prose-a:text-[#1fb6e0] prose-a:no-underline hover:prose-a:underline">
              <section className="mb-10">
                <h2 className="text-xl font-bold text-[#0f1729] mb-4 pb-2 border-b border-slate-100">1. Acceptance of Terms</h2>
                <p className="text-slate-600 leading-relaxed">
                  By accessing or using PropThinks services, you agree to be bound by these Terms of Service.
                  If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold text-[#0f1729] mb-4 pb-2 border-b border-slate-100">2. Service Description</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  PropThinks provides property management services including but not limited to:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Professional tenant screening and KYC verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Rent collection and payment processing (8% commission)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Property maintenance coordination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Legal documentation and lease signing support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Security deposit management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Move-in and move-out inspections</span>
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold text-[#0f1729] mb-4 pb-2 border-b border-slate-100">3. User Obligations</h2>
                <p className="text-slate-600 leading-relaxed mb-4">Users must:</p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Provide accurate and complete information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Comply with all applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Pay all agreed-upon fees (token, rent, security deposit, maintenance)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Respect property and follow lease terms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6e0] mt-2 flex-shrink-0" />
                    <span>Communicate exclusively through PropThinks (no direct owner-tenant communication)</span>
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold text-[#0f1729] mb-4 pb-2 border-b border-slate-100">4. Payment Terms</h2>
                <div className="bg-slate-50 rounded-xl p-6 space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="font-medium text-[#0f1729]">Token</span>
                    <span className="text-slate-600">10% of monthly rent, non-refundable, deducted from first month</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="font-medium text-[#0f1729]">Security Deposit</span>
                    <span className="text-slate-600">2 months rent, held by PropThinks, returned after inspection</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="font-medium text-[#0f1729]">Rent</span>
                    <span className="text-slate-600">Due on 1st of each month, 5-day grace period, 5% late fee</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-[#0f1729]">Commission</span>
                    <span className="text-slate-600">8% of monthly rent for property management services</span>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold text-[#0f1729] mb-4 pb-2 border-b border-slate-100">5. Physical Signing Policy</h2>
                <p className="text-slate-600 leading-relaxed">
                  All lease agreements require physical signatures. PropThinks coordinates in-person signing
                  sessions and maintains scanned copies. Digital signatures are not accepted.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold text-[#0f1729] mb-4 pb-2 border-b border-slate-100">6. Limitation of Liability</h2>
                <p className="text-slate-600 leading-relaxed">
                  PropThinks acts as an intermediary and property manager. While we exercise due diligence
                  in tenant screening and property maintenance, we are not liable for tenant defaults or
                  property damage beyond our direct responsibility.
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                  For complete terms and conditions or questions, please contact us at{' '}
                  <a href="mailto:support@propthinks.com" className="text-[#1fb6e0] hover:underline">
                    support@propthinks.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
