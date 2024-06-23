import React from 'react';
import Footer from './Footer'
import '../Styling/Styling.css'
import { useContext, useEffect, useState } from 'react';
import {DarkModeContext} from '../App'
// import '../Styling/Home.css'
import '../Styling/Cards.css';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

function Home() {
  // DEFINE DARKMODE FROM APP.JS
  const DarkMode = useContext(DarkModeContext);
  const API_URL = 'http://localhost:3000/api/v1/cards';

  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  // GROUP BY MONTH
  const filterByMonth = (data) => {
    return data.filter( item => {
      const today = new Date();
      const itemDate = new Date(item.date)
      return itemDate.getMonth() === today.getMonth()
      }
    )
  }

  // GROUP BY CATEGORY
  const groupCardsByCategory = (cards) => {
    return cards.reduce((grouped, card) => {
      const category = card.category;
      if (!grouped[category]) {
        grouped[category] = 0;
      }
      grouped[category] += card.amount;
      return grouped;
    }, {});
  };

  // PIE CHART

  // FETCH DATA FROM API
  // useEffect(() => {
  //   fetchCards();
  // }, []);


  // const fetchCards = async () => {
  //   try {
  //     const response = await axios.get(API_URL);
  //     // Group by month
  //     const data = filterByMonth(response.data);

  //     // // Group cards by category
  //     const grouped = groupCardsByCategory(data);
  //     // console.log(grouped)
  //     setCards(grouped);
  //     console.log(cards);
  //   }
  //   catch (error) {
  //     setError('Error fetching card');
  //     console.error('Error fetching and grouping cards:', error);
  //   }
  // };


  return (
    <>
      <div className='container-3' data-theme={ DarkMode ? "dark" : ""}>
        <div className="d-flex justify-content-center ">
          <h1 className='cards-header'>Welcome to Tracker</h1>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home
