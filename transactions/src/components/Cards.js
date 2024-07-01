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
import Modal from 'react-modal';
import SearchForm from './SearchForm';


const API_URL = "http://localhost:3000/api/v1/cards";

Modal.setAppElement('#root');
const Cards = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isDark = useContext(DarkModeContext);
  const today = new Date();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [rawData, setRawData] = useState();
  const [filteredTransactions, setFilteredTransactions] = useState();


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
      setRawData(data);

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

  // OPEN MODAL
  const openModal = () => {
    setModalIsOpen(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setModalIsOpen(false);
  };


  const filterTransactions = (items, criteria) => {
    return items.filter(item =>
      item.category === criteria.category &&
      item.description.toLowerCase().includes(criteria.description.toLowerCase())
    );
  };


  const handleSearch = (criteria) => {
    const filtered = filterTransactions(rawData, criteria);
    console.log(filtered);
    setFilteredTransactions(filtered);
    console.log(filteredTransactions)
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
          {/* MODAL */}
          <button className='search-btn' onClick={openModal}><i className="fa-solid fa-magnifying-glass"></i></button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
            <h2>Find transactions</h2>
            <SearchForm onSearch={handleSearch} />
            <button onClick={closeModal}>Close</button>
          </Modal>

      <Footer />
    </div>
  );
};

export default Cards;
