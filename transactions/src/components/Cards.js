import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const API_URL = "http://localhost:3000/api/v1/cards";


const Cards = () => {
  const today = new Date();
  const [cards, setCards] = useState([]);


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

  // FETCH DATA FROM API
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the cards!", error);
      });
  }, []);



  return (
    <div>
      <h1>Cards Page</h1>
      {cards.map ((card) => {
        const date = new Date(card.date);
        // DISPLAY RELEVANT INFO OF CARD
        return(
          <div key={card.id}>
            { isToday(date) ? <p>{format(card.date, 'EEE dd MMM yyyy')} Today</p> : <p>{format(card.date, 'EEE dd MMM yyyy')} {getDifferenceInDays(today, date)} days</p>  }
            <p>{card.amount} AUD </p>
            <p>{card.category}  </p>
            <p>{card.description} </p>
          </div>
        )
      })}
    </div>
  );
};

export default Cards;
