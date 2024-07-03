import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { format } from 'date-fns';
import Footer from './Footer';
import '../Styling/Styling.css'
import {returnIcon} from './returnIcon';
import '../Styling/Card.css'
import AnimatedPage from './AnimatedPage';



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
    <AnimatedPage>
      <div className='container-3'>
        <div className="padding-top">
          <p className='card-center-p'>{returnIcon(card.category)}</p>
          <p className='card-center-p'>Category: {card.category.toUpperCase()}</p>
          <p className='card-center-p'>Date: {format(card.date, 'EEE dd MMM yyyy')}</p>
          <p className='card-center-p'>Amount :{card.amount} AUD</p>
          <p className='card-center-p'>Description: {card.description}</p>
          <div className="d-flex justify-content-center">
            <button className='card-delete-btn' onClick={handleDelete}>DELETE TRANSACTION</button>
          </div>
        </div>


      </div>
      <Footer />
    </AnimatedPage>
  )
}

export default Card
