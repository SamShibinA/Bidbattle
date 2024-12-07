import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./auction.css";
import p1 from "../Assests/Pic1.webp";
import p2 from "../Assests/Pic2.webp";
import p3 from "../Assests/Pic3.webp";
import p4 from "../Assests/Pic4.webp";
import p5 from "../Assests/Pic5.webp";
import p6 from "../Assests/Pic6.jpg";
import p7 from "../Assests/Pic7.jpeg";
import p8 from "../Assests/Pic8.jpeg";
import p9 from "../Assests/Pic9.jpg";

const items = [
  {
    id: 1,
    imageUrl: p1,
    text: "Ends in",
    endTime: "2024-12-10T10:00:00Z", // Auction end time
    textColor: "#C53742",
    title: "Fading Girl Color Painting",
    theme: "Modern",
    size: '16" X 24"',
    type: "Oil painting",
    description:
      "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.",
  },
  {
    id: 2,
    imageUrl: p2,
    text: "Starts in",
    endTime: "2024-12-12T14:00:00Z", // Auction start time
    textColor: "#333",
    title: "Abstract Colors",
    theme: "Abstract",
    size: '20" X 30"',
    type: "Acrylic painting",
    description: "A vivid explosion of colors, showcasing modern abstract art.",
  },
   {
        id: 3,
        imageUrl: p3,
        text: "Starts in",
        endTime: "2024-12-10T10:00:00Z",
        textColor: "#333",
        title: "Fading Girl Color Painting",
        theme: "Modern",
        size: '16" X 24"',
        type: "Oil painting",
        description:
          "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.",
      },
      {
        id: 4,
        imageUrl: p4,
        text: "Starts in",
        endTime: "2024-12-12T14:00:00Z",
        textColor: "#333",
        title: "Fading Girl Color Painting",
        theme: "Modern",
        size: '16" X 24"',
        type: "Oil painting",
        description:
          "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.",
      },
      {
        id: 5,
        imageUrl: p5,
        text: "Starts in",
        endTime: "2024-12-10T10:00:00Z",
        textColor: "#333",
        title: "Fading Girl Color Painting",
        theme: "Modern",
        size: '16" X 24"',
        type: "Oil painting",
        description:
          "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.",
      },
      {
        id: 6,
        imageUrl: p6,
        text: "Starts in",
        endTime: "2024-12-12T14:00:00Z",
        textColor: "#333",
        title: "Fading Girl Color Painting",
        theme: "Modern",
        size: '16" X 24"',
        type: "Oil painting",
        description:
          "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.",
      },
      {
        id: 7,
        imageUrl: p7,
        text: "Starts in",
        endTime: "2024-12-10T10:00:00Z",
        textColor: "#333",
        title: "Fading Girl Color Painting",
        theme: "Modern",
        size: '16" X 24"',
        type: "Oil painting",
        description:
          "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.",
      },
      {
        id: 8,
        imageUrl: p8,
        text: "Starts in",
        endTime: "2024-12-12T14:00:00Z",
        textColor: "#333",
        title: "Fading Girl Color Painting",
        theme: "Modern",
        size: '16" X 24"',
        type: "Oil painting",
        description:
          "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.",
      },
      {
        id: 9,
        imageUrl: p9,
        text: "Starts in",
        endTime: "2024-12-10T10:00:00Z",
        textColor: "#333",
        title: "Fading Girl Color Painting",
        theme: "Modern",
        size: '16" X 24"',
        type: "Oil painting",
        description:
          "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.",
      },
      {
        id: 10,
        imageUrl: p5,
        text: "Starts in",
        endTime: "2024-12-12T14:00:00Z",
        textColor: "#333",
        title: "Fading Girl Color Painting",
        theme: "Modern",
        size: '16" X 24"',
        type: "Oil painting",
        description:
          "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.",
      },
      {
        id: 11,
        imageUrl: p1,
        text: "Starts in",
        endTime: "2024-12-10T10:00:00Z",
        textColor: "#333",
        title: "Fading Girl Color Painting",
        theme: "Modern",
        size: '16" X 24"',
        type: "Oil painting",
        description:
          "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.",
      },
      {
        id: 12,
        imageUrl: p6,
        text: "Starts in",
        endTime: "2024-12-12T14:00:00Z",
        textColor: "#333",
        title: "Fading Girl Color Painting",
        theme: "Modern",
        size: '16" X 24"',
        type: "Oil painting",
        description:
          "The painting features a woman's face, partially obscured by a vibrant mix of colors and textures. Her eyes are closed, and her lips are parted, suggesting a state of contemplation or introspection.",
      }

];

const Auction = () => {
  const [timeRemaining, setTimeRemaining] = useState({});

  // Function to calculate the remaining time for each item
  const calculateTimeRemaining = (endTime) => {
    const endDate = new Date(endTime);
    const currentDate = new Date();
    const remainingTime = endDate - currentDate;

    if (remainingTime <= 0) {
      return "Expired";
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days}d:${hours}h:${minutes}m:${seconds}s`;
  };

  useEffect(() => {
    // Set up the countdown interval for each item
    const interval = setInterval(() => {
      const updatedTimeRemaining = items.reduce((acc, item) => {
        acc[item.id] = calculateTimeRemaining(item.endTime);
        return acc;
      }, {});
      setTimeRemaining(updatedTimeRemaining);
    }, 1000); // Update every second

    // Clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {items.map((item) => (
        <div key={item.id} className="card">
          <Link to="/BidcardAuction" state={item}>
            <img src={item.imageUrl} alt="artwork" className="image" />
            <div className="text" style={{ color: item.textColor }}>
              {item.text}
            </div>
            <div className="time">
              {timeRemaining[item.id] || "Loading..."} {/* Display the countdown */}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Auction;

