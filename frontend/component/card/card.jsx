import { FaStar } from "react-icons/fa";
import {useRouter} from 'next/navigation'
import "./card.scss";

const Card = ({ laptop }) => {
    const router = useRouter();

    const handleDetail = () => {
        router.push(`/product-page?id=${laptop.id}`)
      }

    return (
        <div className="laptop-list">
            <div key={laptop.id} className="laptop-card">
                <img src={laptop.image} className="laptops-image" />
                <div className="laptop-content">
                    <div className="displayStack1">
                        <h3 className="laptopName">{laptop.name}</h3>
                        <div className="productPrice">RM{laptop.price}</div>
                    </div> 
                    <div className="displayStack2">
                        <div className="productRating">
                            {[...Array(laptop.rating)].map((index) => (
                                <FaStar id={index+1} key = {index}/>
                            ))}
                        </div>
                        <div className="productDetail">
                            <a onClick={handleDetail}>View Details</a>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Card;