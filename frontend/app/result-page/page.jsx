"use client";
import { useSearchParams } from "next/navigation";
import Card from "@component/card/card";
import Searchbar from "@component/searchbar/searchbar";
import "./result.scss";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';

const Result = () => {
    const effectRun = useRef(false);
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const [laptopData, setLaptop] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiURL = "http://127.0.0.1:5000";

    useEffect(() => {
        setLoading(true);
        if(effectRun.current === false) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${apiURL}/search_result?query=${search}`);
                    const data = response.data;
                    setLoading(false);
                    setLaptop(data);
                }
                catch (error) {
                    console.log(error);
                }
            }
            fetchData();
            return () => {
                effectRun.current = true;
            }
        }
    }
    , [search]);

    return (
        <div>
            <div className="searchbar-container">
                <Searchbar initialValue={search}/>
            </div>
            <div className="result-title">Total Number of Result Found:</div>
            <div className="card-container">
            {loading ? (
                <div>Loading...</div>
            ) : (
                Object.values(laptopData).map((laptop) => (
                    console.log(laptop),
                    <Card laptop={laptop} />
                ))
            )}
            </div>
        </div>
    );
    }
export default Result;