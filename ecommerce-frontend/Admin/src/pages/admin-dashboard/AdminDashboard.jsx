import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  Paper,
  Avatar,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  Pagination,
  Grid,
  useMediaQuery,
  useTheme,
  Fab,
  Zoom,
  Alert,
  Skeleton,
  Modal,
  Badge,
} from "@mui/material";
import {
  Edit,
  Delete,
  Add as AddIcon,
  Search as SearchIcon,
  TrendingUp,
  Inventory,
} from "@mui/icons-material";
import AdminLayout from "../../componenets/AdminLayout";

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productAPI";

import ProductForm from "../../componenets/ProductForm";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Load products on mount
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetchProducts();
      const data = Array.isArray(res.data.products) ? res.data.products : res.data;
      setProducts(data);
    } catch (err) {
      console.error("Fetch failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    setEditProduct(product); // null means create mode
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditProduct(null);
  };

  const handleSubmit = async (product) => {
    try {
      if (editProduct) {
        await updateProduct(editProduct._id, product);
      } else {
        await createProduct(product);
      }
      handleCloseModal();
      loadProducts();
    } catch (error) {
      console.error("Error submitting product:", error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const lowStockProducts = products.filter((p) => p.quantity < 10).length;


  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card sx={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}25 100%)`, borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: color, mt: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ p: 2, borderRadius: 2, background: `${color}20`, color: color }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ p: 3 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[...Array(8)].map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Product Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your product inventory with ease
          </Typography>
        </Box>

        {/* Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Products"
              value={totalProducts}
              icon={<Inventory />}
              color="#667eea"
              subtitle="Active inventory"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Value"
              value={`₹${totalValue.toLocaleString()}`}
              icon={<TrendingUp />}
              color="#4caf50"
              subtitle="Inventory worth"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Low Stock Alert"
              value={lowStockProducts}
              icon={<Badge badgeContent={lowStockProducts} color="error"><Inventory /></Badge>}
              color="#ff5722"
              subtitle="Items below 10"
            />
          </Grid>
        </Grid>

        {/* Search and Add Button */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
              <TextField
                variant="outlined"
                placeholder="Search products..."
                size="small"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: { xs: '100%', sm: 300 } }}
              />

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenModal()}
                sx={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                }}
              >
                Add Product
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Form */}
        {showForm && (
          <Card sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <ProductForm
                initialData={editProduct}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setEditProduct(null);
                  setShowForm(false);
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <Alert severity="info" sx={{ borderRadius: 3 }}>
            {search ? `No products found matching "${search}"` : 'No products available. Add your first product!'}
          </Alert>
        ) : (
          <>
            {isMobile ? (
              <Grid container spacing={3}>
                {currentProducts.map((product) => (
                  <Grid item xs={12} key={product._id}>
                    <Card sx={{ borderRadius: 3 }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            src={product.image[0]}
                            alt={product.name}
                            sx={{ width: 50, height: 50, mr: 2 }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {product.name}
                            </Typography>
                            <Chip
                              label={product.category}
                              size="small"
                              sx={{
                                mt: 0.5,
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                color: 'white',
                              }}
                            />
                          </Box>
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {product.description.length > 100
                            ? `${product.description.substring(0, 100)}...`
                            : product.description}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                            ₹{product.price}
                          </Typography>
                          <Badge
                            badgeContent={product.quantity}
                            color={product.quantity < 10 ? 'error' : 'success'}
                          >
                            <Inventory />
                          </Badge>
                        </Box>

                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <IconButton
                            onClick={() => {
                              handleOpenModal(product)
                              setShowForm(true);
                            }}
                            sx={{
                              background: 'linear-gradient(45deg, #4caf50, #45a049)',
                              color: 'white',
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(product._id)}
                            sx={{
                              background: 'linear-gradient(45deg, #f44336, #d32f2f)',
                              color: 'white',
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        '& .MuiTableCell-head': {
                          color: 'white',
                          fontWeight: 700,
                          border: 'none',
                        },
                      }}
                    >
                      <TableCell>ID</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentProducts.map((product, index) => (
                      <TableRow key={product._id}>
                        <TableCell sx={{ fontWeight: 600, color: '#666' }}>
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar
                              src={product.image[0]}
                              alt={product.name}
                              sx={{ width: 45, height: 45 }}
                            />
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {product.name}
                              </Typography>
                              <Chip
                                label={product.category}
                                size="small"
                                sx={{
                                  fontSize: '0.7rem',
                                  height: 20,
                                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                  color: 'white',
                                }}
                              />
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                            ₹{product.price}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ maxWidth: 200 }}>
                          <Typography variant="body2" color="text.secondary">
                            {product.description.length > 50
                              ? `${product.description.substring(0, 50)}...`
                              : product.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={product.quantity}
                            color={product.quantity < 10 ? 'error' : 'success'}
                            variant={product.quantity < 10 ? 'filled' : 'outlined'}
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{product.category}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <IconButton
                              onClick={() => {
                                setEditProduct(product);
                                setOpen(true);
                              }}
                              sx={{
                                background: 'linear-gradient(45deg, #4caf50, #45a049)',
                                color: 'white',
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(product._id)}
                              sx={{
                                background: 'linear-gradient(45deg, #f44336, #d32f2f)',
                                color: 'white',
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Card sx={{ borderRadius: 3, px: 2, py: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                      Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
                    </Typography>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      shape="rounded"
                      sx={{
                        '& .MuiPaginationItem-root': { fontWeight: 600 },
                        '& .Mui-selected': { background: 'linear-gradient(45deg, #667eea, #764ba2)' },
                      }}
                    />
                  </Stack>
                </Card>
              </Box>
            )}
          </>
        )}

        {/* Mobile FAB */}
        {isMobile && (
          <Zoom in={!showForm}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => {
                setEditProduct(null);
                setShowForm(true);
              }}
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
              }}
            >
              <AddIcon />
            </Fab>
          </Zoom>
        )}
        <Modal open={open} onClose={handleCloseModal}>
          <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: isMobile ? "90%" : 600,
      bgcolor: "background.paper",
      borderRadius: 2,
      boxShadow: 24,
      p: 3,
    }}
  >
    <ProductForm
      initialData={editProduct}
      onSubmit={handleSubmit}
      onCancel={handleCloseModal}
    />
  </Box>
        </Modal>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;