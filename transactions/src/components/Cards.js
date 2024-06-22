import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {Link} from 'react-router-dom';
import Footer from './Footer'
import '../Styling/Styling.css'


const API_URL = "http://localhost:3000/api/v1/cards";


const Cards = () => {
  const today = new Date();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  // CALCULATE THE DIFFERENCE IN DAYS
  const getDifferenceInDays = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };


  // CHECK TODAY
  const isToday = (someDate) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear();
  };

  // SORT DATA BY DATE
  const sortCardsByDate = (cards) => {
    return cards.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // // GROUP BY DATE
  const groupCardsByDate = (cards) => {
    return cards.reduce((grouped, card) => {
      const date = card.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(card);
      return grouped;
    }, {});
  };


  // FETCH DATA FROM API
  useEffect(() => {
    fetchCards();
  }, []);


  const fetchCards = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;

      // Sort cards by date
      const sortedCards = sortCardsByDate(data);

      // Group cards by date
      const grouped = groupCardsByDate(sortedCards);
      setCards(grouped);
    } catch (error) {
      setError('Error fetching card');
      console.error('Error fetching and grouping cards:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!cards) {
    return <div>Loading...</div>;
  }
  return (

      <div>
        <h2>Card List</h2>
        {Object.keys(cards).map(date => (
          <div key={date}>
            { isToday(new Date(date)) ? <strong>{format(date, 'EEE dd MMM yyyy')} Today</strong> : <strong>{format(date, 'EEE dd MMM yyyy')} {getDifferenceInDays(today, new Date(date))} days ago</strong>  }
            {cards[date].map(card => (
              <div key={card.id}>
                <p>Category: {card.category}</p>
                <Link to={`/cards/${card.id}`}>Amount: {card.amount} AUD</Link>
                <p>Description: {card.description} </p>
              </div>
            ))}
          </div>
        ))}
      <Footer />
    </div>
  );
};

export default Cards;
