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
import { Pie, Bar } from 'react-chartjs-2';

function PieChart() {
  // DEFINE DARKMODE FROM APP.JS
  const DarkMode = useContext(DarkModeContext);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [cardsByMonth, setCardsByMonth] = useState([]);

  // SORT DATA BY MONTH (CURRENT MONTH)
  const sortedByMonth = (data) => {
    return data.filter( item => {
      const today = new Date();
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === today.getMonth()
    }
    )
  }

  // SORT DATA BY MONTH THEN BY CATEGORY IN THAT MONTH
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

  const groupCardsByMonth = (cards) => {
    return cards.reduce((grouped, card) => {
      const date = new Date(card.date);
      const month = date.getMonth();
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December'
      ];
      const monthName = monthNames[month];
      if (!grouped[monthName]) {
        grouped[monthName] = 0;
      }
      grouped[monthName] += card.amount;
      return grouped;
    }, {})
  }

  // FETCH DATA
  useEffect(() => {
    sortCards();
  }, []);


  const sortCards = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/cards");

      const sortedMonth = sortedByMonth(response.data);
      const groupedCardsByMonth = groupCardsByMonth(response.data);
      setCardsByMonth(groupedCardsByMonth);
      const groupByCategory = groupCardsByCategory(sortedMonth);
      setCards(groupByCategory);
    }
    catch (error) {
      setError('Error during fetching cards');
      console.log('Error fetching and summing', error);
    }
  }


  // PIE CHART(LABEL OF CATEGORIES AND COLOR)
  const labels = Object.keys(cards)
  const dataSet = Object.values(cards);
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'SPENDING BY CATEGORIES',
        color: 'grey',
        font: {
            weight: 'bold',
            size: 20
        }
    },
      legend: {
        position: 'bottom',
        labels: {
          color: DarkMode ? "rgb(255,255,255,0.5)" : "rbga(255,255,255,0.5)",
        },
      },
    },
  };


  // SET DATA OF PIE CHART
  const data = {
    labels: labels,
    datasets: [{
      label:"Amount",
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

  // BAR CHART SET-UP
  const labelsBarChart = Object.keys(cardsByMonth);
  const dataSetBarChart = Object.values(cardsByMonth);
  const optionsBar = {
    plugins: {
      title: {
        display: true,
        text: 'MONTHLY SPENDING',
        color: 'grey',
        font: {
            weight: 'bold',
            size: 20
        }
    }
    },
  };
  const dataBarChart = {
    labels: labelsBarChart,
    datasets: [{
      label:"AUD",
      data: dataSetBarChart,
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
        <div>
          <div className="mt-3">
            <Pie data={data} options={options}/>
          </div>
          <div className="mt-3">
            <Bar data={dataBarChart} options={optionsBar}/>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default PieChart
