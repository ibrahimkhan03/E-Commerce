import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import RoleRoute from "./routes/RoleRoutes";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";
import AdminLayout from "./componenets/AdminLayout";
import CategoryPage from "./pages/admin-dashboard/Category";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <RoleRoute allowedRoles={["Admin"]}>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </RoleRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <RoleRoute allowedRoles={["Admin"]}>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </RoleRoute>
            }
          />

          <Route
            path="/admin/category"
            element={
              <RoleRoute allowedRoles={["Admin"]}>
                <AdminLayout>
                  <CategoryPage />
                </AdminLayout>
              </RoleRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
