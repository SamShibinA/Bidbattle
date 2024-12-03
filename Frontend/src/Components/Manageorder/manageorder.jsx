import React from 'react';
import './mangerorder.css'
import p1 from '../Assests/Pic1.webp' // Replace with your actual image path

const ManageOrder = () => {
  return (
    <div className="manageorder">
    <div className="manage-order-container">
      <h2>
        <span className="manage-icon">⬆</span> MANAGE ORDER
      </h2>
       <hr />
      <div className="order-details">
        <div className="imgandorderdetails">
        <img src={p1} alt="Product" className="order-image" />

        <div className="order-info">
          <p><strong>Name:</strong> Mr.Anand</p>
          <p><strong>Phone number:</strong> 7856452356</p>
          <p><strong>Address:</strong></p>
          <p>Nehru Street,<br />Gindy,<br />Chennai - 600 028.</p>
        </div>
      </div>
      </div>

      <div className="inputorder">
      <div className="input-group">
        <input type="text" placeholder="Consignment Number" className="input-field" />
        <input type="text" placeholder="Courier Service Name" className="input-field" />
      </div>

      <div className="order-actions">
        <button className="action-button packed">Packed</button>
        <button className="action-button shipped">Shipped</button>
        <button className="action-button delivered">Delivered</button>
      </div>
      </div>
    </div>
    </div>
  
  );
};

export default ManageOrder;
