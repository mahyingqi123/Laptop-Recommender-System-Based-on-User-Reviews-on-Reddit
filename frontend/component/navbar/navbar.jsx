import Link from "next/link"
import "./navbar.scss"

const Navbar = () => {

  return (
    <nav className="nav"> 
      <Link href="/"><img src="/icons/logo.png" alt="Logo" className="logo"/></Link>
      <ul>
        <li className="/"><Link href="/">Home</Link></li>
        <li><Link href="/about-page">About Us</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar