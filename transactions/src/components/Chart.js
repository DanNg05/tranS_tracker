import React from 'react';
import Footer from './Footer'
import '../Styling/Styling.css'
import { useContext, useEffect, useState } from 'react';
import {DarkModeContext} from '../App'
// import '../Styling/Home.css'
import '../Styling/Cards.css';
import axios from 'axios';
// import { Chart as ChartJS } from 'chart.js/auto';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

function PieChart() {
  // DEFINE DARKMODE FROM APP.JS
  const DarkMode = useContext(DarkModeContext);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  const sortedByMonth = (data) => {
    return data.filter( item => {
      const today = new Date();
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === today.getMonth()
    }
    )
  }

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

  useEffect(() => {
    sortCards();
  }, []);


  const sortCards = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/cards");

      const sortedMonth = sortedByMonth(response.data);

      const groupByCategory = groupCardsByCategory(sortedMonth);
      console.log(groupByCategory);
      setCards(groupByCategory);
    }
    catch (error) {
      setError('Error during fetching cards');
      console.log('Error fetching and summing', error);
    }
  }


  // PIE CHART
  const labels = ['Shopping', 'Transportation', 'Groceries', 'Utilities', 'Health', 'Others']
  const dataSet = Object.values(cards);
  const options = {
    plugins: {
      legend: {
        labels: {
          color: DarkMode ? "white" : "black",
        },
      },
    },
  };
  console.log(DarkMode)
  const data = {
    labels: labels,
    datasets: [{
      label:"Categories",
      data: dataSet,
      backgroundColor: [
        'rgba(255, 0, 0, 0.8)',
        'rgba(255, 165, 0, 0.8)',
        'rgba(255, 255, 0, 0.8)',
        'rgba(0, 128, 0, 0.8)',
        'rgba(0, 0, 255, 0.8)',
        'rgba(75, 0, 130, 0.8)'
    ],
    borderColor: [
      'rgba(255, 0, 0, 0.8)',
      'rgba(255, 165, 0, 0.8)',
      'rgba(255, 255, 0, 0.8)',
      'rgba(0, 128, 0, 0.8)',
      'rgba(0, 0, 255, 0.8)',
      'rgba(75, 0, 130, 0.8)'
  ],
      hoverOffset: 4
    }]
  }
  if (error) {
    return <div>{error}</div>;
  }

  if (!cards) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className='container-3' data-theme={ DarkMode ? "dark" : ""}>
        <div className="d-flex justify-content-center ">
          <h1 className='cards-header'>Welcome to Tracker 1</h1>
        </div>
        <div>
        <Pie data={data} options={options}/>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default PieChart
