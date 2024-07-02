import React, { useState } from 'react';
import '../Styling/Search.css';
import '../Styling/newCard.css'


const SearchForm = ({ onSearch }) => {
  const [criteria, setCriteria] = useState({ description: '', category: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(criteria);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria({
      ...criteria,
      [name]: value.trim(), // Trim whitespace from input value
    });
    // console.log(criteria)
  };

  return (
    <form onSubmit={handleSubmit} className='search-form'>
      <div className='d-flex justify-content-center'>
        <input
          type="text"
          name="description"
          placeholder="Search by description"
          value={criteria.description}
          onChange={handleChange}
          className='description-input'
        />
      </div>
      <div className='d-flex justify-content-between mb-3'>
        <label className='search-label form-label'>Category:</label>
        <select
          name="category"
          value={criteria.category}
          onChange={handleChange}
          className='search-category-input'
        >
          <option value="">Pick your category</option>
          <option value="groceries">Groceries</option>
          <option value="shopping">Shopping</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
          <option value="transportation">Transportation</option>
          <option value="health">health</option>
          <option value="others">Others</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div className="d-flex justify-content-center">
        <button type="submit" className='search-form-btn'>SEARCH</button>
      </div>
    </form>
  );
};

export default SearchForm;
