import React from 'react';
import './login.css';
import logo from "../../Components/Assests/loginlogo.png";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const navigate = useNavigate(); // Initialize navigate hook

    const handleSignUpClick = () => {
        navigate('/Signup'); // Redirect to the Sign-Up page
    };
    const handleSignInClick =() =>{
        navigate('/Home')
    }

    return (
        <div className='overalllogin'>
            <div className="main-container">
                <div className="login-container">
                    <div className="left-panel">
                        <h1>Welcome!</h1>
                        <p>Create your account.<br />For Free!</p>
                        <button 
                            className="signup-btn" 
                            onClick={handleSignUpClick} // Attach the navigation function
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
                        <form className="login-form">
                            <div className="input-group">
                                <label htmlFor="username">Username/Email address</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Username/Email"
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
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="signin-btn" onClick={handleSignInClick}>Sign In</button>
                        </form>
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
