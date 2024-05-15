"use client";
import React from 'react'
import { useEffect, useState, useRef } from "react";
import './modal.scss'
import Comment from '@component/comment/comment'
import axios from 'axios';
import { BiSolidCommentDetail, BiSolidUpvote } from "react-icons/bi";


const Modal = ({open, onClose, laptopID}) => {
  const effectRun = useRef(false);
  const [id, setId] = useState(laptopID);
  const [laptopData, setLaptop] = useState([]);
  const defaultImage = "/images/No_Image_Available.jpg";

  const apiURL = "http://127.0.0.1:5000";

  useEffect(() => {
    if(open && effectRun.current === false) {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiURL}/search_laptop_by_id?query=${id}`);
                const data = response.data;
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
  , [id, open]);

  if (!open) return null

  return (
    <div className='overlay'>
      <div className='modal-container'>
        <div className='modal-header'>
          <p onClick={onClose} className='closeBtn' >
            &times;
          </p>
        </div>
        <div className="modal-contain">
          <div className="modal-image">
            <img className='lapImage' src={laptopData.image || defaultImage}/>
          </div>
          <div className="product-overall">
            <h2>{laptopData.name}</h2>
            <div className="productRating">
              <div className="rating"> 
                <h3>{Math.round(laptopData.score)}%
                <span>    </span>     
                <BiSolidUpvote/>
                <span>{laptopData.total_upvotes}</span>
                </h3>
              </div>
            </div>
            <h3>RM{laptopData.price}</h3>
            <h3 style={{color:'royalblue'}}>Laptop Detail</h3>
            <div className="product-details">
              <p>Processor: {laptopData?.laptop_details?.Processor || 'N/A'}</p>
              <p>GPU: {laptopData?.laptop_details?.GPU || 'N/A'}</p>
              <p>RAM: {laptopData?.laptop_details?.RAM || 'N/A'}</p>
              <p>Storage(SSD): {laptopData?.laptop_details?.SSD || 'N/A'}</p>
              <p>Storage(HDD): {laptopData?.laptop_details?.HDD || 'N/A'}</p>
              <p>Display Size: {laptopData?.laptop_details?.['Display Size'] || 'N/A'}</p>
              <p>Display Type: {laptopData?.laptop_details?.['Display Type'] || 'N/A'}</p>
              <p>Weight: {laptopData?.laptop_details?.Weight || 'N/A'}</p>
              <p>Dimension: {laptopData?.laptop_details?.Dimension || 'N/A'}</p>
              <p>Colors: {laptopData?.laptop_details?.Colors || 'N/A'}</p>
              <p>Operating System: {laptopData?.laptop_details?.OS || 'N/A'}</p>
              <p>Warranty: {laptopData?.laptop_details?.Warranty || 'N/A'}</p>
              <p>Battery: {laptopData?.laptop_details?.['Battery Capacity'] || 'N/A'}</p>
              <p>Power Adapter: {laptopData?.laptop_details?.['Power Adapter'] || 'N/A'}</p>
              <p>Max Clock Speed: {laptopData?.laptop_details?.['Max Clock Speed'] || 'N/A'}</p>
              <p>Clock Speed: {laptopData?.laptop_details?.['Clock Speed'] || 'N/A'}</p>
              <p>Ports: {laptopData?.laptop_details?.['IO Ports'] || 'N/A'}</p>
              <p>Bluetooth: {laptopData?.laptop_details?.Bluetooth || 'N/A'}</p>
              <p>WIFI: {laptopData?.laptop_details?.WIFI || 'N/A'}</p>
              <p>Camera: {laptopData?.laptop_details?.Camera || 'N/A'}</p>
              <p>Touch Screen: {laptopData?.laptop_details?.['Touch Screen'] || 'N/A'}</p>
              <p>Keyboard: {laptopData?.laptop_details?.Keyboard || 'N/A'}</p>
              <p>Touch Pad: {laptopData?.laptop_details?.Touchpad || 'N/A'}</p>
              <p>Mic: {laptopData?.laptop_details?.Mic || 'N/A'}</p>
              <p>Speaker: {laptopData?.laptop_details?.Speaker || 'N/A'}</p>
              <p>Cooling System: {laptopData?.laptop_details?.Cooling || 'N/A'}</p>
              <p>Product Link: <a className='url' href={laptopData?.laptop_details?.url || '#'} target='_blank'>Click Here</a></p>
            </div>
            <div className='comment-container'>
              <h3 style={{color:'royalblue'}}>Comments    <BiSolidCommentDetail /><span> {laptopData.total_comments}</span></h3>
              <Comment comments={laptopData.comments}/>
            </div>
            </div>  
          </div>            
        </div>
      </div>
  )
}
export default Modal
