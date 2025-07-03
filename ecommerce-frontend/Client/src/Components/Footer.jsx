import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = () => {
    if (email.trim()) {
      console.log('Newsletter subscription:', email);
      setEmail('');
      // Add your newsletter subscription logic here
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-white text-2xl font-bold mb-4">
              Male fashion<span className="text-red-500">.</span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The customer is at the heart of our unique business model, which includes design.
            </p>
            
            {/* Payment Methods */}
            <div className="flex space-x-2">
              <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-gray-800">BANK</div>
              <div className="bg-blue-600 px-2 py-1 rounded text-xs font-semibold text-white">AMEX</div>
              <div className="bg-blue-800 px-2 py-1 rounded text-xs font-semibold text-white">PayPal</div>
              <div className="bg-red-600 px-2 py-1 rounded text-xs font-semibold text-white">MC</div>
              <div className="bg-blue-700 px-2 py-1 rounded text-xs font-semibold text-white">VISA</div>
            </div>
          </div>

          {/* Shopping Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">
              Shopping
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Clothing Store</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Trending Shoes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Accessories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Sale</a></li>
            </ul>
          </div>

          {/* Shopping Info Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">
              Shopping
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Payment Methods</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Delivery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Return & Exchanges</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Be the first to know about new arrivals, look books, sales & promos!
            </p>
            
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent border-b border-gray-600 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors duration-200"
              />
              <button
                onClick={handleNewsletterSubmit}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            Copyright © 2025 2020 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;