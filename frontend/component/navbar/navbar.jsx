import "./navbar.scss"

const Navbar = () => {

  return (
    <nav className="nav"> 
      <a href="#">Logo</a>
      <ul>
        <li className=""><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">More</a></li>
      </ul>
    </nav>

  )
}

export default Navbar