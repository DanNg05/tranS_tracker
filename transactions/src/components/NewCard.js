import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../Styling/Styling.css'


const NewCard = () => {
    const [card, setCard] = useState({
        category: '',
        amount: '',
        description: '',
        date: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(e.target)
        setCard(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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
        <div>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Category:</label>
                  <select
                      name="category"
                      value={card.category}
                      onChange={handleChange}
                      required
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
              <div>
                  <label>Amount:</label>
                  <input
                      type="number"
                      name="amount"
                      value={card.amount}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div>
                  <label>Description:</label>
                  <input
                      type="text"
                      name="description"
                      value={card.description}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div>
                  <label>Date:</label>
                  <input
                      type="date"
                      name="date"
                      value={card.date}
                      onChange={handleChange}
                      required
                  />
              </div>
              <button type="submit">Add Card</button>
          </form>
        </div>
        <Footer />
      </>
    );
};

export default NewCard;
