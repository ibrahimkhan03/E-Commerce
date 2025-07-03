import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: "Fall - Winter Collections 2030",
    subtitle: "SUMMER COLLECTION",
    description:
      "A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.",
    gradient: "from-purple-900 via-blue-900 to-indigo-900",
    accentColor: "text-yellow-400",
    pattern: "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)"
  },
  {
    title: "Classic Collection for Men",
    subtitle: "NEW ARRIVAL",
    description:
      "Explore timeless fashion designed with modern elegance. Experience comfort and sophistication together.",
    gradient: "from-emerald-900 via-teal-900 to-cyan-900",
    accentColor: "text-orange-400",
    pattern: "radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)"
  },
];

export default function HeroSlider() {
  return (
    <div className="w-full relative">
      {/* Custom CSS Styles */}
      <style jsx>{`
        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
          }
        }
        
        .fade-in-left {
          animation: fadeInLeft 1s ease-out forwards;
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .fade-in-up-delay {
          animation: fadeInUp 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .fade-in-up-delay-2 {
          animation: fadeInUp 1s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        /* Responsive Height Classes */
        .hero-height {
          height: 100vh;
        }
        
        @media (min-height: 800px) {
          .hero-height {
            height: 80vh;
          }
        }
        
        @media (min-height: 900px) {
          .hero-height {
            height: 75vh;
          }
        }
        
        @media (min-height: 1000px) {
          .hero-height {
            height: 70vh;
          }
        }
        
        @media (max-height: 600px) {
          .hero-height {
            height: 100vh;
          }
        }
        
        @media (max-height: 500px) {
          .hero-height {
            height: 110vh;
          }
        }
        
        @media (max-height: 400px) {
          .hero-height {
            height: 120vh;
          }
        }
      `}</style>
      
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full hero-height"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`hero-height w-full bg-gradient-to-br ${slide.gradient} flex items-center relative overflow-hidden`}
            >
              {/* Animated Background Pattern */}
              <div 
                className="absolute inset-0 opacity-50"
                style={{
                  background: slide.pattern
                }}
              ></div>
              
              {/* Model Images - Right Side */}
              <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:flex items-end justify-end pointer-events-none">
                {index === 0 ? (
                  <div className="floating-element h-4/5 w-80 bg-gradient-to-t from-white/10 to-transparent rounded-tl-full flex items-end justify-center pb-8">
                    <div className="w-64 h-96 bg-gradient-to-b from-white/20 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <img src="https://i.postimg.cc/k5ZH6xP3/positano-shirt-sbl-24-removebg-preview.png" alt="" />
                    </div>
                  </div>
                ) : (
                  <div className="floating-element h-4/5 w-80 bg-gradient-to-t from-white/10 to-transparent rounded-tl-full flex items-end justify-center pb-8" style={{animationDelay: '1s'}}>
                    <div className="w-64 h-96 bg-gradient-to-b from-white/20 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <img src="https://i.postimg.cc/PxRGTB2H/81xzonye-To-L-UY1100-removebg-preview.png" alt="" />
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Geometric Shapes */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="floating-element absolute top-20 left-20 w-20 h-20 border border-white/20 rounded-full"></div>
                <div className="floating-element absolute bottom-32 left-16 w-16 h-16 bg-white/10 rounded-lg rotate-45" style={{animationDelay: '2s'}}></div>
                <div className="floating-element absolute top-1/3 left-1/4 w-12 h-12 border-2 border-white/30 rotate-12" style={{animationDelay: '4s'}}></div>
              </div>

              {/* Main Content */}
              <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="w-full sm:w-4/5 md:w-2/3 lg:w-3/5">
                  <p className={`text-sm md:text-base ${slide.accentColor} uppercase tracking-wider mb-3 md:mb-4 fade-in-up font-semibold`}>
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 fade-in-left text-white drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-gray-200 mb-6 md:mb-8 text-base sm:text-lg md:text-xl leading-relaxed fade-in-up-delay">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 fade-in-up-delay-2">
                    <Link
                      to="/shop"
                      className="bg-white text-gray-900 px-8 py-4 md:px-10 md:py-5 uppercase text-sm md:text-base tracking-wide hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 rounded-full font-semibold shadow-2xl pulse-glow"
                      onClick={() => {
                        console.log('Shop Now clicked');
                      }}
                    >
                      Shop Now →
                    </Link>
                    <button
                      className="border-2 border-white text-white px-8 py-4 md:px-10 md:py-5 uppercase text-sm md:text-base tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 rounded-full font-semibold backdrop-blur-sm"
                      onClick={() => {
                        console.log('View Collection clicked');
                      }}
                    >
                      View Collection
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="custom-prev absolute z-10 transform -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-full shadow-2xl hover:bg-white/30 hover:scale-110 transition-all duration-300 top-[60%] md:top-1/2 left-3 md:left-4 border border-white/30">
        <ChevronLeft size={20} className="md:w-6 md:h-6 text-white" />
      </button>
      
      <button className="custom-next absolute z-10 transform -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-full shadow-2xl hover:bg-white/30 hover:scale-110 transition-all duration-300 top-[60%] md:top-1/2 right-3 md:right-4 border border-white/30">
        <ChevronRight size={20} className="md:w-6 md:h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <div key={index} className="w-12 h-1 bg-white/30 rounded-full"></div>
        ))}
      </div>
    </div>
  );
}