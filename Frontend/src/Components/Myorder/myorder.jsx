import React, { useState } from "react";
import "./myorder.css";
import p1 from "../Assests/Pic1.webp";
import p2 from "../Assests/Pic2.webp";

function MyOrder() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Modern Art Oil Painting",
      price: 150,
      image: p1,
      status: "shipped",
      courierService: "Indian Post",
      consignmentNumber: "1234567",
    },
    {
      id: 2,
      name: "The Holy Tree Painting",
      price: 130,
      image: p2,
      status: "ordered",
      courierService: "Indian Post",
      consignmentNumber: "1234567",
    },
  ]);

  const handleDelivered = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: "delivered" } // Only update the specific order
          : order // Keep other orders unchanged
      )
    );
  };

  return (
    <div className="my-order">
      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-image">
            <img src={order.image} alt={order.name} />
          </div>
          <div className="order-details">
            <h2>{order.name}</h2>
            <h3 id="price">${order.price}</h3>
            <div id="delivery">
              <div>
                <div className="order-progress">
                  <span
                    className={`status ${
                      ["ordered", "packed", "shipped", "delivered"].includes(order.status)
                        ? "active"
                        : ""
                    }`}
                  ></span>
                  <span className="equal">======</span>
                  <span
                    className={`status ${
                      ["packed", "shipped", "delivered"].includes(order.status)
                        ? "active"
                        : ""
                    }`}
                  ></span>
                  <span className="equal">======</span>
                  <span
                    className={`status ${
                      ["shipped", "delivered"].includes(order.status)
                        ? "active"
                        : ""
                    }`}
                  ></span>
                  <span className="equal">======</span>
                  <span
                    className={`status ${
                      order.status === "delivered" ? "active" : ""
                    }`}
                  ></span>
                </div>

                <div id="opsd">
                  <span>Ordered</span>
                  <span>Packed</span>
                  <span>Shipped</span>
                  <span>Delivered</span>
                </div>
              </div>
              {order.status === "shipped" && (
                <button
                  className="delivered-button"
                  onClick={() => handleDelivered(order.id)}
                >
                  Delivered
                </button>
              )}
            </div>
            <p>Courier Service: {order.courierService}</p>
            <p>Consignment Number: {order.consignmentNumber}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrder;
