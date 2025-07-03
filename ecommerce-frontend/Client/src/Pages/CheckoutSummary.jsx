import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import axios from "axios"
import { MapPin, Package, CreditCard, Loader2, ShoppingBag } from "lucide-react"

const CheckoutSummary = () => {
  const location = useLocation()
  const address = location.state?.address
  const { cart, fetchCart } = useCart()
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchCart()
  }, [])

  useEffect(() => {
    const calc = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    setTotal(calc.toFixed(2))
  }, [cart])

  const handleCheckout = async () => {
    const userData = JSON.parse(localStorage.getItem("user"))
    const userId = userData?.id
    const email = userData?.email

    setIsLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/stripe/create-checkout-session`, {
        cartItems: cart,
        shippingAddress: address,
        amount: total,
        userId,
        email,
      })

      window.location.href = response.data.url
    } catch (error) {
      console.error("Payment error:", error)
      alert("Failed to start payment session")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Checkout Summary</h1>
          <p className="text-gray-600 text-lg">Review your order before completing your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Address and Products */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Billing Address</h2>
                </div>
              </div>
              <div className="p-6">
                {address ? (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-gray-900">{address.name}</p>
                        <p className="text-gray-600 font-medium">{address.mobile}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">
                        {`${address.address}, ${address.locality}, ${address.city}, ${address.state} - ${address.pincode}`}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-lg">No address found.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                      <Package className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
                  </div>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>
              <div className="p-6">
                {cart.length > 0 ? (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div
                        key={item.product._id}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 ${
                          index !== cart.length - 1 ? "border-b border-gray-100" : ""
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl overflow-hidden">
                            <img
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{item.product.name}</h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm text-gray-500">₹{item.product.price.toFixed(2)} each</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-lg">No items in cart.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-gray-900">₹{total}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  onClick={handleCheckout}
                  disabled={isLoading || cart.length === 0}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Confirm & Pay</span>
                    </div>
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">Secure payment powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 font-medium">SSL Secured Checkout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
