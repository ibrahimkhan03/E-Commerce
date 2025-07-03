import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  Paper, IconButton, Typography, Card, CardContent, Divider, Box, Chip
} from "@mui/material";
import { Add, Remove, ShoppingCart, LocalShipping, Delete } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cart, fetchCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDecrease = (productId, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(productId, currentQty - 1);
    }
  };

  const handleIncrease = (productId, currentQty, maxQty) => {
    if (currentQty >= maxQty) {
      toast.warn("Maximum available stock reached");
      return;
    }
    updateQuantity(productId, currentQty + 1);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
  };

  const MobileCartItem = ({ item }) => (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box component="img" src={item.product.image} alt={item.product.name}
            sx={{ width: 70, height: 70, borderRadius: 1, objectFit: 'cover' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{item.product.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              ₹{item.product.price.toFixed(2)} each
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.100', borderRadius: 20, p: 0.5 }}>
                <IconButton size="small" onClick={() => handleDecrease(item.product._id, item.quantity)}>
                  <Remove fontSize="small" />
                </IconButton>
                <Typography sx={{ mx: 1.5, fontWeight: 600 }}>{item.quantity}</Typography>
                <IconButton size="small"
                  onClick={() => handleIncrease(item.product._id, item.quantity, item.product.quantity)}>
                  <Add fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                ₹{(item.product.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => handleRemove(item.product._id)} color="error" size="small">
            <Delete />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  if ((cart || []).length === 0) {
    return (
      <Box sx={{ minHeight: '60vh' }}>
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
                      My <span className="text-yellow-300">Cart</span>
                    </h1>
                    <nav className="flex items-center justify-center space-x-2 text-sm">
                      <Link to="/" className="text-blue-200 hover:text-white font-medium transition-colors duration-200">
                        Home
                      </Link>
                      <span className="text-blue-300">/</span>
                      <span className="text-white font-medium">Cart</span>
                    </nav>
                  </div>
                </div>
              </div>

        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ShoppingCart sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'grey.600' }}>
            Your cart is empty
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'grey.500' }}>
            Add some products to get started
          </Typography>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box component="button" sx={{
              bgcolor: 'primary.main',
              color: 'white',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': { bgcolor: 'primary.dark' }
            }}>
              Continue Shopping
            </Box>
          </Link>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '60vh', mb: 8 }}>
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
                    My <span className="text-yellow-300">Cart</span>
                  </h1>
                  <nav className="flex items-center justify-center space-x-2 text-sm mt-7">
                    <Link to="/" className="text-blue-200 hover:text-white font-medium transition-colors duration-200">
                      Home
                    </Link>
                    <span className="text-blue-300">/</span>
                    <span className="text-white font-medium">Cart</span>
                  </nav>
                </div>
              </div>
            </div>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px:{xs: 4,  sm: 6, lg: 8,}, mt: 4 }}>
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>

          {/* Desktop Table */}
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Quantity</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Total</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(cart || []).map(item => 
                      <TableRow key={item.product._id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box component="img" src={item.product.image} alt={item.product.name}
                              sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }} />
                            <Box>
                              <Typography sx={{ fontWeight: 600 }}>{item.product.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                ₹{item.product.price.toFixed(2)} each
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            bgcolor: 'grey.100', borderRadius: 20, p: 0.5, width: 'fit-content', mx: 'auto'
                          }}>
                            <IconButton size="small" onClick={() => handleDecrease(item.product._id, item.quantity)}>
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography sx={{ mx: 2, fontWeight: 600 }}>{item.quantity}</Typography>
                            <IconButton size="small"
                              onClick={() => handleIncrease(item.product._id, item.quantity, item.product.quantity)}>
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleRemove(item.product._id)} color="error">
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>

          {/* Mobile Card View */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Cart Items</Typography>
              <Chip label={`${cart.length} items`} color="primary" />
            </Box>
            {cart.map(item => <MobileCartItem key={item.product._id} item={item} />)}
          </Box>

          {/* Order Summary */}
          <Box sx={{ width: { xs: '100%', lg: 350 } }}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, position: 'sticky', top: 20 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <ShoppingCart sx={{ mr: 1, color: 'indigo' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Order Summary</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Items ({cart.length})</Typography>
                    <Typography sx={{ fontWeight: 600 }}>₹{calculateTotal()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocalShipping color="success" fontSize="small" />
                      <Typography>Shipping</Typography>
                    </Box>
                    <Chip label="FREE" color="success" size="small" />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    ₹{calculateTotal()}
                  </Typography>
                </Box>

                <Link to="/checkout" style={{ textDecoration: 'none' }}>
                  <Box component="button" sx={{
                    width: '100%',
                    background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(79, 70, 229))',
                    color: 'white',
                    py: 2,
                    borderRadius: 2,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    transition: 'all 0.2s',
                    '&:hover': {
                      background: 'linear-gradient(to right, rgb(132, 46, 210), rgb(71, 63, 206))',
                      transform: 'translateY(-1px)'
                    }
                  }}>
                    Proceed to Checkout
                  </Box>
                </Link>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
