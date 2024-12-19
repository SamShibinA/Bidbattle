
import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import nimage from '../Assests/navlogo.png';
import defaultUserImage from '../Assests/userlogo.png';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import axios from 'axios';

function NavigationBar() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [userImage, setUserImage] = useState(defaultUserImage); 
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setSidebarVisible((prevState) => !prevState);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSidebarVisible(false);
        }
    };

    useEffect(() => {
        if (isSidebarVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarVisible]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserImage(response.data.profilePicture || defaultUserImage);
            } catch (error) {
                console.error('Error fetching user profile:', error.response?.data || error.message);
                setUserImage(defaultUserImage);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div id="navwithline">
            <div id="navbar">
                <div id="title">
                    <img src={nimage} id="limg" alt="logo" />
                    <h1>BidBattle</h1>
                </div>
                <div id='list'>
                    <ul>
                        <li onClick={toggleSidebar}>My Profile</li>
                        <Link to="/My Order"><li>My Order</li></Link>
                        <Link to="/Buy"><li>Buy</li></Link>
                        <Link to="/Auction"><li>Auction</li></Link>
                        <Link to="/Home"><li>Home</li></Link>
                    </ul>
                </div>
                <Link to="/Edit Profile"><img src={userImage} id="uimg" alt="User Profile" /></Link>
            </div>

            {isSidebarVisible && <div ref={sidebarRef}><Sidebar /></div>}
        </div>
    );
}

export default NavigationBar;
