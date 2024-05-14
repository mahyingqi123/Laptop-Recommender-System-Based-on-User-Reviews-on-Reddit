import Searchbar from "@component/searchbar/searchbar"

const Home = () => {
  return (
    <section className="home">
        <h1>
            Find Your Perfect Laptop Match
            <br />
            <span>
              Discover the best laptops tailored for your needs
            </span>
        </h1>
        <div className="search-bar-container">
          <Searchbar />
        </div>
    </section>
  )
}

export default Home