"use client";
import { useState } from "react";
import {FaSearch} from 'react-icons/fa'
import {useRouter} from 'next/navigation'
import "./searchbar.scss"


const Searchbar = ({initialValue = ""}) => {
  const [input, setInput] = useState(initialValue);
  const router = useRouter();

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSearch = () => {
    router.push(`/result-page?search=${input}`)
  }

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" onClick={handleSearch}/>
      <input 
        type="text" 
        placeholder="Describe what you will be using your laptop for" 
        value={input}
        onChange={handleChange}
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