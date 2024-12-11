// import React, { useState, useEffect, useRef } from 'react';
// import './navbar.css';
// import userimage from '../Assests/userlogo.png';
// import nimage from '../Assests/navlogo.png';
// import { Link } from 'react-router-dom';
// import Sidebar from '../Sidebar/sidebar';

// function NavigationBar() {
//     const [isSidebarVisible, setSidebarVisible] = useState(false);
//     const sidebarRef = useRef(null);

//     const toggleSidebar = () => {
//         setSidebarVisible(prevState => !prevState);
//     };

//     // Close sidebar when clicking outside of it
//     const handleClickOutside = (event) => {
//         if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//             setSidebarVisible(false);
//         }
//     };

//     useEffect(() => {
//         if (isSidebarVisible) {
//             document.addEventListener('mousedown', handleClickOutside);
//         } else {
//             document.removeEventListener('mousedown', handleClickOutside);
//         }

//         // Cleanup the event listener on component unmount
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isSidebarVisible]);

//     return (
//         <div id="navwithline">
//             <div id="navbar">
//                 <div id="title">
//                     <img src={nimage} id="limg" alt="logo" />
//                     <h1>BidBattle</h1>
//                 </div>
//                 <div id='list'>
//                     <ul>
//                         <li onClick={toggleSidebar}>My Profile</li>
//                         <Link to="/My Order"><li>My Order</li></Link>
//                         <Link to="/Buy"><li>Buy</li></Link>
//                         <Link to="/Auction"><li>Auction</li></Link>
//                         <Link to="/Home"><li>Home</li></Link>
//                     </ul>
//                 </div>
//                 <img src={userimage} id="uimg" alt="USERIMAGE" />
//             </div>
            
//             {/* Conditionally render the Sidebar component */}
//             {isSidebarVisible && <div ref={sidebarRef}><Sidebar /></div>}
//         </div>
//     );
// }

// export default NavigationBar;
// import React, { useState, useEffect, useRef } from 'react';
// import './navbar.css';
// import nimage from '../Assests/navlogo.png';
// import { Link } from 'react-router-dom';
// import Sidebar from '../Sidebar/sidebar';
// import axios from 'axios';

// function NavigationBar() {
//     const [isSidebarVisible, setSidebarVisible] = useState(false);
//     const [userImage, setUserImage] = useState(null); // State to store the user profile image
//     const sidebarRef = useRef(null);

//     const toggleSidebar = () => {
//         setSidebarVisible((prevState) => !prevState);
//     };

//     // Close sidebar when clicking outside of it
//     const handleClickOutside = (event) => {
//         if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//             setSidebarVisible(false);
//         }
//     };

//     useEffect(() => {
//         if (isSidebarVisible) {
//             document.addEventListener('mousedown', handleClickOutside);
//         } else {
//             document.removeEventListener('mousedown', handleClickOutside);
//         }

//         // Cleanup the event listener on component unmount
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isSidebarVisible]);

//     // Fetch user profile and image
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const token = localStorage.getItem('token'); // Retrieve JWT token
//             try {
//                 const response = await axios.get('http://localhost:5000/api/profile', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 // Set user image or fallback to default
//                 setUserImage(response.data.profilePicture || '../Assests/userlogo.png');
//             } catch (error) {
//                 console.error('Error fetching user profile:', error.response?.data || error.message);
//                 setUserImage('../Assests/userlogo.png'); // Fallback to default image
//             }
//         };

//         fetchUserProfile();
//     }, []);

//     return (
//         <div id="navwithline">
//             <div id="navbar">
//                 <div id="title">
//                     <img src={nimage} id="limg" alt="logo" />
//                     <h1>BidBattle</h1>
//                 </div>
//                 <div id="list">
//                     <ul>
//                         <li onClick={toggleSidebar}>My Profile</li>
//                         <Link to="/My Order"><li>My Order</li></Link>
//                         <Link to="/Buy"><li>Buy</li></Link>
//                         <Link to="/Auction"><li>Auction</li></Link>
//                         <Link to="/Home"><li>Home</li></Link>
//                     </ul>
//                 </div>
//                 <img src={userImage} id="uimg" alt="User Profile" />
//             </div>

//             {/* Conditionally render the Sidebar component */}
//             {isSidebarVisible && <div ref={sidebarRef}><Sidebar /></div>}
//         </div>
//     );
// }

// export default NavigationBar;
import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import nimage from '../Assests/navlogo.png';
import defaultUserImage from '../Assests/userlogo.png';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import axios from 'axios';

function NavigationBar() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [userImage, setUserImage] = useState(defaultUserImage); // Set default image initially
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setSidebarVisible((prevState) => !prevState);
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

    // Fetch user profile and image
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token'); // Retrieve JWT token
            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Set user image or fallback to default
                setUserImage(response.data.profilePicture || defaultUserImage);
            } catch (error) {
                console.error('Error fetching user profile:', error.response?.data || error.message);
                setUserImage(defaultUserImage); // Fallback to default image
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

            {/* Conditionally render the Sidebar component */}
            {isSidebarVisible && <div ref={sidebarRef}><Sidebar /></div>}
        </div>
    );
}

export default NavigationBar;
