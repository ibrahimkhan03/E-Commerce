import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';
import Checkout from './Pages/Checkout';
import Category from './Pages/Category';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/auth/Login';
import Signup from './Pages/auth/Signup';
import CheckoutSummary from "./Pages/CheckoutSummary";
import PaymentFailed from './Pages/PaymentFailed';
import PaymentSuccess from './Pages/PaymentSuccess';
import WishlistPage from './Pages/WishlistPage';
import MyOrders from './Pages/MyOrders';
import MyAccount from './Pages/Myaccount';
import BlogPage from './Pages/BlogPage';
import ContactPage from './Pages/Contact';
import AboutUs from './Pages/AboutUs';
import Faq from './Pages/Faq';


const Layout = ({ children }) => {
  const location = useLocation();
  const noLayoutRoutes = ['/payment-success', '/payment-failed'];

  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      <ToastContainer />
      {!hideLayout && <Navbar />}
      <Routes>{children}</Routes>
      {!hideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout-summary" element={<CheckoutSummary />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<Faq />} />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
