// import logo from './logo.svg';
import React from 'react';
import './index.css';
// import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Cards from './components/Cards';
import Card from './components/Card';
// import App from '../src/components/App';
import NewCard from './components/NewCard';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cards" element={<Cards />}/>
        <Route path="/cards/:id" element={<Card />}/>
        <Route path="/cards/new" element={<NewCard />}/>
      </Routes>
  </Router>
  );
}

export default App;
