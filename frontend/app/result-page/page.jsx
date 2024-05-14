"use client";
import { useSearchParams } from "next/navigation";
import Card from "@component/card/card";
import Searchbar from "@component/searchbar/searchbar";
import "./result.scss";
import { useEffect, useState} from "react";
import axios from 'axios';

const Result = () => {
    const searchParams = useSearchParams();
    const [laptopData, setLaptop] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultCount, setResultCount] = useState(0);


    const apiURL = "http://127.0.0.1:5000";

    useEffect(() => {
        const searchTerm = searchParams.get('search');
        setLoading(true);
        setResultCount(0);
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiURL}/search_result?query=${searchTerm}`);
                const data = response.data;
                setLoading(false);
                setLaptop(data);
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
            <div className="searchbar-container">
                <Searchbar initialValue={searchParams.get('search')}/>
            </div>
            <div className="result-title">Total Number of Result Found: {resultCount}</div>
            <div className="card-container">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    Object.values(laptopData).map((laptop) => (
                        <Card laptop={laptop} />
                    ))
                )}
            </div>
        </div>
    );
    }
export default Result;