/**
 * ============================================
 * ABOUT PAGE COMPONENT — UPDATED FOR ADSENSE
 * ============================================
 */

import SEO from '../components/SEO';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <SEO
        title="About Us - Dawood Trader | Solar & Electrical Products Rahim Yar Khan"
        description="Dawood Trader is a trusted solar and electrical products supplier in Rahim Yar Khan, Punjab, Pakistan. DC breakers, MCBs, inverters, distribution boards. 500+ happy customers since 2022."
        keywords="about Dawood Trader, solar products supplier Rahim Yar Khan, electrical equipment dealer Punjab Pakistan, DC breaker supplier, MCB dealer RYK, trusted solar company Pakistan"
        url="/about"
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about' }
        ]}
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm mb-4">
            <button onClick={() => onNavigate('home')} className="text-emerald-200 hover:text-white transition-colors">
              Home
            </button>
            <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium">About Us</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">About Dawood Trader</h1>
          <p className="text-emerald-100">Solar & Electrical Products — Rahim Yar Khan, Pakistan</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT COLUMN — Content */}
          <div className="space-y-6">

            {/* Who We Are */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">1</span>
                Who We Are
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong className="text-emerald-600">Dawood Trader</strong> is a solar and electrical products supplier based in <strong>Rahim Yar Khan, Punjab, Pakistan</strong>. We started in 2022 with one straightforward goal — to make quality solar and electrical components available to homeowners, electricians, and businesses across southern Punjab at honest, transparent prices.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                What began as a small electrical shop has grown into a trusted name for DC breakers, AC MCBs, distribution boards, solar inverters, batteries, charge controllers, and all related accessories. We serve customers across Rahim Yar Khan, Bahawalpur, Sadiqabad, Liaquatpur, and surrounding areas — both in-store and through online orders.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every product we stock is personally verified for quality before it reaches our customers. We don't just sell — we help you choose the right component for your specific solar or electrical setup, whether it's a small home system or a large commercial installation.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">2</span>
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pakistan's energy situation — load shedding, rising electricity bills, grid instability — has pushed millions of families and businesses toward solar energy. Our mission is to make sure those systems are built correctly, with proper protection components that actually work when they're needed most.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We also share free technical guidance through our blog because we believe an informed customer makes better decisions — and builds safer, more reliable electrical systems. From DC breaker sizing to distribution board setup, our guides are written in plain language anyone can follow.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From initial product selection to after-sales support, we are committed to being there at every step. Our team is available on WhatsApp during business hours for quick answers to any technical question.
              </p>
            </div>

            {/* What We Sell */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">3</span>
                What We Stock
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '⚡', label: 'DC Breakers (MCB/MCCB)' },
                  { icon: '🔌', label: 'AC Circuit Breakers' },
                  { icon: '📦', label: 'Distribution Boards' },
                  { icon: '🔋', label: 'Solar Batteries' },
                  { icon: '☀️', label: 'Solar Inverters' },
                  { icon: '🔧', label: 'Charge Controllers' },
                  { icon: '📡', label: 'Solar Panels' },
                  { icon: '🛡️', label: 'Surge Protectors' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate('products')}
                className="mt-5 w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
              >
                Browse All Products →
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN — Image, Stats, Contact */}
          <div className="space-y-6">

            {/* Image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://ik.imagekit.io/dawoodtraders/About-us-imag.png?updatedAt=1759056897852"
                alt="Dawood Trader solar and electrical shop Rahim Yar Khan Pakistan"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2+', label: 'Years in Business', icon: '🗓️' },
                { value: '500+', label: 'Happy Customers', icon: '😊' },
                { value: '100+', label: 'Products Available', icon: '📦' },
                { value: '24/7', label: 'WhatsApp Support', icon: '💬' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Location Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Our Location
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong className="text-gray-800">Business:</strong> Dawood Trader</p>
                <p><strong className="text-gray-800">Address:</strong> C8C4+C93, Rahim Yar Khan, 64200, Punjab, Pakistan</p>
                <p><strong className="text-gray-800">Phone:</strong> <a href="tel:+923083611140" className="text-emerald-600">+92 308 3611140</a></p>
                <p><strong className="text-gray-800">Email:</strong> <a href="mailto:dawoodtrader@gmail.com" className="text-emerald-600">dawoodtrader@gmail.com</a></p>
              </div>
              <a
                href="https://maps.google.com/?q=C8C4+C93,Rahim+Yar+Khan,Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-emerald-600 text-sm font-semibold hover:text-emerald-700"
              >
                View on Google Maps →
              </a>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </h3>
              <p className="text-green-100 text-sm mb-4">
                Have a question about a product or your solar system? Message us directly — we respond within 10 minutes during business hours.
              </p>
              <a
                href="https://wa.me/923083611140"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Start WhatsApp Chat →
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}