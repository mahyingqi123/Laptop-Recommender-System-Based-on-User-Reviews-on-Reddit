"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import "./product.scss";
import { FaStar } from "react-icons/fa";
import BackButton from "@component/backbutton/backbutton";

const Product = () => {
    const effectRun = useRef(false);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [laptopData, setLaptop] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiURL = "http://127.0.0.1:5000";

    useEffect(() => {
        setLoading(true);
        if(effectRun.current === false) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${apiURL}/search_laptop_by_id?query=${id}`);
                    const data = response.data;
                    setLoading(false);
                    setLaptop(data);
                    console.log(data);
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
    , [id]);

    return (
        <div className="product-page">
            <div className="back-button-container">
                <BackButton />
            </div>
            <div className="product-layout">
                <div className="product-image">
                    <img src={laptopData.image} alt="Product" className="laptop-image"/>
                </div>
                <div className="product-details">
                    <h2>{laptopData.name}</h2>
                    <div className="productRating">
                        {[...Array(5)].map((index) => (
                            <FaStar id={index+1} key = {index}/>
                        ))}
                    </div>
                    <h3>RM{laptopData.price}</h3>
                    <p>Laptop Detail</p>                   
                </div>
            </div>
        </div>
    )
}

export default Product;