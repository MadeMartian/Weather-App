import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
