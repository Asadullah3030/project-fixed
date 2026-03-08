// src/pages/TermsOfServicePage.tsx
import SEO from '../components/SEO';

interface TermsOfServicePageProps {
  onNavigate: (page: string) => void;
}

export function TermsOfServicePage({ onNavigate }: TermsOfServicePageProps) {
  const lastUpdated = 'March 7, 2026';

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <SEO
        title="Terms of Service - Dawood Trader"
        description="Terms of Service for Dawood Trader. Read our terms and conditions before using our website or purchasing our products."
        keywords="Dawood Trader terms of service, terms and conditions, website usage"
        url="/terms-of-service"
        type="website"
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm mb-4">
            <button onClick={() => onNavigate('home')} className="text-emerald-200 hover:text-white transition-colors">Home</button>
            <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-white font-medium">Terms of Service</span>
          </nav>
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-emerald-100 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-8">

          {/* Intro */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
            <p className="text-gray-700 leading-relaxed">
              Welcome to <strong className="text-emerald-700">Dawood Trader</strong>. By accessing and using our website at <strong>dawoodtrader.shop</strong>, you agree to be bound by these Terms of Service. Please read them carefully before using our website or purchasing any products.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">1</span>
              Acceptance of Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By using this website, you confirm that you are at least 18 years of age, have read and understood these Terms of Service, and agree to be bound by them. If you do not agree to these terms, please do not use our website. Dawood Trader reserves the right to update these terms at any time without prior notice.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">2</span>
              Products & Orders
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">By placing an order with Dawood Trader, you agree to the following:</p>
            <ul className="space-y-2 text-gray-600">
              {[
                'All product prices are listed in Pakistani Rupees (PKR) and are subject to change without notice.',
                'Orders are processed via WhatsApp. An order is confirmed only after receiving direct confirmation from our team.',
                'Product images are for illustration purposes. Actual product appearance may slightly vary.',
                'We reserve the right to refuse or cancel any order at our discretion.',
                'Availability of products is not guaranteed and is subject to stock levels.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">3</span>
              Delivery & Shipping
            </h2>
            <ul className="space-y-2 text-gray-600">
              {[
                'Delivery is available across Pakistan. Delivery charges may apply depending on location.',
                'Estimated delivery time is 2–5 business days after order confirmation.',
                'Dawood Trader is not responsible for delays caused by courier services or unforeseen circumstances.',
                'Risk of loss and title for products passes to you upon delivery.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">4</span>
              Returns & Refund Policy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">We want you to be satisfied with your purchase. Our return policy is as follows:</p>
            <ul className="space-y-2 text-gray-600">
              {[
                'Returns are accepted within 7 days of delivery if the product is defective or damaged.',
                'The product must be unused, in original packaging, with all accessories included.',
                'To initiate a return, contact us via WhatsApp at +92 306 1339140.',
                'Refunds will be processed within 5–7 business days after receiving the returned product.',
                'Shipping costs for returns are the responsibility of the customer unless the product is defective.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">5</span>
              Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All content on this website, including text, images, logos, product descriptions, and graphics, is the property of Dawood Trader and is protected by applicable intellectual property laws. You may not copy, reproduce, distribute, or use any content from this website without our prior written permission.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">6</span>
              Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Dawood Trader shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or website. Our total liability to you shall not exceed the amount paid for the product in question. We do not guarantee that the website will be error-free or uninterrupted.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">7</span>
              Prohibited Activities
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">When using our website, you agree NOT to:</p>
            <ul className="space-y-2 text-gray-600">
              {[
                'Use the website for any unlawful or fraudulent purpose',
                'Attempt to gain unauthorized access to any part of the website',
                'Transmit any harmful, offensive, or disruptive content',
                'Scrape, copy, or reproduce website content without permission',
                'Impersonate Dawood Trader or any of its employees',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">8</span>
              Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Rahim Yar Khan, Punjab, Pakistan.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">9</span>
              Third-Party Advertising
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may display advertisements served by Google AdSense and other third-party advertising networks. These third parties may use cookies and similar technologies to serve ads based on your browsing history. Dawood Trader is not responsible for the content of third-party advertisements. For more information, visit <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Google's Privacy Policy</a>.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Questions About These Terms?
            </h2>
            <p className="text-gray-600 mb-4">If you have any questions about our Terms of Service, please contact us:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3"><span className="text-gray-500 text-sm font-semibold w-20">Business:</span><span className="text-gray-700 font-medium">Dawood Trader</span></div>
              <div className="flex items-center gap-3"><span className="text-gray-500 text-sm font-semibold w-20">WhatsApp:</span><a href="https://wa.me/923083611140" className="text-emerald-600 hover:text-emerald-700 font-medium">+92 3083611140</a></div>
              <div className="flex items-center gap-3"><span className="text-gray-500 text-sm font-semibold w-20">Email:</span><a href="mailto:dawoodtrader@gmail.com" className="text-emerald-600 hover:text-emerald-700 font-medium">dawoodtrader@gmail.com</a></div>
              <div className="flex items-center gap-3"><span className="text-gray-500 text-sm font-semibold w-20">Location:</span><span className="text-gray-700">Rahim Yar Khan, Punjab, Pakistan</span></div>
            </div>
          </section>

          <p className="text-center text-gray-400 text-sm pt-4 border-t border-gray-100">
            These Terms of Service were last updated on <strong>{lastUpdated}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
