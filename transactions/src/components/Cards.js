import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
const API_URL = "http://localhost:3000/api/v1/cards";

function getAPIData () {
  return axios.get(API_URL).then((response) => response.data)
}
const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/cards')
      .then(response => {
        setCards(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  return (
    <div>
      <h1>Cards Page</h1>
      {/* Your cards content here */}
    </div>
  );
};

export default Cards;
