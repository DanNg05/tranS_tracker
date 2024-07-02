import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import {Link} from 'react-router-dom';
import Footer from './Footer'
import '../Styling/Styling.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styling/Cards.css';
// import {Toggle} from './Toggle';
import '../Styling/Toggle.css'
import { DarkModeContext } from '../App';
import {returnIcon} from './returnIcon';
import {isToday, sortCardsByDate, groupCardsByDate, getDifferenceInDays, handleBackground } from './Date';

const API_URL = "http://localhost:3000/api/v1/cards";

const Cards = () => {
  const isDark = useContext(DarkModeContext);
  const today = new Date();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);


  // FETCH DATA FROM API
  useEffect(() => {
    fetchCards();
  }, []);


  const fetchCards = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;

      // SORT CARDS BY DATE
      const sortedCards = sortCardsByDate(data);

      // GROUP CARDS BY DATE
      const grouped = groupCardsByDate(sortedCards);
      setCards(grouped);
    } catch (error) {
      setError('Error fetching card');
      console.error('Error fetching and grouping cards:', error);
    }
  };

  // CHECK FOR ERROR AND THE AVAILABILITY OF DATA
  if (error) {
    return <div>{error}</div>;
  }

  if (!cards) {
    return <div>Loading...</div>;
  }
  return (
      <div className='container-1' data-theme={ isDark ? "dark" : ""}>
        <div className="d-flex justify-content-center ">
          <h2 className='cards-header'>Your transactions</h2>
        </div>
        {Object.keys(cards).map(date => (
          <div key={date} className='cards-card-info-with-date'>
            { isToday(new Date(date)) ? <strong className='cards-date'>{format(date, 'EEE dd MMM yyyy')} <span className='right-of-date'>Today</span></strong> : <strong className='cards-date'>{format(date, 'EEE dd MMM yyyy')} <span className='right-of-date'>{getDifferenceInDays(today, new Date(date))} days ago</span></strong>  }
            {cards[date].map((card, index) => (
              <div key={card.id} className={`${handleBackground(index)} cards-card-info-without-date`}>
                <div className='d-flex'>
                <Link className=' no-mb icons-left' to={`/cards/${card.id}`}>{returnIcon(card.category)}</Link>
                {/* <p className='no-mb icons-left'>{returnIcon(card.category)}</p> */}
                <p className='no-mb cards-card-description'>{card.description} </p>
                </div>
                <Link className='no-underline' to={`/cards/${card.id}`}>{card.amount} AUD</Link>
              </div>
            ))}
          </div>
        ))}
        <div>
          <Link to={`/cards/search`}><i class="fa-solid fa-magnifying-glass search-btn"></i></Link>
        </div>
      <Footer />
    </div>
  );
};

export default Cards;
