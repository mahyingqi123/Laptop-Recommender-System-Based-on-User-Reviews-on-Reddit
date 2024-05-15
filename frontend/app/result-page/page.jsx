"use client";
import { useSearchParams } from "next/navigation";
import Card from "@component/card/card";
import Searchbar from "@component/searchbar/searchbar";
import "./result.scss";
import { useEffect, useState} from "react";
import axios from 'axios';
import Filter from "@component/filter/filter";

const Result = () => {
    const searchParams = useSearchParams();
    const [laptopData, setLaptop] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultCount, setResultCount] = useState(0);
    const [sortOption, setSortOption] = useState('');
    const [originalData, setOriginalData] = useState([]);

    const apiURL = "http://127.0.0.1:5000";

    const handleFilter = (minPrice, maxPrice) => {
        if (!minPrice || !maxPrice) {
            alert('minPrice and maxPrice must not be empty');
            setLaptop(originalData);
            return;
        }
        if (minPrice > maxPrice) {
            alert('minPrice must be smaller than maxPrice');
            setLaptop(originalData);
            return;
        }

        setLoading(true);
        axios.get(`${apiURL}/filter_price?max=${maxPrice}&min=${minPrice}`)
        .then(response => {
            setLaptop(response.data);
            setResultCount(response.data.length);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            setLoading(false);
        });
    }

    useEffect(() => {
        let data = [...originalData];
        switch(sortOption) {
          case 'priceHigh':
            data = data.sort((a, b) => b.price - a.price);
            break;
          case 'priceLow':
            data = data.sort((a, b) => a.price - b.price);
            break;
          case 'scoreHigh':
            data = data.sort((a, b) => b.score - a.score);
            break;
          case 'scoreLow':
            data = data.sort((a, b) => a.score - b.score);
            break;
          default:
            break;
        }
        setLaptop(data);
      }, [sortOption, originalData]);

    useEffect(() => {
        const searchTerm = searchParams.get('search');
        setLoading(true);
        setResultCount(0);
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiURL}/search_result?query=${searchTerm}`);
                let data = response.data;
                setLoading(false);
                setLaptop(data);
                setOriginalData(data);
                setResultCount(data.length);
            }
            catch (error) {
                console.log(error);
            }
        }
        if(searchTerm){
            fetchData();
        }
    }
    , [searchParams]);

    return (
        <div>
            <div className="toolbar">
                <div className="searchbar-container">
                    <Searchbar initialValue={searchParams.get('search')}/>
                </div>
                <div className="filter-container">
                    <Filter onFilter={handleFilter} search={searchParams.get('search')}/>
                </div>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="dropselect">
                    <option value="">Sort by</option>
                    <option value="priceHigh">Price High</option>
                    <option value="priceLow">Price Low</option>
                    <option value="scoreHigh">Score High</option>
                    <option value="scoreLow">Score Low</option>
                </select>
                
            </div>
            <div className="result-title">Total Number of Laptop Found: {resultCount}</div>
            <div className="card-container">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    Object.values(laptopData).map((laptop) => (
                        <Card key={laptop.id} laptop={laptop} />
                    ))
                )}
            </div>
        </div>
    );
    }
export default Result;