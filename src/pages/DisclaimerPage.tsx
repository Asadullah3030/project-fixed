// src/pages/DisclaimerPage.tsx
import SEO from '../components/SEO';

interface DisclaimerPageProps {
  onNavigate: (page: string) => void;
}

export function DisclaimerPage({ onNavigate }: DisclaimerPageProps) {
  const lastUpdated = 'March 7, 2026';

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <SEO
        title="Disclaimer - Dawood Trader"
        description="Disclaimer for Dawood Trader website. Important information about product accuracy, advertising, and website liability."
        keywords="Dawood Trader disclaimer, website disclaimer, product disclaimer"
        url="/disclaimer"
        type="website"
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm mb-4">
            <button onClick={() => onNavigate('home')} className="text-emerald-200 hover:text-white transition-colors">Home</button>
            <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-white font-medium">Disclaimer</span>
          </nav>
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Disclaimer</h1>
          <p className="text-emerald-100 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-8">

          {/* Intro */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 flex gap-3">
            <svg className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-gray-700 leading-relaxed">
              The information provided on <strong className="text-gray-800">dawoodtrader.shop</strong> is for general informational and commercial purposes only. By using this website, you accept this disclaimer in full. If you disagree with any part of this disclaimer, please do not use our website.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">1</span>
              Product Information Disclaimer
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We make every effort to ensure that product information on our website is accurate and up to date. However:
            </p>
            <ul className="space-y-2 text-gray-600">
              {[
                'Product specifications, prices, and availability are subject to change without notice.',
                'Product images are for reference only and actual products may slightly differ in appearance.',
                'Technical specifications provided are based on manufacturer data and may vary in real-world conditions.',
                'Dawood Trader does not guarantee that product descriptions are complete, accurate, or error-free.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">2</span>
              Google AdSense Advertising Disclaimer
            </h2>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-3">
              <p className="text-gray-600 leading-relaxed">
                This website uses <strong>Google AdSense</strong> to display advertisements. Please be aware of the following:
              </p>
              <ul className="space-y-2 text-gray-600">
                {[
                  'Ads displayed on this website are served by Google and are not endorsed or controlled by Dawood Trader.',
                  'Dawood Trader is not responsible for the content, accuracy, or claims made in any third-party advertisements.',
                  'Clicking on ads may take you to third-party websites. We are not responsible for the content or privacy practices of those sites.',
                  'Google may use cookies to show personalized ads based on your browsing history. You can control this at Google Ad Settings.',
                  'The appearance of an ad on our site does not constitute an endorsement by Dawood Trader.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-2">
                To opt out of personalized ads, visit:{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                  google.com/settings/ads
                </a>
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">3</span>
              External Links Disclaimer
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may contain links to external websites for your convenience. These links do not constitute an endorsement of those websites or their content. Dawood Trader has no control over the content, privacy policies, or practices of any third-party websites and accepts no responsibility for them. We encourage you to review the privacy policy of every website you visit.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">4</span>
              Technical Advice Disclaimer
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Any technical information, installation guidance, or product usage tips provided on this website are for general informational purposes only. They should not be considered as professional electrical or engineering advice. Always consult a qualified electrician or engineer before installing electrical products. Dawood Trader is not liable for any damage, injury, or loss resulting from the use of information on this website.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">5</span>
              Pricing Disclaimer
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All prices displayed on this website are in Pakistani Rupees (PKR) and are subject to change without notice. Prices shown reflect a discounted rate from the original price for promotional purposes. Dawood Trader reserves the right to modify prices at any time. The final price will be confirmed at the time of order via WhatsApp.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">6</span>
              Warranty Disclaimer
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This website and its content are provided "as is" without any warranties, express or implied. Dawood Trader does not warrant that the website will be available at all times, free of errors, or free of viruses. Product warranties, where applicable, are provided by the manufacturers and not by Dawood Trader directly.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Contact Us
            </h2>
            <p className="text-gray-600 mb-4">If you have any questions about this Disclaimer, please reach out:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3"><span className="text-gray-500 text-sm font-semibold w-20">Business:</span><span className="text-gray-700 font-medium">Dawood Trader</span></div>
              <div className="flex items-center gap-3"><span className="text-gray-500 text-sm font-semibold w-20">WhatsApp:</span><a href="https://wa.me/923061339140" className="text-emerald-600 hover:text-emerald-700 font-medium">+92 306 1339140</a></div>
              <div className="flex items-center gap-3"><span className="text-gray-500 text-sm font-semibold w-20">Email:</span><a href="mailto:dawoodtrader@gmail.com" className="text-emerald-600 hover:text-emerald-700 font-medium">dawoodtrader@gmail.com</a></div>
              <div className="flex items-center gap-3"><span className="text-gray-500 text-sm font-semibold w-20">Location:</span><span className="text-gray-700">Rahim Yar Khan, Punjab, Pakistan</span></div>
            </div>
          </section>

          <p className="text-center text-gray-400 text-sm pt-4 border-t border-gray-100">
            This Disclaimer was last updated on <strong>{lastUpdated}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
