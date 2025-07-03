import React, { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../api/wishlistAPI";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaHeart } from "react-icons/fa";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return navigate("/login");
    const fetchWishlist = async () => {
      try {
        const products = await getWishlist(user.id);
        setWishlist(products);
      } catch (error) {
        toast.error("Failed to load wishlist");
        console.error("Wishlist fetch error:", error);
      }
    };
    fetchWishlist();
  }, [user, navigate]);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(user.id, productId);
      setWishlist(prev => prev.filter(p => p._id !== productId));
      toast.info("Removed from wishlist");
    } catch (error) {
      toast.error("Error removing from wishlist");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaHeart className="text-red-500 text-2xl sm:text-3xl mr-3" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              My Wishlist
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Your favorite items saved for later
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16 sm:py-24">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-md mx-auto">
              <FaHeart className="text-gray-300 text-4xl sm:text-6xl mx-auto mb-6" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Start adding items you love to your wishlist
              </p>
              <Link
                to="/products"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <p className="text-gray-600 text-sm sm:text-base">
                {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {wishlist.map((product, index) => {
                if (!product || !product._id) return null;
                return (
                  <div
                    key={product._id || index}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative transform hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden">
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 sm:h-56 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
          
                        />
                        
                      </Link>
                      
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 shadow-lg"
                        title="Remove from wishlist"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>

                    <div className="p-4 sm:p-5">
                      <Link to={`/product/${product._id}`}>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-lg sm:text-xl font-bold text-blue-600">
                            ₹{product.price?.toLocaleString('en-IN')}
                          </p>
                          <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            Saved
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;