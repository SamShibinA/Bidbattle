import React, { useState } from 'react';
import './sign.css'; // Import your CSS file
import logo from '../../Components/Assests/loginlogo.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  const handleSignInClick = () => {
    navigate('/Login'); // Navigate to the Login page
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
                <label htmlFor="username">Username/Email address</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username/Email"
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
                <div className="password-container">
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
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-container">
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
              </div>
              <button type="submit" className="signin-btn"  onClick={handleSignInClick}>Sign Up</button>
            </form>
          </div>
          <div className="left-panel">
            <h1>Welcome!</h1>
            <p>Already Have an Account in BidBattle?</p>
            <button
              className="signup-btn"
              onClick={handleSignInClick} // Attach navigation function
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
