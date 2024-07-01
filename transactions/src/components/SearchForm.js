import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          placeholder="Search by description"
          value={criteria.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={criteria.category}
          onChange={handleChange}
        >
          <option value="groceries">Groceries</option>
          <option value="food">Shopping</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
          <option value="transportation">Transportation</option>
          <option value="health">health</option>
          <option value="others">Others</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
