import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { format } from 'date-fns';

const Card = () => {

  const { id } = useParams();
  const [card, setCard] = useState(null);
  // FETCH TO GET DATA OF CARD WITH RELATED ID
  useEffect (() => {
    axios.get(`http://localhost:3000/api/v1/cards/${id}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching card", error);
      });
  }, [id]);

  // return (
  //   <div>
  //     <p>{card.category}</p>
  //     <p>{format(card.date, 'EEE dd MMM yyyy')}</p>
  //     <p>{card.amount} AUD</p>
  //     <p>{card.description}</p>
  //   </div>
  // )
}

export default Card
