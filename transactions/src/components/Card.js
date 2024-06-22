import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { format } from 'date-fns';
import Footer from './Footer';
import '../Styling/Styling.css'


const Card = () => {

  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // FETCH TO GET DATA OF CARD WITH RELATED ID
  useEffect (() => {
    axios.get(`http://localhost:3000/api/v1/cards/${id}`)
      .then(response => {
        console.log(response.data);
        setCard(response.data);
      })
      .catch(error => {
        setError('Error fetching card');
        console.error("Error fetching card", error);
      });
  }, [id]);

  // FUNCTION TO HANDLE DELETE ACTION OF CARD
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/cards/${id}`);
      navigate('/cards')
    }
    catch (error) {
      console.error('Error deleting card:', error);
    }
  }


  // CHECK FOR ERROR AND THE AVAILABILITY OF DATA
  if (error) {
    return <div>{error}</div>;
  }

  if (!card) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <p>{card.category}</p>
        <p>{format(card.date, 'EEE dd MMM yyyy')}</p>
        <p>{card.amount} AUD</p>
        <p>{card.description}</p>
        <button onClick={handleDelete}>Delete transaction</button>
      </div>
      <Footer />
    </>
  )
}

export default Card
