import "./product.scss";
import { FaStar } from "react-icons/fa";

const Product = () => {
    return (
        <div className="product-page">
            <div className="product-layout">
                <div className="product-image">
                    <img src="" alt="Product" />
                </div>
                <div className="product-details">
                    <h2>Product Name</h2>
                    <div className="productRating">
                        {[...Array(5)].map((index) => (
                            <FaStar id={index+1} key = {index}/>
                        ))}
                    </div>
                    <h3>$Product Price</h3>
                    <p>Product Description</p>                   
                </div>
            </div>
        </div>
    )
}

export default Product;