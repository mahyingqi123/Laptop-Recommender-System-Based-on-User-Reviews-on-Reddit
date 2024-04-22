import { FaStar } from "react-icons/fa";
import "./card.scss";

const Card = ({ laptop }) => {
    return (
        <div className="laptop-list">
            <div key={laptop.id} className="laptop-card">
                <img src="" className="laptop-image" />
                <div className="laptop-content">
                    <div className="displayStack1">
                        <h3 className="laptopName">{laptop.name}</h3>
                        <div className="productPrice">${laptop.price}</div>
                    </div> 
                    <div className="displayStack2">
                        <div className="productRating">
                            {[...Array(laptop.rating)].map((index) => (
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