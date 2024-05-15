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

    const handleMinPrice = (e) => {
        setMinPrice(e.target.value);
    }

    const handleMaxPrice = (e) => {
        setMaxPrice(e.target.value);
    }

    useEffect(() => {
        setMinPrice('');
        setMaxPrice('');
    }, [search]);

  return (
    <div className="filter-container">
        <input type="number" value={minPrice} onChange={handleMinPrice} placeholder="Min price" />
        -
        <input type="number" value={maxPrice} onChange={handleMaxPrice} placeholder="Max price" />
        <button className="filtter-btn" onClick={handleFilter}>Filter</button>
    </div>
  )
}

export default Filter