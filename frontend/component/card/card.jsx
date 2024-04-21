import { FaStar } from "react-icons/fa";
import "./card.scss";

const Card = ({ laptop }) => {
    return (
        <div className="laptop-list">
            <div className="laptop-card">
                <img src={laptop} alt={laptop} className="laptop-image" />
                <div className="laptop-content">
                    <div className="displayStack1">
                        <h3 className="laptopName">Laptop Name</h3>
                        <div className="productPrice">${laptop}</div>
                    </div> 
                    <div className="displayStack2">
                        <div className="productRating">
                            {[...Array(5)].map((index) => (
                                <FaStar id={index+1} key = {index}/>
                            ))}
                        </div>
                        <div className="productDetail">View Details</div>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Card;