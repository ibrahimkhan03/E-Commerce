import React, { useEffect, useState } from "react";
import { getUserOrders } from "../api/orderAPI";
import { getUserReviews, submitRatingReview } from "../api/reviewAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaStar, FaBox, FaCalendarAlt, FaCreditCard, FaShoppingBag, FaTimes, FaEdit } from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const [hoveredStar, setHoveredStar] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reviewed, setReviewed] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return navigate("/login");

    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(user.id);
        setOrders(data);
      } catch (err) {
        toast.error("Failed to load orders");
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await getUserReviews(user.id);
        const ratingMap = {};
        const reviewMap = {};
        res.forEach((r) => {
          ratingMap[r.product._id] = r.rating;
          reviewMap[r.product._id] = r.review;
        });
        setRatings(ratingMap);
        setReviewed(reviewMap);
      } catch (err) {
        toast.error("Failed to load reviews");
      }
    };

    fetchOrders();
    fetchReviews();
  }, [user, navigate]);

  const openReviewModal = (product) => {
    if (!ratings[product._id] || reviewed[product._id]) return;
    setSelectedProduct(product);
    setReviewText("");
    setShowModal(true);
  };

  const handleSubmitReview = async () => {
    try {
      await submitRatingReview({
        userId: user.id,
        productId: selectedProduct._id,
        rating: ratings[selectedProduct._id] || 0,
        review: reviewText,
      });
      toast.success("Review submitted successfully");
      setReviewed((prev) => ({ ...prev, [selectedProduct._id]: reviewText }));
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  const handleRating = async (productId, star) => {
    if (ratings[productId]) return; 
    try {
      await submitRatingReview({
        userId: user.id,
        productId,
        rating: star,
        review: "",
      });
      setRatings((prev) => ({ ...prev, [productId]: star }));
      toast.success("Rating submitted!");
    } catch (err) {
      toast.error("Failed to rate product");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FaShoppingBag className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 text-sm mt-1">Track and manage your purchases</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FaBox className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders. Start shopping to see your orders here!</p>
              <button
                onClick={() => navigate('/products')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-2.5"
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 p-2 rounded-lg">
                        <FaBox className="text-white text-sm" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900 text-lg">Order #{order._id}</h2>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <FaCalendarAlt className="mr-1" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end space-y-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Total: </span>
                        <span className="text-lg font-bold text-gray-900">₹{order.amount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <FaCreditCard className="text-gray-400" />
                        <span className="text-gray-600">Payment:</span>
                        <span className={`font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {order.items.map((item) => {
                      const pid = item.product._id;
                      const isReviewed = reviewed[pid];
                      const isRated = ratings[pid];

                      return (
                        <div key={pid} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-16 h-16 object-contain bg-white rounded-lg border border-gray-200 shadow-sm"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                                {item.product.name}
                              </h4>
                              <p className="text-sm text-gray-600 mb-3">
                                Quantity: <span className="font-medium">{item.quantity}</span>
                              </p>

                              {order.orderStatus === "delivered" && (
                                <div className="space-y-3">
                                  {/* Star Rating */}
                                  <div>
                                    <div className="flex items-center space-x-1 mb-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                          key={star}
                                          className={`cursor-pointer text-lg transition-colors duration-150 ${
                                            star <= (hoveredStar[pid] ?? ratings[pid] ?? 0)
                                              ? "text-yellow-400 hover:text-yellow-500"
                                              : "text-gray-300 hover:text-gray-400"
                                          }`}
                                          onMouseEnter={() =>
                                            !ratings[pid] &&
                                            setHoveredStar((prev) => ({ ...prev, [pid]: star }))
                                          }
                                          onMouseLeave={() =>
                                            !ratings[pid] &&
                                            setHoveredStar((prev) => ({ ...prev, [pid]: null }))
                                          }
                                          onClick={() => handleRating(pid, star)}
                                        />
                                      ))}
                                    </div>

                                    {!isRated && (
                                      <span className="text-xs text-gray-500 block">
                                        Click to rate this product
                                      </span>
                                    )}
                                  </div>

                                  {/* Review Button */}
                                  {isRated && !isReviewed && (
                                    <button
                                      onClick={() => openReviewModal(item.product)}
                                      className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                    >
                                      <FaEdit className="text-xs" />
                                      <span>Write Review</span>
                                    </button>
                                  )}

                                  {isReviewed && (
                                    <div className="text-xs text-green-600 font-medium">
                                      ✓ Review submitted
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Write a Review</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors duration-200 p-1"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Product Info */}
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-16 h-16 object-contain bg-white rounded-lg border border-gray-200 shadow-sm"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{selectedProduct.name}</h4>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`text-sm ${
                          star <= (ratings[selectedProduct._id] ?? 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      ({ratings[selectedProduct._id] ?? 0}/5)
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Text Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows="4"
                  placeholder="Share your experience with this product..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {reviewText.length}/500 characters
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={!reviewText.trim()}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;