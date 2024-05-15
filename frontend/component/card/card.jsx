"use client";
import { useState } from "react";
import Modal from "@component/modal/modal";
import "./card.scss";
import { Button } from "@headlessui/react";
import { BiSolidCommentDetail, BiSolidUpvote } from "react-icons/bi";

const Card = ({ laptop }) => {
    const [openModal, setOpenModal] = useState(false);
    const defaultImage = "/images/No_Image_Available.jpg";

    return (
    <div>
        <div className="laptop-list">
            <div key={laptop.id} className="laptop-card">
                <img src={laptop.image || defaultImage} className="laptops-image"/>
                <div className="laptop-content">
                    <h3 className="laptopName">{laptop.name}</h3>
                    <h3 className="laptop-price">RM{laptop.price}</h3>
                    <div className="displayStack2">
                        <div className="productRating">
                            <div className="rating"> {Math.round(laptop.score)}% </div>
                        </div>
                        <div className="interaction">
                            <BiSolidCommentDetail/>
                            <span>{laptop.total_comments}</span> {/* Replace with your actual data */}
                        </div>
                        <div className="interaction">
                            <BiSolidUpvote />
                            <span>{laptop.total_upvotes}</span> {/* Replace with your actual data */}
                        </div>
                        <div className="productDetail">
                            <Button className='detailBtn' onClick={()=> setOpenModal(true)}>View Details</Button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <Modal open={openModal} onClose={()=> setOpenModal(false)} laptopID={laptop.id}/>
    </div>
    );
}

export default Card;