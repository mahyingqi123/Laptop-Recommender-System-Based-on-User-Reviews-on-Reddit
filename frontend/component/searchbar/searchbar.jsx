"use client";
import { useState } from "react";
import {FaSearch} from 'react-icons/fa'
import "./searchbar.scss"


const Searchbar = () => {
  const [input, setInput] = useState("");
  const handleChange = (value) => {
    setInput(value);
  }

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon"/>
      <input 
        type="text" 
        placeholder="Describe what you will be using your laptop for" 
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

export default Searchbar