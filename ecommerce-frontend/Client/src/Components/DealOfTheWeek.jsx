import React, { useEffect, useState } from "react";
import { fetchDealProduct } from "../api/productAPI";
import { Link } from "react-router-dom";

const DealOfTheWeek = () => {
  const [product, setProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Clothing");
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const categories = ["Clothing", "Shoes", "Accessories"];

  // Fetch deal product on category change
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const deal = await fetchDealProduct(selectedCategory);
        setProduct(deal);
      } catch (error) {
        console.error("Error fetching deal product", error);
        setProduct(null);
      }
    };

    loadProduct();
  }, [selectedCategory]);

  // Countdown logic (24 hours from load)
  useEffect(() => {
    const target = new Date();
    target.setHours(target.getHours() + 24);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(timer);
        setCountdown({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      } else {
        const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
        const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedCategory]);

  return (
    <section className="relative py-16 md:py-20 lg:py-24 mt-6 mb-20 overflow-hidden">
      {/* Modern Purple-Indigo Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-100/30 via-transparent to-transparent"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-indigo-200 to-violet-200 rounded-full opacity-20 blur-xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-[500px]">

          {/* Enhanced Sidebar Categories */}
          <div className="w-full lg:w-1/4 order-2 lg:order-1">
            {/* Mobile Category Selector */}
            <div className="block lg:hidden mb-8">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 text-lg font-medium bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Desktop Category List */}
            <div className="hidden lg:block">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100/50">
                <h3 className="text-sm font-semibold text-purple-700 uppercase tracking-wider mb-6">Categories</h3>
                <ul className="space-y-4">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-lg font-medium ${
                          selectedCategory === cat
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105"
                            : "text-gray-600 hover:text-purple-700 hover:bg-purple-50/80 hover:shadow-md"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          {cat}
                          {selectedCategory === cat && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Content or Fallback */}
          {product ? (
            <>
              {/* Enhanced Product Image */}
              <div className="relative w-full lg:w-1/3 flex justify-center items-center order-1 lg:order-2">
                <div className="relative group">
                  {/* Image Container with Modern Effects */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-100/30 group-hover:shadow-3xl transition-all duration-500">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] object-contain transform group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Floating Price Badge */}
                    <div className="absolute -top-4 -left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-4 shadow-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                      <div className="text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide">Sale Price</p>
                        <p className="text-xl font-bold mt-1">₹{product.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Ring */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 to-indigo-400 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
                </div>
              </div>

              {/* Enhanced Product Details */}
              <div className="w-full lg:w-2/5 text-center lg:text-left order-3">
                {/* Deal Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6 shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Deal of the week
                </div>

                {/* Product Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight bg-gradient-to-r from-purple-800 to-indigo-800 bg-clip-text text-transparent">
                  {product.name}
                </h2>

                {/* Enhanced Countdown Timer */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-purple-100/30">
                  <div className="text-center mb-4">
                    <h3 className="text-sm font-semibold text-purple-700 uppercase tracking-wider">Time Remaining</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { label: "Days", value: countdown.days },
                      { label: "Hours", value: countdown.hours },
                      { label: "Minutes", value: countdown.minutes },
                      { label: "Seconds", value: countdown.seconds }
                    ].map((item, index) => (
                      <div key={item.label} className="text-center">
                        <div className="bg-gradient-to-br from-purple-700 to-indigo-700 text-white rounded-xl p-3 mb-2 shadow-lg">
                          <div className="text-2xl md:text-3xl font-bold font-mono">
                            {item.value}
                          </div>
                        </div>
                        <div className="text-xs font-medium text-purple-600 uppercase tracking-wider">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced CTA Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to={`/product/${product._id}`}>
                  <button className="group relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold uppercase tracking-wider shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L7 13m6.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      </svg>
                      Shop Now
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  </Link>
                  <Link to={`/product/${product._id}`}>
                  <button className="group bg-white/90 backdrop-blur-sm text-purple-700 px-8 py-4 rounded-xl font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl border border-purple-200 hover:border-purple-300 hover:bg-purple-50/50 transform hover:scale-105 transition-all duration-300">
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </span>
                  </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            /* Enhanced No Deal State */
            <div className="w-full lg:w-3/4 text-center order-1 lg:order-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-purple-100/30">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-700 mb-3">No Deal Available</h3>
                  <p className="text-purple-600/70 mb-6">Check back soon for amazing deals in the {selectedCategory.toLowerCase()} category!</p>
                  <Link to="/shop" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Browse All Products
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        @media (max-width: 1024px) {
          .order-1 { order: 1; }
          .order-2 { order: 2; }
          .order-3 { order: 3; }
        }
        
        /* Smooth countdown animation */
        .font-mono {
          font-feature-settings: 'tnum';
        }
        
        /* Enhanced backdrop blur support */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
      `}</style>
    </section>
  );
};

export default DealOfTheWeek;