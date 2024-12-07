import React, { useState } from 'react';
import './login.css';
import logo from "../../Components/Assests/loginlogo.png";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

const Login = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleSignInClick = async (e) => {
    e.preventDefault(); 

    try {

      const response = await axios.post('http://localhost:5000/api/login', {
        username, 
        password, 
      });

      // alert(response.data.message); 
      localStorage.setItem('token', response.data.token); 
      navigate('/Home'); 
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        setError('No response from the server. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='overalllogin'>
      <div className="main-container">
        <div className="login-container">
          <div className="left-panel">
            <h1>Welcome!</h1>
            <p>Create your account.<br />For Free!</p>
            <button 
              className="signup-btn" 
              onClick={() => navigate('/Signup')} 
            >
              Sign Up
            </button>
          </div>
          <div className="right-panel">
            <div className="logo-container">
              <img src={logo} alt="BidBattle Logo" className="logo" />
              <h2>BidBattle</h2>
            </div>
            <h3>Login</h3>
            <form className="login-form" onSubmit={handleSignInClick}>
              <div className="input-group">
                <label htmlFor="username">Username/Email address</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username/Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-container">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="signin-btn">Sign In</button>
            </form>
            {error && <div className="error-message">{error}</div>} 
            <a href="/forgot-password" className="forgot-password-link">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
