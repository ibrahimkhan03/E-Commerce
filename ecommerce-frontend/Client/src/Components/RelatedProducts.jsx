import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.products.slice(0, 4)); 
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "50px 0", marginTop: "60px", marginBottom: "60px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "30px", textAlign: "center" }}>
        Related Products
      </h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product._id}
            onMouseEnter={() => setHoveredId(product._id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => navigate(`/product/${product._id}`)}
            style={{
              width: "250px",
              textAlign: "center",
              position: "relative",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  background: "#f5f5f5",
                  transition: "transform 0.3s ease",
                  transform: hoveredId === product._id ? "scale(1.05)" : "scale(1)",
                }}
              />
            </div>
            <h3 style={{ marginTop: "10px" }}>{product.name}</h3>
            <p style={{ fontWeight: "bold" }}>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
