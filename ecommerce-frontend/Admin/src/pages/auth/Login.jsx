import { useState } from "react";
import { loginUser } from "../../api/authapi";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { Button } from "@mui/material";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData); 
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      

      if (data.user.role === "Admin") navigate("/admin/dashboard");
      else if (data.user.role === "Seller") navigate("/seller/dashboard");
      else if (data.user.role === "Customer") navigate("/customer/dashboard");
      else navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image" />
      <div className="auth-form">
        <h2>Welcome Back!</h2>
        <p>Enter your email and password</p>
        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Sign In</button>
        </form>
       
  
    <Link to="/signup" style={{ textDecoration: 'none', color: '#D49A75' }}>
          <Button variant="text" style={{ color: '#D49A75', backgroundColor: '#fff', fontSize: '12px',  }}>
            Don't have an account? Sign Up
          </Button>
    </Link>
  
      </div>
    </div>
  );
};

export default Login;
