import React, { useState, useEffect } from "react";
import { fetchCategories } from "../api/categoryAPI";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import "../style/ProductForm.css"; 

const ProductForm = ({ initialData, onSubmit, onCancel }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: [],
    quantity: "",
    category: "",
    type: "", 
  });

  const [categories, setCategories] = useState([]);
  const [newImage, setNewImage] = useState("");

  // Set product data in edit mode
  useEffect(() => {
    if (initialData) {
      setProduct({
        ...initialData,
        image: Array.isArray(initialData.image) ? initialData.image : [initialData.image],
        type: initialData.type || "", 
      });
    }
  }, [initialData]);

  // Fetch categories
  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddImage = () => {
    if (newImage.trim() !== "") {
      setProduct({ ...product, image: [...product.image, newImage] });
      setNewImage("");
    }
  };

  const handleRemoveImage = (url) => {
    setProduct({ ...product, image: product.image.filter((img) => img !== url) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {initialData ? "Edit Product" : "Add New Product"}
          </h2>
          <button className="close-btn" onClick={onCancel} type="button">
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                id="name"
                name="name"
                placeholder="Enter product name"
                value={product.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  name="price"
                  placeholder="₹ 0.00"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  name="quantity"
                  placeholder="0"
                  type="number"
                  value={product.quantity}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                value={product.description}
                onChange={handleChange}
                className="form-textarea"
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="type">Product Type</label>
                <input
                  id="type"
                  name="type"
                  placeholder="e.g. shirt, pant, shoe"
                  value={product.type}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="images-section">
              <label className="section-title">Product Images</label>
              
              <div className="image-input-group">
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="form-input image-url-input"
                />
                <button type="button" onClick={handleAddImage} className="add-image-btn">
                  <AddPhotoAlternateIcon />
                  Add Image
                </button>
              </div>

              {product.image.length > 0 && (
                <div className="image-preview-container">
                  {product.image.map((img, i) => (
                    <div key={i} className="image-preview-item">
                      <div className="image-wrapper">
                        <img src={img} alt="preview" className="preview-image" />
                        <button 
                          type="button" 
                          onClick={() => handleRemoveImage(img)} 
                          className="remove-image-btn"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                      <p className="image-url">{img}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              <SaveIcon />
              {initialData ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;