import React, {useState, useEffect} from 'react';
import SearchForm from './SearchForm';
import axios from 'axios';
import { format } from 'date-fns';
import {isToday, sortCardsByDate, groupCardsByDate, getDifferenceInDays, handleBackground } from './Date';
import { returnIcon } from './returnIcon';
import {Link} from 'react-router-dom';
import Footer from './Footer';
import '../Styling/newCard.css'

const Search = () => {
  const today = new Date();
  const [rawData, setRawData] = useState();
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);

  // FETCH DATA FROM API
  const fetchAPI = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/cards');
      setRawData(response.data);
    }
    catch (error) {
      setError("Error during fetch");
      console.error('Error fetching', error);
    }
  }

  useEffect (() => {
    fetchAPI();
  }, [])

  // FILTER DATA WITH CRITERIA FROM SEARCH FORM
  const filterTransactions = (items, criteria) => {
    return items.filter(item =>
      item.category.toLowerCase() === criteria.category.toLowerCase() &&
      item.description.toLowerCase().includes(criteria.description.toLowerCase())
    );
  };

  // NEED MORE TIME TO UNDERSTAND (CANNOT USE NOW)
  // const filterTransactions = (transactions, criteria) => {
  //   return transactions.filter(transaction => {
  //     let matches = true;
  //     if (criteria.category) {
  //       matches = matches && transaction.category.toLowerCase() === criteria.category.toLowerCase();
  //     }
  //     if (criteria.description) {
  //       matches = matches && transaction.description.toLowerCase().includes(criteria.description.toLowerCase());
  //     }
  //     return matches;
  //   });
  // };

  // HANDLE FUNCTION TO SEND PROPS
  const handleSearch = (criteria) => {
    const filtered = filterTransactions(rawData, criteria);
    // SORT DATA BY DATE
    const sortedCards = sortCardsByDate(filtered);
    // GROUP DATA BY DATE
    const grouped = groupCardsByDate(sortedCards);
    setCards(grouped);
  };

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className='container-3 pt-5'>
      <h3 className='cards-header' style={{textAlign: "center"}}>Find transactions</h3>
      <SearchForm onSearch={handleSearch} />
      <div className="d-flex justify-content-center ">
        { Object.keys(cards).length > 0 ?
        <h2 className='form-label'>{Object.keys(cards).length} transactions found</h2>
        : <p></p> }
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
        <Footer />
    </div>
  )
}

export default Search
