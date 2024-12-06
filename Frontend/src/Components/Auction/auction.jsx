import React from "react";
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
    time: "5d:7h:12m",
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
    time: "6d:5h:42m",
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
    time: "5d:7h:12m",
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
    time: "5d:7h:12m",
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
    time: "5d:7h:12m",
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
    time: "5d:7h:12m",
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
    time: "5d:7h:12m",
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
    time: "5d:7h:12m",
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
    time: "5d:7h:12m",
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
    time: "5d:7h:12m",
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
    time: "5d:7h:12m",
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
    time: "5d:7h:12m",
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
  return (
    <div className="container">
      {items.map((item) => (
        <div key={item.id} className="card">
          <Link to="/BidcardAuction" state={item}>
            <img src={item.imageUrl} alt="artwork" className="image" />
            <div className="text" style={{ color: item.textColor }}>
              {item.text}
            </div>
            <div className="time">{item.time}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Auction;

