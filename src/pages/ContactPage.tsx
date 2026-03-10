/**
 * ============================================
 * CONTACT PAGE COMPONENT — UPDATED FOR ADSENSE
 * ============================================
 */

import SEO from '../components/SEO';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <SEO
        title="Contact Us - Dawood Trader | Solar & Electrical Products Rahim Yar Khan"
        description="Contact Dawood Trader for solar & electrical products. Phone: +92 308 3611140, Email: dawoodtrader@gmail.com. Location: Rahim Yar Khan, Punjab, Pakistan. WhatsApp for fastest response!"
        keywords="contact Dawood Trader, Dawood Trader phone number, Dawood Trader address, electrical shop Rahim Yar Khan, solar products contact, WhatsApp order Pakistan"
        url="/contact"
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact Us', url: '/contact' }
        ]}
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-emerald-100">We're here to help — reach out anytime</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT — Contact Info */}
          <div className="space-y-6">

            {/* Main Contact Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Get In Touch</h2>
              <p className="text-gray-500 text-sm mb-6">
                Have a question about a product, need help choosing the right component for your solar system, or want to place an order? Reach us through any of the options below.
              </p>

              <div className="space-y-5">

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-0.5">Phone</h3>
                    <a href="tel:+923083611140" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      +92 308 3611140
                    </a>
                    <p className="text-xs text-gray-400 mt-0.5">Call or WhatsApp — Mon–Sat 9AM–8PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-0.5">Email</h3>
                    <a href="mailto:dawoodtrader@gmail.com" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      dawoodtrader@gmail.com
                    </a>
                    <p className="text-xs text-gray-400 mt-0.5">We reply within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-0.5">Shop Address</h3>
                    <p className="text-gray-600">C8C4+C93, Rahim Yar Khan,</p>
                    <p className="text-gray-600">64200, Punjab, Pakistan</p>
                    <a
                      href="https://maps.google.com/?q=C8C4+C93,Rahim+Yar+Khan,Pakistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 text-xs font-semibold hover:underline mt-1 inline-block"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-0.5">Website</h3>
                    <a
                      href="https://www.dawoodtrader.shop/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      dawoodtrader.shop
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 md:p-8 rounded-2xl text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Fastest Way — WhatsApp</h3>
                  <p className="text-green-100 text-sm">Reply within 10 minutes</p>
                </div>
              </div>
              <p className="text-green-100 text-sm mb-4">
                Send us your query, product name, or system details on WhatsApp and we'll get back to you with the right answer quickly.
              </p>
              <a
                href="https://wa.me/923083611140"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Start WhatsApp Chat
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

          </div>

          {/* RIGHT — Map + Hours */}
          <div className="space-y-6">

            {/* Google Map */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <h2 className="text-lg font-bold text-gray-800 mb-4 px-2">Our Location — Rahim Yar Khan</h2>
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.941158880479!2d70.30334637500059!3d28.421032293654605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39375b0079ccbc07%3A0xa481c471d74d91df!2sDawood%20Trader!5e0!3m2!1sen!2sus!4v1758357751326!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dawood Trader Location — Rahim Yar Khan Pakistan"
                ></iframe>
              </div>
            </div>

            {/* Business Hours — FIXED */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Business Hours
              </h2>
              <div className="space-y-2">
                {[
                  { day: 'Monday', hours: '9:00 AM – 8:00 PM', status: 'open' },
                  { day: 'Tuesday', hours: '9:00 AM – 8:00 PM', status: 'open' },
                  { day: 'Wednesday', hours: '9:00 AM – 8:00 PM', status: 'open' },
                  { day: 'Thursday', hours: '9:00 AM – 8:00 PM', status: 'open' },
                  { day: 'Friday', hours: '9:00 AM – 12:00 PM', status: 'half' },
                  { day: 'Saturday', hours: '9:00 AM – 8:00 PM', status: 'open' },
                  { day: 'Sunday', hours: '9:00 AM – 8:00 PM', status: 'open' },
                ].map((item, i) => (
                  <div key={i} className={`flex justify-between items-center py-2.5 px-3 rounded-lg ${i % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <span className="text-gray-600 text-sm font-medium">{item.day}</span>
                    <span className={`text-sm font-semibold ${item.status === 'half' ? 'text-amber-600' : 'text-gray-800'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                <p className="text-emerald-700 text-xs font-medium text-center">
                  💬 WhatsApp support available outside shop hours for urgent queries
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}