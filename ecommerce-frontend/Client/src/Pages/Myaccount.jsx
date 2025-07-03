import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, CreditCard, Settings, Bell, LogOut, Edit3 } from 'lucide-react';
import { getUserOrders } from "../api/orderAPI";
import { fetchAddresses } from '../api/addressAPI';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { logout } = useAuth();
  const { clearCart } = useCart();

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'address', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await getUserOrders(user.id);
        const sorted = ordersRes.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sorted);
      } catch (err) {
        console.error("Failed to load orders:", err.message);
      }
    };

    if (user && token) fetchData();
  }, [user, token]);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const res = await fetchAddresses(user?.id, token);
        setAddresses(res);
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id && token) loadAddresses();
  }, []);

  const handleLogout = () => {
    if (!user) {
      toast.info("You're already logged out.");
      return;
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    clearCart();
    logout?.();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Edit3 size={16} />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" value={user.name} className="w-full p-3 border rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" value={user.email} className="w-full p-3 border rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" value="+91 1234567890" className="w-full p-3 border rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input type="date" value="2003-03-21" className="w-full p-3 border rounded-lg" readOnly />
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Order History</h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="font-medium">
                          Order #{order._id.slice(0, 6).toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.orderStatus === "delivered" ? "bg-green-100 text-green-800"
                            : order.orderStatus === "shipped" ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.orderStatus}
                        </span>
                        <span className="font-semibold">₹{order.amount}</span>
                        <button
                          onClick={() => navigate(`/order/${order._id}`)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        );

      case 'address':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Addresses</h2>
            {loading ? (
              <p className="text-gray-500">Loading addresses...</p>
            ) : addresses.length === 0 ? (
              <div className="text-gray-600 italic">No address found.</div>
            ) : (
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div key={addr._id} className="border p-4 rounded-md bg-gray-50 shadow-sm">
                    <p className="text-sm font-medium">{addr.name}</p>
                    <p className="text-sm text-gray-600">
                      {addr.address}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-sm text-gray-600">Mobile: {addr.mobile}</p>
                    {addr.altPhone && <p className="text-sm text-gray-500">Alt: {addr.altPhone}</p>}
                    {addr.landmark && <p className="text-sm text-gray-500">Landmark: {addr.landmark}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{menuItems.find(item => item.id === activeTab)?.label}</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  // ⛔️ If user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">You're not signed in</h1>
        <p className="text-gray-600 mb-6">Please log in to access your account settings.</p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3 pb-4 border-b mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">Premium Member</p>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </button>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 mt-6"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
