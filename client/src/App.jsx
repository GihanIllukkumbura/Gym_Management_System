import Login from "./components/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Register from "./components/Register";

// import { Navigate } from "react-router-dom";
import MemberDashboard from "./components/Member/MemberDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import TrainerDashboard from "./components/Trainer/TrainerDashboard";
import HomePage from "./components/HomePage";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const token = localStorage.getItem("token"); // Assuming 'token' is how you store it

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  return children ? children : <Outlet />; // Render children or nested routes
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member-dashboard"
          element={
            <ProtectedRoute>
              <MemberDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer-dashboard"
          element={
            <ProtectedRoute>
              <TrainerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
