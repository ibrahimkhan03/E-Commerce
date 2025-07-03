import { useState } from "react";
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import Logout from '@mui/icons-material/Logout';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { User } from "lucide-react";

export default function Navbar() {
  const [pagesOpen, setPagesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const navigate = useNavigate();
  // const { logout } = useAuth();
  const { clearCart, cart } = useCart();

  const uniqueItemCount = cart ? cart.length : 0;

  // const handleLogout = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user) {
  //     toast.info("You're already logged out.");
  //     return;
  //   }

  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   clearCart();
  //   logout?.();
  //   toast.success("Logged out successfully!");

  //   navigate("/login");
  // };


  return (
    <div className="w-full relative z-50">
      {/* Top Bar with Gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white text-center py-3 text-sm shadow-sm">
        <p className="font-medium tracking-wide">
          🚚 Free delivery on orders over ₹1000 |
          <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs font-semibold">
            Limited Time
          </span>
        </p>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <span className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-indigo-600 transition-all duration-300">
                  Male Fashion.
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative text-base font-semibold px-4 py-2 rounded-lg transition-all duration-300 group
                  ${isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }`
                }
              >
                Home
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </NavLink>

              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `relative text-base font-semibold px-4 py-2 rounded-lg transition-all duration-300 group
                  ${isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }`
                }
              >
                Shop
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </NavLink>

              {/* Pages Dropdown */}
              <div
                onMouseEnter={() => setPagesOpen(true)}
                onMouseLeave={() => setPagesOpen(false)}
                className="relative"
              >
                <button className="relative text-base font-semibold px-4 py-2 rounded-lg transition-all duration-300 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 group">
                  Pages
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
                {pagesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transform transition-all duration-200 ease-out">
                    <Link
                      to="/about"
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/faq"
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                    >
                      FAQ
                    </Link>
                  </div>
                )}
              </div>

              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `relative text-base font-semibold px-4 py-2 rounded-lg transition-all duration-300 group
                  ${isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }`
                }
              >
                Blog
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative text-base font-semibold px-4 py-2 rounded-lg transition-all duration-300 group
                  ${isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }`
                }
              >
                Contacts
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </NavLink>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3">
              {/* Search Icon */}
              <button className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300">
                <FaSearch className="w-5 h-5" />
              </button>

              {/* User Avatar Menu */}
              <IconButton
              onClick={handleClick} 
                size="small" 
                className="p-2 hover:bg-indigo-50 transition-all duration-300"
              >
                {user?.name ? (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    {firstLetter}
                  </Avatar>
                ) : (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#e0e0e0',
                      color: '#555',
                    }}
                  >
                    <User size={18} />
                  </Avatar>
                )}
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: '1px solid #f3f4f6',
                    minWidth: 200
                  }
                }}
              >
                <Link to="/login">
                  <MenuItem className="hover:bg-indigo-50 transition-colors duration-200">
                    <ListItemIcon>
                      <PersonIcon fontSize="small" className="text-indigo-600" />
                    </ListItemIcon>
                    <span className="font-medium">Login</span>
                  </MenuItem>
                </Link>
                <Link to="/signup">
                  <MenuItem className="hover:bg-indigo-50 transition-colors duration-200">
                    <ListItemIcon>
                      <PersonIcon fontSize="small" className="text-indigo-600" />
                    </ListItemIcon>
                    <span className="font-medium">Signup</span>
                  </MenuItem>
                </Link>
                <Divider sx={{ my: 1 }} />
                <Link to={"/my-account"}>
                  <MenuItem className="hover:bg-indigo-50 transition-colors duration-200">
                    <ListItemIcon>
                      <PersonIcon fontSize="small" className="text-gray-600" />
                    </ListItemIcon>
                    <span className="font-medium">My Account</span>
                  </MenuItem>
                </Link>
                <Link to="/my-orders">
                  <MenuItem className="hover:bg-indigo-50 transition-colors duration-200">
                    <ListItemIcon>
                      <ShoppingBasketIcon fontSize="small" className="text-gray-600" />
                    </ListItemIcon>
                    <span className="font-medium">My Orders</span>
                  </MenuItem>
                </Link>
                <Link to="/wishlist">
                  <MenuItem className="hover:bg-indigo-50 transition-colors duration-200">
                    <ListItemIcon>
                      <FavoriteIcon fontSize="small" className="text-red-500" />
                    </ListItemIcon>
                    <span className="font-medium">My Wishlist</span>
                  </MenuItem>
                </Link>
                {/* <MenuItem
                  onClick={handleLogout}
                  className="hover:bg-red-50 transition-colors duration-200"
                >
                  <ListItemIcon>
                    <Logout fontSize="small" className="text-red-500" />
                  </ListItemIcon>
                  <span className="font-medium text-red-600">Logout</span>
                </MenuItem> */}
              </Menu>

              {/* Cart Icon */}
              <Link to="/cart" className="relative p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300">
                <FaShoppingCart className="w-5 h-5" />
                {uniqueItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                    {uniqueItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
              >
                {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-2">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300
                  ${isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300
                  ${isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }`
                }
              >
                Shop
              </NavLink>
              <div className="px-4 py-3">
                <span className="text-base font-semibold text-gray-700">Pages</span>
                <div className="ml-4 mt-2 space-y-2">
                  <NavLink
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    to="/faq"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  >
                    FAQ
                  </NavLink>
                </div>
              </div>
              <NavLink
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
              >
                Blog
              </NavLink>
              <NavLink
                to="/contactus"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
              >
                Contacts
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}