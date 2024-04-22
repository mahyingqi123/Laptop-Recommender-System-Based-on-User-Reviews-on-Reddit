"use client";
import { useSearchParams } from "next/navigation";
import Card from "@component/card/card";
import Searchbar from "@component/searchbar/searchbar";
import "./result.scss";
import laptopData from "@component/sampleData/data";

const Result = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    return (
        <div>
            <div className="searchbar-container">
                <Searchbar initialValue={search}/>
            </div>
            <div className="result-title">Total Number of Result Found:</div>
            <div className="card-container">
            {laptopData.map((laptop) => (
                <Card laptop={laptop} />
            ))}
            </div>
        </div>
    );
    }
export default Result;