import { useState } from "react";
import { registerUser } from "../../api/authapi";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "Admin") navigate("/login");
      else if (data.user.role === "Seller") navigate("/seller/dashboard");
      else window.location.href = "http://localhost:5173";
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image" />
      <div className="auth-form">
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
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
          <select name="role" onChange={handleChange} defaultValue="customer">
            <option value="Customer">Customer</option>
            <option value="Seller">Seller</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
        <Link to="/login" style={{ textDecoration: 'none', color: '#D49A75' }}>
          <button variant="text" style={{ color: '#D49A75', backgroundColor: '#fff', fontSize: '12px' }}>
            Already have an account? Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
