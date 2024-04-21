import Card from "@component/card/card";
import Searchbar from "@component/searchbar/searchbar";
const Result = () => {
    return (
        <div>
            <Searchbar />
            <div className="result-title">Total Number of Result Found:</div>
            <Card />
        </div>
    );
    }
export default Result;