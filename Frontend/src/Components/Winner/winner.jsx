import React from "react";
import "./winner.css";
import p1 from "../Assests/logo.png"

const Winnercard = () => {
  return (
    <div className="wincontainer">
    <div className="competition-container">
      <div className="competition-right">
        <div className="winner-header">
          
          <h2> 🏆 WINNER</h2>
        </div>
        <div className="winner-list">
          <div className="winner-item">
            <img src={p1} alt="Emre Çınar" className="winprofile" />
            <div>
              <h3>Name</h3>
              <p>Amount</p>
            </div>
          </div>
        </div>
        </div>
      <div className="competition-left">
        <div className="competition-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2>OVER THE COMPETITION</h2>
        <p>
          Nulla et tristique neque. Praesent ac quam leo. In et ipsum eros, a imperdiet libero. Ut augue dolor, elementum sit amet egestas in, condimentum in libero.
        </p>
      </div>
    </div>
    </div>
  );
};

export default Winnercard;