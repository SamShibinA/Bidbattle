import React from 'react';
import './auction.css';
import p1 from '../Assests/Pic1.webp'
import p2 from '../Assests/Pic2.webp'
import p3 from '../Assests/Pic3.webp'
import p4 from '../Assests/Pic4.webp'
import p5 from '../Assests/Pic5.webp'
import p6 from '../Assests/Pic6.jpg'
import p7 from '../Assests/Pic7.jpeg'
import p8 from '../Assests/Pic8.jpeg'
import p9 from '../Assests/Pic9.jpg'

const items = [
  {
    id: 1,
    imageUrl: p1,
    text: 'Ends in',
    time: '5d:7h:12m',
    textColor: '#C53742'
  },
  {
    id: 2,
    imageUrl: p2,
    text: 'Starts in',
    time: '6d:5h:42m',
    textColor: '#333'
  },
  {
    id: 3,
    imageUrl: p3,
    text: 'Starts in',
    time: '8d:7h:56m',
    textColor: '#333'
  },
  {
    id: 4,
    imageUrl: p4,
    text: 'Starts in',
    time: '15d:9h:37m',
    textColor: '#333'
  }
  ,
  {
    id: 5,
    imageUrl: p5,
    text: 'Starts in',
    time: '5d:7h:12m',
    textColor: '#333'
  },
  {
    id: 6,
    imageUrl: p6,
    text: 'Starts in',
    time: '6d:5h:42m',
    textColor: '#333'
  },
  {
    id: 7,
    imageUrl: p7,
    text: 'Starts in',
    time: '8d:7h:56m',
    textColor: '#333'
  },
  {
    id: 8,
    imageUrl: p8,
    text: 'Starts in',
    time: '15d:9h:37m',
    textColor: '#333'
  },
  {
    id: 9,
    imageUrl: p9,
    text: 'Starts in',
    time: '15d:9h:37m',
    textColor: '#333'
  }
  ,
  {
    id: 10,
    imageUrl: p4,
    text: 'Starts in',
    time: '5d:7h:12m',
    textColor: '#333'
  },
  {
    id: 11,
    imageUrl: p5,
    text: 'Starts in',
    time: '6d:5h:42m',
    textColor: '#333'
  },
  {
    id: 12,
    imageUrl: p2,
    text: 'Starts in',
    time: '8d:7h:56m',
    textColor: '#333'
  }
 
];

const Auction = () => {
  return (
    <div className="container">
      {items.map((item) => (
        <div key={item.id} className="card">
          <img src={item.imageUrl} alt="artwork" className="image" />
          <div className="text" style={{ color: item.textColor }}>{item.text}</div>
          <div className="time">{item.time}</div>
        </div>
      ))}
    </div>
  );
};

export default Auction;
