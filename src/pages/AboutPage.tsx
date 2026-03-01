/**
 * ============================================
 * ABOUT PAGE COMPONENT
 * ============================================
 * 
 * SEO IMPLEMENTATION:
 * - About Us page optimization
 * - Company information schema
 * - Trust-building content
 * - Local business signals
 * 
 * TARGET KEYWORDS:
 * - About Dawood Trader
 * - Solar products supplier Pakistan
 * - Electrical equipment dealer Rahim Yar Khan
 * - Trusted solar company Pakistan
 */

import SEO from '../components/SEO';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* ============================================ */}
      {/* SEO COMPONENT - About Page Meta Tags */}
      {/* ============================================ */}
      <SEO
        title="About Us - Trusted Solar & Electrical Products Supplier"
        description="Dawood Trader is Pakistan's trusted supplier of solar panels, inverters, batteries & electrical products since 2+ years. 500+ happy customers. Free delivery & warranty!"
        keywords="about Dawood Trader, solar products supplier Pakistan, electrical equipment dealer, trusted solar company, Rahim Yar Khan electrical shop, solar panel dealer, inverter supplier"
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
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">About Us</h1>
          <p className="text-emerald-100">Learn more about Dawood Trader</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Content */}
          <div className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong className="text-emerald-600">Dawood Trader</strong> is your trusted partner for high-quality solar and electronic products. We are committed to providing our customers with the best solutions to help them save money and reduce their energy bills.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our extensive range of products includes solar panels, inverters, batteries, and other essential accessories, all sourced from reputable manufacturers to ensure reliability and performance.
              </p>
              <p className="text-gray-600 leading-relaxed">
                At <strong className="text-emerald-600">Dawood Trader</strong>, we believe in the power of renewable energy and its potential to create a sustainable future. Our team of experts is dedicated to helping you find the right products that meet your specific needs and budget.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Whether you're looking to install a new solar system or upgrade your existing setup, we are here to assist you every step of the way. We pride ourselves on our exceptional customer service and support.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From initial consultation to after-sales service, we are committed to ensuring your satisfaction. Our knowledgeable staff is always available to answer your questions and provide guidance on product selection, installation, and maintenance.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Join Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Join us in our mission to promote clean energy and make a positive impact on the environment. Shop with <strong className="text-emerald-600">Dawood Trader</strong> today and take advantage of our exclusive 20% discount on all solar and electronic products.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Together, we can create a brighter, greener future for generations to come.
              </p>
              <button
                onClick={() => onNavigate('products')}
                className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all"
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Image & Stats */}
          <div className="space-y-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://ik.imagekit.io/dawoodtraders/About-us-imag.png?updatedAt=1759056897852"
                alt="About Dawood Trader"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">2+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">100+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white">
              <h3 className="font-semibold mb-2">Contact Us Today</h3>
              <p className="text-emerald-100 text-sm mb-4">
                Have questions? Our team is here to help you 24/7
              </p>
              <a
                href="https://wa.me/923061339140"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
