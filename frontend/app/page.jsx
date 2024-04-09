import Searchbar from "@component/searchbar/searchbar"

const Home = () => {
  return (
    <section className="home">
        <h1>
            Find Your Perfect Laptop Match
        </h1>
        <p>
            Discover the best laptops tailored for your needs
        </p>
        
        <Searchbar />
    </section>
  )
}

export default Home