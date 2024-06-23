import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../Styling/Styling.css'
import '../Styling/newCard.css'
import { DarkModeContext } from '../App';

const NewCard = () => {
    const isDark = useContext(DarkModeContext);
    // SET UP CARD WITH EMPTY VALUES
    const [card, setCard] = useState({
        category: '',
        amount: '',
        description: '',
        date: ''
    });

    // USED TO NAVIGATE BETWEEN PAGES
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(e.target)
        setCard(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // POST ACTION WITH AXIOS
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/v1/cards', card);
            console.log('Success:', response.data);

            setCard({
                category: '',
                amount: '',
                description: '',
                date: ''
            });

            navigate('/cards');
        }
        catch (error) {
            console.error('Error:', error);
        }

    };

    return (
      <>
        <div className='container-3' data-theme={isDark ? "dark" : ""}>
          <div className="d-flex justify-content-center">
            <h1 className='cards-header'>NEW TRANSACTION HERE</h1>
          </div>
          <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
              <div className='d-flex justify-content-between align-items-center form-div'>
                  <label className='form-label '>Category:</label>
                  <select
                      name="category"
                      value={card.category}
                      onChange={handleChange}
                      required
                      className='form-input'
                  >
                  <option value="">Select a category</option>
                  <option value="shopping">Shopping</option>
                  <option value="transportation">Transportation</option>
                  <option value="groceries">Groceries</option>
                  <option value="utilities">Utilities</option>
                  <option value="health">Health</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="others">Others</option>
                  </select>
              </div>
              <div className='d-flex justify-content-between align-items-center form-div'>
                  <label className='form-label'>Amount:</label>
                  <input
                      type="number"
                      name="amount"
                      value={card.amount}
                      onChange={handleChange}
                      required
                      className='form-input'
                  />
              </div>
              <div className='d-flex justify-content-between align-items-center form-div'>
                  <label className='form-label'>Description:</label>
                  <input
                      type="text"
                      name="description"
                      value={card.description}
                      onChange={handleChange}
                      required
                      className='form-input'
                  />
              </div>
              <div className='d-flex justify-content-between align-items-center form-div'>
                  <label className='form-label'>Date:</label>
                  <input
                      type="date"
                      name="date"
                      value={card.date}
                      onChange={handleChange}
                      required
                      className='form-input'
                  />
              </div>
              <button type="submit" className='form-btn'>ADD NEW TRANSACTION</button>
          </form>
        </div>
        <Footer />
      </>
    );
};

export default NewCard;
