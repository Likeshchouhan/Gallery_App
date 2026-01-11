import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import "./index.css";
import UserProfile from "./pages/UserProfile";
import Gallery from "./components/Gallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Login />} />
        <Route path="/userprofile" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
