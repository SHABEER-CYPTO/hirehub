import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#00b0f3] via-[#75cfea] to-[#DEF0FC] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 animate-fadeIn">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 animate-fadeIn delay-100">
            We're here to help! Reach out with any questions or feedback.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="backdrop-blur-xl bg-white/20 p-8 rounded-xl shadow-lg animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none transition-all"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none transition-all"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Send Message
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-fadeIn delay-100">
              <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-purple-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-700">support@hirehub.com</p>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-purple-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <p className="text-gray-700">+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-purple-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-gray-700">123 HireHub St, Tech City, TC 12345</p>
                </div>
              </div>
              {/* Map Placeholder */}
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">[Map Placeholder - Integrate Google Maps Here]</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;