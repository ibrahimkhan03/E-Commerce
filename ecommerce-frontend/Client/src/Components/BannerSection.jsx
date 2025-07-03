import React from 'react';
import { Link } from "react-router-dom";


const BannerSection = () => {
  return (
    <section className="w-full py-10 px-4 bg-white mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout - 2 column grid */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:h-[600px]">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Clothing Section */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm flex-1">
              <div className="flex h-full">
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    Clothing<br />
                    Collections 2030
                  </h2>
                  <Link to="/shop?category=Clothing">
                    <button className="text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-red-600 transition-all duration-300 ease-in-out self-start relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 after:ease-in-out hover:after:bg-red-600 hover:after:w-10 transform hover:translate-x-1">
                      Shop Now
                    </button>
                  </Link>
                </div>
                <div className="flex-1">
                  <img 
                    src="https://i.postimg.cc/Hnv8HdZy/banner-1.jpg" 
                    alt="Clothing Collection" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Accessories Section */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm flex-1">
              <div className="flex h-full">
                <div className="flex-1">
                  <img 
                    src="https://i.postimg.cc/c4Q6X7Z3/banner-2.jpg" 
                    alt="Accessories" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Accessories
                  </h2>
                  <Link to="/shop?category=Accessories">
                    <button className="text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-red-600 transition-all duration-300 ease-in-out self-start relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 after:ease-in-out hover:after:bg-red-600 hover:after:w-10 transform hover:translate-x-1">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Shoes */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="flex flex-col h-full">
              <div className="flex-1 p-8 flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Shoes Spring<br />
                  2030
                </h2>
                <Link to="/shop?category=Shoes">
                  <button className="text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-red-600 transition-all duration-300 ease-in-out self-start relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 after:ease-in-out hover:after:bg-red-600 hover:after:w-10 transform hover:translate-x-1">
                    Shop Now
                  </button>
                </Link>
              </div>
              <div className="flex-1">
                <img 
                  src="https://i.postimg.cc/MTq6NJzT/banner-3.jpg" 
                  alt="Shoes Spring Collection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-6">
            {/* Clothing Section */}
            <div className="col-span-2 bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="flex h-64">
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    Clothing<br />
                    Collections 2030
                  </h2>
                  <Link to="/shop?category=Clothing">
                    <button className="text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-red-600 transition-colors duration-300 self-start border-b-2 border-gray-900 hover:border-red-600 pb-1">
                      Shop Now
                    </button>
                  </Link>
                </div>
                <div className="flex-1">
                  <img 
                    src="https://i.postimg.cc/Hnv8HdZy/banner-1.jpg" 
                    alt="Clothing Collection" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Accessories Section */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-64">
                <div className="h-2/3">
                  <img 
                    src="https://i.postimg.cc/c4Q6X7Z3/banner-2.jpg" 
                    alt="Accessories" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-1/3 p-4 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Accessories
                  </h2>
                  <Link to="/shop?category=Accessories">
                    <button className="text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-red-600 transition-all duration-300 ease-in-out self-start relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 after:ease-in-out hover:after:bg-red-600 hover:after:w-10 transform hover:translate-x-1">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Shoes Section */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-64">
                <div className="h-1/3 p-4 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    Shoes Spring<br />
                    2030
                  </h2>
                  <Link to="/shop?category=Shoes">
                    <button className="text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-red-600 transition-all duration-300 ease-in-out self-start relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 after:ease-in-out hover:after:bg-red-600 hover:after:w-10 transform hover:translate-x-1">
                      Shop Now
                    </button>
                  </Link>
                </div>
                <div className="h-2/3">
                  <img 
                    src="https://i.postimg.cc/MTq6NJzT/banner-3.jpg" 
                    alt="Shoes Spring Collection" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* Clothing Section */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-48">
              <img 
                src="https://i.postimg.cc/Hnv8HdZy/banner-1.jpg" 
                alt="Clothing Collection" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                Clothing<br />
                Collections 2030
              </h2>
              <Link to="/shop?category=Clothing">
                <button className="text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-red-600 transition-all duration-300 ease-in-out border-b-2 border-gray-900 hover:border-red-600 pb-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 after:ease-in-out hover:after:bg-red-600 hover:after:w-10 transform hover:translate-x-1">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          
          {/* Accessories Section */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-48">
              <img 
                src="https://i.postimg.cc/c4Q6X7Z3/banner-2.jpg" 
                alt="Accessories" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Accessories
              </h2>
              <Link to="/shop?category=Accessories">
                <button className="text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-red-600 transition-all duration-300 ease-in-out relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 after:ease-in-out hover:after:bg-red-600 hover:after:w-10 transform hover:translate-x-1">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          
          {/* Shoes Section */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-48">
              <img 
                src="https://i.postimg.cc/MTq6NJzT/banner-3.jpg" 
                alt="Shoes Spring Collection" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                Shoes Spring<br />
                2030
              </h2>
              <Link to="/shop?category=Shoes">
                <button className="text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-red-600 transition-all duration-300 ease-in-out relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-all after:duration-300 after:ease-in-out hover:after:bg-red-600 hover:after:w-10 transform hover:translate-x-1">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;