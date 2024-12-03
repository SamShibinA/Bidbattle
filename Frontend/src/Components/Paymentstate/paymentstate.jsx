import React, { useState } from 'react';
import './paymentstate.css';
import p1 from '../Assests/Pic1.webp'
import p2 from '../Assests/Pic2.webp'
const Paymentstate = () => {
  // Define initial images and details
  const images = [
    {
      id: 1,
    //   src: p1, // Replace with actual Mona Lisa URL
      title: "Mona Lisa Oil Painting",
      price: 100,
      theme: "Historical",
      shipping: 50,
      escrow: 10,
    },
    {
      id: 2,
    //   src: p2, // Replace with actual Starry Night URL
      title: "Starry Night Oil Painting",
      price: 120,
      theme: "Post-Impressionism",
      shipping: 55,
      escrow: 12,
    },
    // Add more images as needed
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="container">
      <div className="image-selection">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.title}
            className="thumbnail"
            onClick={() => handleImageSelect(image)}
          />
        ))}
      </div>
      <div className="image-section">
        <img
          src={selectedImage.src}
          alt={selectedImage.title}
          className="art-image"
        />
      </div>
      <div className="details-section">
        <h2>{selectedImage.title}</h2>
        <h3>${selectedImage.price}.00</h3>
        <p><strong>Theme:</strong> {selectedImage.theme}</p>
        
        <div className="price-details">
          <div className="price-row">
            <span>Items Total</span>
            <span>${selectedImage.price}</span>
          </div>
          <div className="price-row">
            <span>Shipping Fees</span>
            <span>${selectedImage.shipping}</span>
          </div>
          <div className="price-row">
            <span>Escrow Fees</span>
            <span>${selectedImage.escrow}</span>
          </div>
          <hr />
          <div className="price-row total">
            <span>Total</span>
            <span>${selectedImage.price + selectedImage.shipping + selectedImage.escrow}</span>
          </div>
        </div>
        
        <button className="payment-button">Make Payment</button>
      </div>
    </div>
  );
};

export default Paymentstate;
