import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {Link} from 'react-router-dom';
import Footer from './Footer'
import '../Styling/Styling.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styling/Cards.css';
import {Toggle} from './Toggle';
import '../Styling/Toggle.css'

const API_URL = "http://localhost:3000/api/v1/cards";


const Cards = () => {
  const today = new Date();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(true);

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

  // FUNCTION TO RETURN ICONS
  const returnIcon = (category) => {
    switch (category) {
      case 'shopping':
        return <i class="fa-solid fa-bag-shopping"></i>;
      case 'transportation':
        return <i class="fa-solid fa-car"></i>;
      case 'groceries':
        return <i class="fa-solid fa-drumstick-bite"></i>;
      case 'utilities':
        return <i class="fa-solid fa-bolt"></i>;
      case 'health':
        return <i class="fa-solid fa-heart-pulse"></i>;
      case 'entertainment':
        return <i class="fa-solid fa-gamepad"></i>;
      default:
        return <i class="fa-regular fa-circle"></i>;
    }
  };
  // PUT DIFFERENCE BACKGROUND COLOR OF DIV
  const handleBackground = (index) => {
    if (index % 2 === 0) {
      return `grey-bg`
    }
      return `darker-bg`
  }
  // CHECK FOR ERROR AND THE AVAILABILITY OF DATA
  if (error) {
    return <div>{error}</div>;
  }

  if (!cards) {
    return <div>Loading...</div>;
  }
  return (
      <div className='container' data-theme={ isDark ? "dark" : ""}>
        <Toggle
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
        />
        <div className="d-flex justify-content-center ">
          <h2 className='cards-header'>Your transactions</h2>
        </div>
        {Object.keys(cards).map(date => (
          <div key={date} className='cards-card-info-with-date'>
            { isToday(new Date(date)) ? <strong className='cards-date'>{format(date, 'EEE dd MMM yyyy')} <span className='right-of-date'>Today</span></strong> : <strong className='cards-date'>{format(date, 'EEE dd MMM yyyy')} <span className='right-of-date'>{getDifferenceInDays(today, new Date(date))} days ago</span></strong>  }
            {cards[date].map((card, index) => (
              <div key={card.id} className={`${handleBackground(index)} cards-card-info-without-date`}>
                <div className='d-flex'>
                <p className='no-mb icons-left'>{returnIcon(card.category)}</p>
                <p className='no-mb cards-card-description'>{card.description} </p>
                </div>
                <Link className='no-underline' to={`/cards/${card.id}`}>{card.amount} AUD</Link>
              </div>
            ))}
          </div>
        ))}
      <Footer />
    </div>
  );
};

export default Cards;
