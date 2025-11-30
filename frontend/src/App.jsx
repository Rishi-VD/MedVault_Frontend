import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Registration from "./Pages/Authentication/RegistrationForm"
import Login from "./Pages/Authentication/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext.jsx";
import { FaHospitalUser } from "react-icons/fa";
import "./App.css";

function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <header className="main-header">
        <div className="header-content">
          <FaHospitalUser className="header-icon" color="white" />
          <h1>MEDVAULT</h1>
        </div>
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        )}
      </header>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default AppWrapper;
