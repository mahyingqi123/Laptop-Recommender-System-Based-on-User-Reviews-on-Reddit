"use client";
import { useState } from "react";
import {FaSearch} from 'react-icons/fa'
import {useRouter} from 'next/navigation'
import "./searchbar.scss"


const Searchbar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleChange = (value) => {
    setInput(value);
  }

  const handleSearch = () => {
    router.push(`/result-page?query=${input}`)
  }

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" onClick={handleSearch}/>
      <input 
        type="text" 
        placeholder="Describe what you will be using your laptop for" 
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
    </div>
  )
}

export default Searchbar