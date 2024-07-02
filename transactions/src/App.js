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
import PieChart from './components/Chart';
import { useLocalStorage } from "@uidotdev/usehooks";
import Search from './components/Search';

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
          <Route path="/" element={
            <DarkModeContext.Provider value={isDark}>
              <PieChart isDark={isDark}/>
            </DarkModeContext.Provider>
            }/>
          <Route path="/cards" element={
            <DarkModeContext.Provider value={isDark}>
              <Cards isDark={isDark}/>
            </DarkModeContext.Provider>}/>
          <Route path="/cards/:id" element={
            <DarkModeContext.Provider value={isDark}>
              <Card isDark={isDark}/>
            </DarkModeContext.Provider>}/>
          <Route path="/cards/new" element={
            <DarkModeContext.Provider value={isDark}>
              <NewCard isDark={isDark}/>
            </DarkModeContext.Provider>}/>
          <Route path="/cards/search" element={
            <DarkModeContext.Provider value={isDark}>
              <Search isDark={isDark}/>
            </DarkModeContext.Provider>
          }/>
        </Routes>
    </Router>
  </div>
  );
}

export default App;
