import React, { useState } from 'react';
import './sign.css';
import logo from '../../Components/Assests/loginlogo.png';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username,
        email,
        password,
      });
      alert(response.data.message); 
      navigate('/Login'); 
    } catch (error) {
      if (error.response) {
        console.error('Backend Error:', error.response.data);
        alert(error.response.data.message || 'Failed to sign up. Please try again.');
      } else if (error.request) {
        console.error('No response from server:', error.request); 
        alert('No response from the server. Please try again.');
      } else {
        console.error('Error during request setup:', error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="overallsignup">
      <div className="sign-main-container">
        <div className="sign-container">
          <div className="right-panel">
            <div className="logo-container">
              <img src={logo} alt="BidBattle Logo" className="logo" />
              <h2>BidBattle</h2>
            </div>
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="signin-btn">Sign Up</button>
            </form>
          </div>
          <div className="left-panel">
            <h1>Welcome!</h1>
            <p>Already Have an Account in BidBattle?</p>
            <button
              className="signup-btn"
              onClick={() => navigate('/Login')} 
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
