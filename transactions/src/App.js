// import logo from './logo.svg';
import React from 'react';
import './index.css';
// import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
import Cards from './components/Cards';
import Card from './components/Card';
// import App from '../src/components/App';
import NewCard from './components/NewCard';
import { createContext } from 'react';
import {Toggle} from './components/Toggle';
import './App.css'
import './Styling/Cards.css'
import Chart from './components/Chart';
import { useLocalStorage } from "@uidotdev/usehooks";

export const DarkModeContext = createContext();

const App = () => {
  const [isDark, setIsDark] = useLocalStorage("isDark", true);
  return (
    <div className='container-2' data-theme={isDark ? "dark" : ""}>
      <Toggle
      isChecked={isDark}
      handleChange={() => setIsDark(!isDark)}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Chart />}/>
          <Route path="/cards" element={<Cards />}/>
          <Route path="/cards/:id" element={<Card />}/>
          <Route path="/cards/new" element={<NewCard />}/>
        </Routes>
    </Router>
  </div>
  );
}

export default App;
