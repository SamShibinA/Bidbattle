import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/Homepage/homepage';
import AuctionPage from './Pages/Auctionpage/auctionpage';
import BuyPage from './Pages/Buypage/buypage';
import Myorderpage from './Pages/Myorderpage/myorderpage';
import Manageorderpage from './Pages/Manageorderpage/manageorderpage';
import Editprofilepage from './Pages/Editprofilepage/editprofilepage';
import Createauctionpage from './Pages/Createauctionpage/createauctionpage';
import Addartpage from './Pages/Addartpage/addartpage';
import Favoritepage from './Pages/Favoritepage/favoritepage';
import Removeartpage from './Pages/Removeartpage/removeartpage';
import Signup from './Components/Signup/sign'
import Login from './Components/Login/login';
import Auctionsecondpage from './Pages/Auctionseconpage/auctionsecondpage';
import Buysecondpage from './Pages/Buysecondpage/buysecondpage';
import Paymentpage from './Pages/Paymentpage/paymentpage';
import Winnnerpage from './Pages/Winnerpage/winnnerpage';
function App() {
  return (
 <div>
  
    <Router>
       <div >
            <Routes>

              <Route path="/" element={<Login />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Singin" element={<HomePage />} />
              <Route path="/Home" element={<HomePage />} />
              <Route path="/Auction" element={<AuctionPage />} />
              <Route path="/BidcardAuction" element={<Auctionsecondpage />} />
              <Route path="BuyCard"element={<Buysecondpage />}/>
              <Route path="/Buy" element={<BuyPage />}/>
              <Route path="/payment" element={<Paymentpage />}/>*/For Payment */
              <Route path="/My Order" element={ <Myorderpage />}/>
              <Route path="/Edit Profile" element={<Editprofilepage />}/>
              <Route path="/Create Auction" element={<Createauctionpage />}/>
              <Route path="/Add Art" element={<Addartpage />}/>
              <Route path="/Remove Art" element={<Removeartpage />} />
              <Route path="/Favourite" element={<Favoritepage />}/>
              <Route path="/Manage Order" element={<Manageorderpage />}/>\
              <Route path="Log Out" element={<Login />}/>
              <Route path="/Winnerpage" element={<Winnnerpage />}/>
        </Routes>
        </div>
    </Router>
 </div>
  
  );
}

export default App;
