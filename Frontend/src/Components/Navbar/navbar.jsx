import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import uimage from '../Assests/userlogo.png';
import nimage from '../Assests/navlogo.png';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';

function NavigationBar() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setSidebarVisible(prevState => !prevState);
    };

    // Close sidebar when clicking outside of it
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

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarVisible]);

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
                <img src={uimage} id="uimg" alt="USERIMAGE" />
            </div>
            
            {/* Conditionally render the Sidebar component */}
            {isSidebarVisible && <div ref={sidebarRef}><Sidebar /></div>}
        </div>
    );
}

export default NavigationBar;
