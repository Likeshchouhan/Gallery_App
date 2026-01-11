import { useState } from "react";
// import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import url from '../constant/constant.js';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
      const res = await axios.post(`${url}/api/auth/login`, form);
      localStorage.setItem("token", res.data.token);

      console.log('Login Response:', res.data);

      alert('Login successful!');
      navigate('/userprofile');
      
     } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
     }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              name="userId"
              placeholder="User ID"
              value={form.userId}
              onChange={handleChange}
              required
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                fontSize: '18px'
              }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <a href="/forgot-password" style={{ color: '#1976d2', fontSize: '14px', textDecoration: 'none' }}>
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Login
          </button>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
            Don't have an account? <a href="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;