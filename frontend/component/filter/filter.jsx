'use client';
import { useState, useEffect } from "react";
import "./filter.scss";

import React from 'react'

const Filter = ({onFilter, search}) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleFilter = () => {
        onFilter(minPrice, maxPrice);
    }

    useEffect(() => {
        setMinPrice('');
        setMaxPrice('');
    }, [search]);

  return (
    <div className="filter-container">
        <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min price" />
        -
        <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max price" />
        <button className="filtter-btn" onClick={handleFilter}>Filter</button>
    </div>
  )
}

export default Filter