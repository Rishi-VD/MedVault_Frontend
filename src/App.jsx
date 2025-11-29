import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Authentication/RegistrationForm"
import Login from "./Pages/Authentication/Login";
import { FaHospitalUser } from "react-icons/fa";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="main-header">
        <FaHospitalUser className="header-icon" color="white" />
        <h1>MEDVAULT</h1>
      </header>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
