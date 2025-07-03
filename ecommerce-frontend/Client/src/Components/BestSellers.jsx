import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../api/productAPI';
import { getWishlist, addToWishlist, removeFromWishlist } from '../api/wishlistAPI';
import { getProductReviews } from '../api/reviewAPI'; // new import
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [ratings, setRatings] = useState({}); // store avg ratings
  const [hovered, setHovered] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        const slice = data.slice(0, 8);
        setProducts(slice);

        if (user?.id) {
          const list = await getWishlist(user.id, true);
          setWishlist(list);
        }

        // fetch ratings
        const ratingsObj = {};
        await Promise.all(slice.map(async p => {
          const reviews = await getProductReviews(p._id);
          if (reviews.length) {
            const avg = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;
            ratingsObj[p._id] = avg;
          } else {
            ratingsObj[p._id] = 0;
          }
        }));
        setRatings(ratingsObj);

      } catch (e) {
        toast.error("Error loading products");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const isInCart = id => (cart || []).some(item => item.product._id === id);

  const handleAddToCart = async product => {
    if (!user?.id) {
      toast.warn("Please login to add items to cart.");
      return navigate("/login");
    }
    const existing = (cart || []).find(i => i.product._id === product._id);
    const qty = existing ? existing.quantity : 0;
    if (qty >= product.quantity) {
      toast.warn("Maximum available stock reached");
      return;
    }
    try {
      await addToCart(product);
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error("Failed to add to cart.");
    }
  };

  const toggleWishlist = async productId => {
    if (!user?.id) {
      toast.warn("Login first to use wishlist");
      return navigate("/login");
    }
    try {
      if (wishlist.includes(productId)) {
        await removeFromWishlist(user.id, productId);
        setWishlist(prev => prev.filter(id => id !== productId));
        toast.info("Removed from wishlist");
      } else {
        await addToWishlist(user.id, productId);
        setWishlist(prev => [...prev, productId]);
        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Error updating wishlist");
    }
  };

  const renderStars = (avg) => {
    const full = Math.floor(avg);
    const half = avg - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <div className="flex items-center justify-center gap-0.5">
        {Array(full).fill().map((_, i) => <AiFillStar key={`f${i}`} className="text-amber-400 text-sm" />)}
        {half && <BsStarHalf className="text-amber-400 text-sm" />}
        {Array(empty).fill().map((_, i) => <AiOutlineStar key={`e${i}`} className="text-gray-300 text-sm" />)}
      </div>
    );
  };

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
        <div className="flex justify-center space-x-1">
          {Array(5).fill().map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
          ))}
        </div>
        <div className="h-6 bg-gray-200 rounded-md w-1/3 mx-auto"></div>
        <div className="h-10 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Best <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Sellers</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our most popular products loved by thousands of customers worldwide
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {loading ?
            Array(8).fill().map((_, i) => <LoadingSkeleton key={i} />) :
            products.map(product => {
              const avg = ratings[product._id] || 0;
              const out = product.quantity === 0;
              const inCart = isInCart(product._id);
              const isHovered = hovered === product._id;

              return (
                <div
                  key={product._id}
                  onMouseEnter={() => setHovered(product._id)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Product Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <Link to={`/product/${product._id}`} className="block w-full h-full">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </Link>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className="absolute top-3 right-3 p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white z-10"
                    >
                      {wishlist.includes(product._id) ?
                        <FaHeart className="text-red-500 text-sm" /> :
                        <FaRegHeart className="text-gray-600 text-sm hover:text-red-500 transition-colors" />
                      }
                    </button>

                    {/* Best Seller Badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-xs text-white px-3 py-1.5 rounded-full font-medium shadow-lg">
                      ⭐ Best Seller
                    </div>

                    {/* Out of Stock Overlay */}
                    {out && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold text-sm">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    {/* Quick Actions (Desktop) */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                      <Link
                        to={`/product/${product._id}`}
                        className="w-full bg-white/95 backdrop-blur-sm text-gray-900 py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-lg border border-white/20"
                      >
                        <FaEye className="text-xs" />
                        Quick View
                      </Link>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-5 space-y-3">
                    {/* Product Name */}
                    <Link to={`/product/${product._id}`} className="block group/title">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 group-hover/title:text-amber-600 transition-colors leading-tight">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2">
                      {renderStars(avg)}
                      <span className="text-xs text-gray-500 font-medium">
                        {avg ? `(${avg.toFixed(1)})` : '(No reviews)'}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="text-center py-1">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="line-through text-gray-400 ml-2 text-sm">₹{product.originalPrice}</span>
                          <span className="ml-2 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    {!out && (
                      <div className="pt-2">
                        {inCart ? (
                          <button
                            onClick={() => navigate("/cart")}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2.5 sm:py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                          >
                            <FaShoppingCart className="text-xs" />
                            Go to Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`w-full py-2.5 sm:py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${isHovered
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xl transform scale-[1.02]'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-sm hover:shadow-md'
                              }`}
                          >
                            <FaShoppingCart className="text-xs" />
                            {isHovered ? 'Add to Cart' : 'Add to Cart'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          }
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12 lg:mt-16">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:via-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 gap-2"
          >
            View All Products
            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;