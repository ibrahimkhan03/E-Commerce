import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, fetchProductsByCategory } from "../api/productAPI";
import { getWishlist, addToWishlist, removeFromWishlist } from '../api/wishlistAPI';
import { getProductReviews } from '../api/reviewAPI';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart, FaFilter, FaTimes, FaShoppingCart, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf, BsGrid3X3Gap } from 'react-icons/bs';
import { useLocation } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [ratings, setRatings] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('low-to-high');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const location = useLocation();
const query = new URLSearchParams(location.search);
const categoryFromURL = query.get("category");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  // Filter states
  const [filters, setFilters] = useState({
    availability: { inStock: false, outOfStock: false },
    colors: [],
    priceRange: { min: 0, max: 10000 }
  });

  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    try {
      const data = categoryFromURL 
        ? await fetchProductsByCategory(categoryFromURL) 
        : await fetchProducts();
      setProducts(data);

      if (user?.id) {
        try {
          const list = await getWishlist(user.id, true);
          setWishlist(list);
        } catch (err) {
          console.warn("Wishlist error:", err);
        }
      }

      const ratingsObj = {};
      await Promise.all(data.map(async p => {
        try {
          const reviews = await getProductReviews(p._id);
          if (reviews.length) {
            const avg = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;
            ratingsObj[p._id] = avg;
          } else {
            ratingsObj[p._id] = 0;
          }
        } catch (err) {
          console.warn("Review fetch error for product", p._id, err);
          ratingsObj[p._id] = 0;
        }
      }));
      setRatings(ratingsObj);

    } catch (e) {
      console.error("Error in Shop.jsx:", e);
      toast.error("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [categoryFromURL]);


  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOrder]);

  const isInCart = id => cart.some(item => item.product._id === id);

  const handleAddToCart = async product => {
    if (!user?.id) {
      toast.warn("Please login to add items to cart.");
      return navigate("/login");
    }
    const existing = cart.find(i => i.product._id === product._id);
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

  // Filter products based on current filters
  const filteredProducts = products.filter(product => {
    // Availability filter
    if (filters.availability.inStock && product.quantity === 0) return false;
    if (filters.availability.outOfStock && product.quantity > 0) return false;
    
    // Price filter
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;
    
    // Color filter (assuming products have a color property)
    if (filters.colors.length > 0 && !filters.colors.includes(product.color)) return false;
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => sortOrder === 'low-to-high' ? a.price - b.price : b.price - a.price);

  // Pagination calculations
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(currentPage - half, 1);
      let end = Math.min(start + maxVisiblePages - 1, totalPages);
      
      if (end - start < maxVisiblePages - 1) {
        start = Math.max(end - maxVisiblePages + 1, 1);
      }
      
      if (start > 1) {
        pageNumbers.push(1);
        if (start > 2) pageNumbers.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      availability: { inStock: false, outOfStock: false },
      colors: [],
      priceRange: { min: 0, max: 10000 }
    });
  };

  const availableColors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Pink', 'Yellow', 'Purple'];

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
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Shop <span className="text-yellow-300">Collection</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
              Discover amazing products at unbeatable prices
            </p>
            <nav className="flex items-center justify-center space-x-2 text-sm">
              <Link to="/" className="text-blue-200 hover:text-white font-medium transition-colors duration-200">
                Home
              </Link>
              <span className="text-blue-300">/</span>
              <span className="text-white font-medium">Shop</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12 sm:px-6 lg:px-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 w-full justify-center font-medium"
          >
            <FaFilter className="w-4 h-4 text-gray-600" />
            Filters & Sort
            <span className="ml-auto">
              {mobileFiltersOpen ? <FaTimes className="w-4 h-4" /> : <BsGrid3X3Gap className="w-4 h-4" />}
            </span>
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Enhanced Sidebar Filters */}
          <div className={`space-y-6 ${mobileFiltersOpen ? 'block mb-8' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Sort By Price</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Availability</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.availability.inStock}
                      onChange={(e) => handleFilterChange('availability', {
                        ...filters.availability,
                        inStock: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-600">In Stock</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.availability.outOfStock}
                      onChange={(e) => handleFilterChange('availability', {
                        ...filters.availability,
                        outOfStock: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-600">Out of Stock</span>
                  </label>
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {availableColors.map(color => (
                    <button
                      key={color}
                      // onClick={() => {
                      //   const newColors = filters.colors.includes(color)
                      //     ? filters.colors.filter(c => c !== color)
                      //     : [...filters.colors, color];
                      //   handleFilterChange('colors', newColors);
                      // }}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        filters.colors.includes(color) 
                          ? 'border-gray-900 scale-110' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ 
                        backgroundColor: color.toLowerCase(),
                        ...(color === 'White' && { backgroundColor: '#ffffff', border: '2px solid #e5e7eb' })
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => handleFilterChange('priceRange', {
                        ...filters.priceRange,
                        min: parseInt(e.target.value) || 0
                      })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => handleFilterChange('priceRange', {
                        ...filters.priceRange,
                        max: parseInt(e.target.value) || 10000
                      })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    ₹{filters.priceRange.min} - ₹{filters.priceRange.max}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Product Listing - 3 columns */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-600 font-medium">
                  Showing <span className="text-gray-900 font-semibold">{startIndex + 1}-{Math.min(endIndex, totalProducts)}</span> of <span className="text-gray-900 font-semibold">{totalProducts}</span> products
                </p>
                {(filters.availability.inStock || filters.availability.outOfStock || filters.colors.length > 0) && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Filtered
                  </span>
                )}
              </div>
              {totalPages > 1 && (
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </div>

            {/* 3 Products Per Row Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {loading ? 
                Array(9).fill().map((_, i) => <LoadingSkeleton key={i} />) :
                currentProducts.map(product => {
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

                        {/* Stock Badge */}
                        {!out && (
                          <div className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                            In Stock
                          </div>
                        )}

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
                      <div className="p-5 space-y-3">
                        {/* Product Name */}
                        <Link to={`/product/${product._id}`} className="block group/title">
                          <h3 className="font-semibold text-gray-900 text-base line-clamp-2 group-hover/title:text-blue-600 transition-colors leading-tight">
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
                          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
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
                              <Link 
                                to="/cart"
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                              >
                                <FaShoppingCart className="text-xs" />
                                Go to Cart
                              </Link>
                            ) : (
                              <button 
                                onClick={() => handleAddToCart(product)}
                                className={`w-full py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                                  isHovered
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xl transform scale-[1.02]'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-sm hover:shadow-md'
                                }`}
                              >
                                <FaShoppingCart className="text-xs" />
                                Add to Cart
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

            {/* Pagination Component */}
            {!loading && totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center space-y-4">
                {/* Pagination Info */}
                <div className="text-sm text-gray-500 text-center">
                  Showing {startIndex + 1} to {Math.min(endIndex, totalProducts)} of {totalProducts} results
                </div>
                
                {/* Pagination Controls */}
                <div className="flex items-center space-x-1">
                  {/* Previous Button */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 bg-white border border-gray-200 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <FaChevronLeft className="w-3 h-3" />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((pageNumber, index) => (
                    <React.Fragment key={index}>
                      {pageNumber === '...' ? (
                        <span className="flex items-center justify-center w-10 h-10 text-gray-400 text-sm">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => goToPage(pageNumber)}
                          className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                            currentPage === pageNumber
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 bg-white border border-gray-200 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )}
                    </React.Fragment>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 bg-white border border-gray-200 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Quick Jump to Page (Optional) */}
                {totalPages > 10 && (
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-500">Go to page:</span>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = parseInt(e.target.value);
                        if (page >= 1 && page <= totalPages) {
                          goToPage(page);
                        }
                      }}
                      className="w-16 px-2 py-1 border border-gray-200 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">of {totalPages}</span>
                  </div>
                )}
              </div>
            )}

            {/* No Products Found */}
            {!loading && sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BsGrid3X3Gap className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;