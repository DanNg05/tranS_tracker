import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { format } from 'date-fns';

const Card = () => {

  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);


  // FETCH TO GET DATA OF CARD WITH RELATED ID
  useEffect (() => {
    axios.get(`http://localhost:3000/api/v1/cards/${id}`)
      // console.log("Start");
      .then(response => {
        console.log(response.data);
        setCard(response.data);
      })
      .catch(error => {
        console.error("Error fetching card", error);
      });
  }, [id]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/cards/${id}`)
      .then(response => response.json())
      .then(data => setCard(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);


  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/cards/${id}`);
        setCard(response.data);
      } catch (error) {
        setError('Error fetching card');
        console.error('Error fetching card:', error);
      }
    };

    fetchCard();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!card) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{card.category}</p>
      <p>{format(card.date, 'EEE dd MMM yyyy')}</p>
      <p>{card.amount} AUD</p>
      <p>{card.description}</p>
    </div>
  )
}

export default Card
