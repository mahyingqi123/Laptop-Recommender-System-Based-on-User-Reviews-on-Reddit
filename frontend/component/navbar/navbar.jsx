"use client"
import { useState } from "react"
import "./navbar.scss"

const Navbar = () => {

  const [active, setActive] = useState("nav_menu");
  const [icon, setIcon] = useState("nav_toggler");

  const navToggle = () => {
    if (active === "nav_menu") {
      setActive("nav_menu nav_active");
    } else setActive("nav_menu");

    // Icon Toggler
    if (icon === "nav_toggler") {
      setIcon("nav_toggler toggle");
    } else setIcon("nav_toggler");
  };

  return (
    <nav className="nav"> 
      <a href="#" className="logo">Logo</a>
      <ul className={active}>
        <li className="nav_item"><a href="#" className="nav_link">Home</a></li>
        <li className="nav_item"><a href="#" className="nav_link">About Us</a></li>
        <li className="nav_item"><a href="#" className="nav_link">More</a></li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>

  )
}

export default Navbar