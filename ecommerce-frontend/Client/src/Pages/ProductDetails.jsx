import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaShieldAlt, FaTruck, FaUndo, FaCheck, FaUser } from "react-icons/fa";
import {
  Button,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RelatedProducts from "../Components/RelatedProducts";
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useMemo } from "react";
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const { cart, addToCart, fetchCart, updateQuantity, removeFromCart } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Clothing categories that should show size selector
  const clothingCategories = ['clothing', 'fashion', 'apparel', 'shirt', 'dress', 'jacket', 'sweater', 'hoodie', 't-shirt', 'shorts'];

  // Jeans categories
  const jeansCategories = ['pants', 'jeans', "trousers"];

  const Shoes = ['shoes', 'sneakers', 'footwear', 'boots', 'sandals', 'slippers'];

  // Available sizes
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Jeans sizes (waist sizes)
  const jeansSizes = ['28', '30', '32', '34', '36', '38',];

  const shoeSizes = ['6', '7', '8', '9', '10', '11', '12'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(res.data);
        const images = Array.isArray(res.data.image) ? res.data.image : [res.data.image];
        setSelectedImage(images[0]);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load product", err);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/review/product/${id}`);
        setReviews(res.data);

        if (res.data.length > 0) {
          const avg = res.data.reduce((sum, r) => sum + r.rating, 0) / res.data.length;
          setAvgRating(avg.toFixed(1));
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const isClothingProduct = useMemo(() => {
  const main = product?.category?.toLowerCase() || '';
  return main === 'clothing';
}, [product]);

const isJeansProduct = useMemo(() => {
  const main = product?.category?.toLowerCase() || '';
  const type = product?.type?.toLowerCase() || '';
  return main === 'clothing' && type === 'pant';
}, [product]);

const isShoesProduct = useMemo(() => {
  const main = product?.category?.toLowerCase() || '';
  return main === 'shoe';
}, [product]);


  const isInCart = useMemo(() => {
    if (!cart || !product) return false;
    return cart.some((item) => item.product._id === product._id);
  }, [cart, product]);

  const handleAddToCart = async (product) => {
    if (!user?.id) {
      toast.warn("Please login to add items to cart.");
      return navigate("/login");
    }

    // Check if size is required but not selected
    if (isClothingProduct && !selectedSize) {
      toast.warn("Please select a size before adding to cart.");
      return;
    }

    const existing = cart.find(i => i.product._id === product._id);
    const qtyInCart = existing ? existing.quantity : 0;
    const desiredQty = qtyInCart + quantity;

    if (desiredQty > product.quantity) {
      toast.warn("Maximum available stock reached");
      return;
    }

    try {
      // Include selected size in the product data if it's a clothing item
      const productWithSize = isClothingProduct
        ? { ...product, selectedSize }
        : product;

      await addToCart(productWithSize, quantity);
      toast.success(`${product.name} ${isClothingProduct ? `(Size: ${selectedSize})` : ''} added to cart!`);
    } catch {
      toast.error("Failed to add to cart.");
    }
  };

  const handleDecrease = (productId, currentQty) => {
    if (currentQty > 1) {
      setQuantity((prev) => prev - 1);
      updateQuantity(productId, currentQty - 1);
    }
  };

  const handleIncrease = (productId, currentQty, maxQty) => {
    if (currentQty >= maxQty) {
      toast.warn(`Maximum available stock reached: ${currentQty}`);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleQuantity = (type) => {
    if (type === "inc") setQuantity((prev) => prev + 1);
    else if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-purple-100">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <FaShoppingCart className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products" className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const thumbnails = Array.isArray(product.image)
    ? product.image.filter(Boolean)
    : product.image
      ? [product.image]
      : [];
  // Show max 4 images
  const stockPercentage = Math.min((product.quantity / 50) * 100, 100); // Assuming 50 is max stock

  return (
    <div className="bg-gradient-to-br bg-white min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shop</h1>
            <nav className="flex items-center justify-center space-x-2 text-sm">
              <Link to="/" className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-700">Product Details</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-100">
          <div className="flex flex-col xl:flex-row">
            <div className="xl:w-1/2 p-6 lg:p-8">
              <div className="flex flex-row gap-4">
                {/* Thumbnails on the left */}
                <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100 px-1.5 pt-2">
                  {thumbnails.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`thumb-${idx}`}
                      onMouseEnter={() => setSelectedImage(img)} // 💡 Hover to change
                      className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl cursor-pointer border-2 transition-all duration-200 ${selectedImage === img
                        ? "border-purple-600 ring-2 ring-purple-300 scale-105"
                        : "border-gray-200 hover:border-purple-400 hover:scale-105"
                        }`}
                    />
                  ))}
                </div>

                {/* Main Image on the right */}
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 h-80 sm:h-96 lg:h-[500px] flex items-center justify-center relative overflow-hidden border border-purple-100 group">
                    <img
                      src={selectedImage}
                      alt="Product preview"
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="xl:w-1/2 p-6 lg:p-8 bg-gradient-to-br from-purple-50/50 to-indigo-50/50">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <Link to="/" className="text-purple-600 hover:text-purple-800 transition-colors duration-200">Home</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate">{product.name}</span>
              </nav>

              {/* Product Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => {
                    if (i <= Math.floor(avgRating)) {
                      return <FaStar key={i} className="text-yellow-400 text-lg" />;
                    } else if (i === Math.ceil(avgRating) && avgRating % 1 >= 0.5) {
                      return <FaStarHalfAlt key={i} className="text-yellow-400 text-lg" />;
                    } else {
                      return <FaRegStar key={i} className="text-gray-300 text-lg" />;
                    }
                  })}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {avgRating > 0 ? `${avgRating}/5` : 'No ratings yet'}
                  {reviews.length > 0 && ` (${reviews.length} review${reviews.length > 1 ? 's' : ''})`}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Best Price
                </span>
              </div>

              {/* Vendor */}
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Sold by:</span>
                  <span className="ml-2 text-purple-600 font-medium">XYZ LTD</span>
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Stock Status</span>
                  <span className={`text-sm font-medium ${product.quantity > 10 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.quantity > 10 ? 'In Stock' : `Only ${product.quantity} left!`}
                  </span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${stockPercentage > 50 ? 'bg-green-500' : stockPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    style={{ width: `${stockPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Size Selector - Only for clothing products */}
              {isClothingProduct && !isJeansProduct && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${selectedSize === size
                            ? 'border-purple-600 bg-purple-600 text-white shadow-md'
                            : 'border-purple-200 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {selectedSize && (
                    <p className="text-sm text-purple-600 mt-2 font-medium">Selected size: {selectedSize}</p>
                  )}
                </div>
              )}

              {isJeansProduct && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Waist Size</label>
                  <div className="flex flex-wrap gap-2">
                    {jeansSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${selectedSize === size
                            ? 'border-purple-600 bg-purple-600 text-white shadow-md'
                            : 'border-purple-200 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {selectedSize && (
                    <p className="text-sm text-purple-600 mt-2 font-medium">Selected waist size: {selectedSize}"</p>
                  )}
                </div>
              )}

              {isShoesProduct && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Shoe Size</label>
                  <div className="flex flex-wrap gap-2">
                    {shoeSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${selectedSize === size
                            ? 'border-purple-600 bg-purple-600 text-white shadow-md'
                            : 'border-purple-200 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {selectedSize && (
                    <p className="text-sm text-purple-600 mt-2 font-medium">Selected shoe size: {selectedSize}</p>
                  )}
                </div>
              )}


              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                    <button
                      onClick={() => handleDecrease(product._id, quantity)}
                      className="flex items-center justify-center w-12 h-12 text-purple-600 hover:bg-purple-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      <RemoveIcon fontSize="small" />
                    </button>
                    <div className="flex items-center justify-center w-16 h-12 bg-white/80 backdrop-blur-sm">
                      <span className="font-bold text-lg text-gray-900">{quantity}</span>
                    </div>
                    <button
                      onClick={() => handleIncrease(product._id, quantity, product.quantity)}
                      className="flex items-center justify-center w-12 h-12 text-purple-600 hover:bg-purple-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity >= product.quantity}
                    >
                      <AddIcon fontSize="small" />
                    </button>
                  </div>
                  <div className="flex-1 text-sm text-gray-600">
                    <span>Available: <span className="font-semibold text-gray-900">{product.quantity}</span> units</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mb-8">
                {isInCart ? (
                  <Link to="/cart" className="block">
                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-3 text-lg">
                      <FaShoppingCart className="text-xl" />
                      <span>Go to Cart</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl pointer-events-none"></div>
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.quantity === 0 || (isClothingProduct && !selectedSize)}
                    className={`w-full font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-3 text-lg relative overflow-hidden ${product.quantity === 0 || (isClothingProduct && !selectedSize)
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                      }`}
                  >
                    <FaShoppingCart className="text-xl" />
                    <span>
                      {product.quantity === 0
                        ? "Out of Stock"
                        : (isClothingProduct && !selectedSize)
                          ? "Select Size"
                          : "Add to Cart"
                      }
                    </span>
                    {product.quantity > 0 && !(isClothingProduct && !selectedSize) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl pointer-events-none"></div>
                    )}
                  </button>
                )}
              </div>

              {/* Trust Badges */}
              <div className="border-t border-purple-200 pt-6 mb-6">
                <p className="text-sm text-gray-600 mb-3 font-medium">Guaranteed safe & secure checkout</p>
                <div className="flex items-center gap-3 mb-4">
                  <img src="/images/visa.png" alt="Visa" className="h-8 object-contain bg-white rounded px-2 py-1 shadow-sm border border-purple-100" />
                  <img src="/images/card.png" alt="Mastercard" className="h-8 object-contain bg-white rounded px-2 py-1 shadow-sm border border-purple-100" />
                  <img src="/images/american-express.png" alt="American Express" className="h-8 object-contain bg-white rounded px-2 py-1 shadow-sm border border-purple-100" />
                  <img src="/images/paypal.png" alt="PayPal" className="h-8 object-contain bg-white rounded px-2 py-1 shadow-sm border border-purple-100" />
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaShieldAlt className="text-green-600" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaTruck className="text-purple-600" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUndo className="text-indigo-600" />
                    <span>Easy Returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCheck className="text-green-600" />
                    <span>Quality Assured</span>
                  </div>
                </div>
              </div>

              {/* Accordion Details */}
              <div className="space-y-2">
                <Accordion
                  className="!shadow-none !border !border-purple-200 !rounded-xl overflow-hidden"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#7C3AED" }} />}
                    className="!min-h-[64px] hover:!bg-purple-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-lg text-gray-900">Product Description</span>
                  </AccordionSummary>
                  <AccordionDetails className="!pt-0">
                    <p className="text-gray-600 leading-relaxed">
                      {product.description || "No description available for this product."}
                    </p>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  className="!shadow-none !border !border-purple-200 !rounded-xl overflow-hidden"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#7C3AED" }} />}
                    className="!min-h-[64px] hover:!bg-purple-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-lg text-gray-900">Terms & Conditions</span>
                  </AccordionSummary>
                  <AccordionDetails className="!pt-0">
                    <p className="text-gray-600 leading-relaxed">
                      By purchasing this product, you agree to our terms of service. All sales are final.
                      We offer a 30-day return policy for defective items. Please contact customer service
                      for any issues with your order.
                    </p>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 border border-purple-100">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  {reviews.length} review{reviews.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {reviews.map((rev) => (
                  <div key={rev._id} className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 border border-purple-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full w-10 h-10 flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => {
                              if (i <= Math.floor(rev.rating)) {
                                return <FaStar key={i} className="text-yellow-400 text-sm" />;
                              } else if (i === Math.ceil(rev.rating) && rev.rating % 1 >= 0.5) {
                                return <FaStar key={i} className="text-yellow-400 opacity-50 text-sm" />;
                              } else {
                                return <FaStar key={i} className="text-gray-300 text-sm" />;
                              }
                            })}
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            {rev.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {rev.review || "No written review provided."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <RelatedProducts />
    </div>
  );
};

export default ProductDetails;