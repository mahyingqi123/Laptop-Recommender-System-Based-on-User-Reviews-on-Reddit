import Link from "next/link"
import "./navbar.scss"

const Navbar = () => {

  return (
    <nav className="nav"> 
      <Link href="#">Logo</Link>
      <ul>
        <li className="/"><Link href="/">Home</Link></li>
        <li><Link href="/result-page">Result</Link></li>
        <li><Link href="/product-page">Product</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar