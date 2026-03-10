// src/pages/PrivacyPolicyPage.tsx
import SEO from '../components/SEO';

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  const lastUpdated = 'March 7, 2026';
  const siteName = 'Dawood Trader';
  const siteUrl = 'https://dawoodtrader.shop';
  const email = 'dawoodtrader@gmail.com';
  const phone = '+92 3083611140';

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <SEO
        title="Privacy Policy - Dawood Trader"
        description="Privacy Policy of Dawood Trader. Learn how we collect, use, and protect your personal information when you visit our website."
        keywords="Dawood Trader privacy policy, data protection, personal information"
        url="/privacy-policy"
        type="website"
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm mb-4">
            <button onClick={() => onNavigate('home')} className="text-emerald-200 hover:text-white transition-colors">
              Home
            </button>
            <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium">Privacy Policy</span>
          </nav>
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-emerald-100 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-8">

          {/* Intro */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
            <p className="text-gray-700 leading-relaxed">
              Welcome to <strong className="text-emerald-700">{siteName}</strong> ({siteUrl}). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">1</span>
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We may collect the following types of information when you visit our website or contact us:
            </p>
            <ul className="space-y-2 text-gray-600">
              {[
                'Personal identification information (name, phone number, email address) when you contact us voluntarily',
                'Device information such as IP address, browser type, and operating system',
                'Usage data including pages visited, time spent on pages, and links clicked',
                'Information you provide when you send us a WhatsApp message or email inquiry',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">2</span>
              How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="space-y-2 text-gray-600">
              {[
                'To process and respond to your product inquiries and orders',
                'To improve our website and product offerings based on your feedback',
                'To send you order updates and relevant product information (only if you contact us first)',
                'To analyze website traffic and usage patterns using Google Analytics',
                'To comply with legal obligations',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">3</span>
              Google Analytics & Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Our website uses <strong>Google Analytics</strong> to understand how visitors interact with our site. Google Analytics collects anonymous data such as:
            </p>
            <ul className="space-y-2 text-gray-600 mb-4">
              {[
                'Number of visitors and page views',
                'Geographic location (country/city level only)',
                'Device type and browser information',
                'Pages visited and time spent on the site',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-gray-600 text-sm">
                We also use <strong>Google AdSense</strong> to display advertisements. Google may use cookies to show personalized ads based on your browsing history. You can opt out of personalized advertising by visiting{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700">
                  Google Ad Settings
                </a>.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">4</span>
              Third-Party Services
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the following third-party services on our website:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { name: 'Google Analytics', purpose: 'Website traffic analysis', link: 'https://policies.google.com/privacy' },
                { name: 'Google AdSense', purpose: 'Advertising platform', link: 'https://policies.google.com/privacy' },
                { name: 'Firebase (Google)', purpose: 'Database & backend services', link: 'https://firebase.google.com/support/privacy' },
                { name: 'ImageKit', purpose: 'Image hosting and optimization', link: 'https://imagekit.io/privacy-policy/' },
                { name: 'WhatsApp', purpose: 'Customer communication', link: 'https://www.whatsapp.com/legal/privacy-policy' },
              ].map((service, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-semibold text-gray-800">{service.name}</p>
                  <p className="text-gray-500 text-sm">{service.purpose}</p>
                  <a href={service.link} target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-xs hover:underline mt-1 inline-block">
                    View Privacy Policy →
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">5</span>
              Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We take reasonable precautions to protect your information. Our website uses HTTPS encryption to ensure secure data transmission. We do not sell, trade, or rent your personal information to third parties. Your data is stored securely using Google Firebase infrastructure.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">6</span>
              Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">You have the right to:</p>
            <ul className="space-y-2 text-gray-600">
              {[
                'Request access to the personal data we hold about you',
                'Request correction or deletion of your personal data',
                'Contact us to request deletion of any personal data we may hold',
                'Disable cookies through your browser settings',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">7</span>
              Children's Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe your child has provided us with personal information, please contact us immediately and we will delete it.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">8</span>
              Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-semibold w-20">Business:</span>
                <span className="text-gray-700 font-medium">{siteName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-semibold w-20">Email:</span>
                <a href={`mailto:${email}`} className="text-emerald-600 hover:text-emerald-700 font-medium">{email}</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-semibold w-20">Phone:</span>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-emerald-600 hover:text-emerald-700 font-medium">{phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-semibold w-20">Location:</span>
                <span className="text-gray-700">Rahim Yar Khan, Punjab, Pakistan</span>
              </div>
            </div>
          </section>

          {/* Bottom note */}
          <p className="text-center text-gray-400 text-sm pt-4 border-t border-gray-100">
            This Privacy Policy was last updated on <strong>{lastUpdated}</strong> and is effective immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
