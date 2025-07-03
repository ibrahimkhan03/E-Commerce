import React from 'react';
import { Users, Award, Truck, Shield } from 'lucide-react';

const SimpleAboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Us
          </h1>
          <p className="text-xl opacity-90">
            Your trusted destination for premium men's fashion
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Story
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              We started with a simple idea: every man deserves to look and feel confident. 
              Founded in 2020, we've been curating the finest collection of men's fashion 
              that combines style, comfort, and quality.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              From casual wear to formal attire, we believe in providing clothing that 
              fits your lifestyle and enhances your personality.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-600 text-sm">Premium materials and craftsmanship</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600 text-sm">Quick delivery to your doorstep</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Shopping</h3>
              <p className="text-gray-600 text-sm">Safe and protected transactions</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Customer Care</h3>
              <p className="text-gray-600 text-sm">24/7 support for all your needs</p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg opacity-90">
            To provide modern men with high-quality, stylish clothing that boosts confidence 
            and fits perfectly into their daily lives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleAboutUs;