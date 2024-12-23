// import React from 'react'
// import NavigationBar from '../../Components/Navbar/navbar'
// import Winnercard from '../../Components/Winner/winner'

// const Winnnerpage = () => {
//   return (
//     <div>
//          <NavigationBar />
//           <Winnercard />
//     </div>
//   )
// }

// export default Winnnerpage
import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import NavigationBar from "../../Components/Navbar/navbar";
import Winnercard from "../../Components/Winner/winner";

const Winnerpage = () => {
  const location = useLocation(); // Use useLocation to get the passed state
  const { productId } = location.state || {}; // Safely access state and productId

  if (!productId) {
    return <div>No product selected or invalid product ID.</div>; // Handle missing state
  }

  return (
    <div>
      <NavigationBar />
      <Winnercard productId={productId} /> {/* Pass productId to Winnercard */}
    </div>
  );
};

export default Winnerpage;
