import CategoryCarousel from "./CategoryCarousel"
import HeroSection from "./HeroSection"
import Navbar from "./shared/Navbar"
import LatestJobs from "./LatestJobs"
import Footer from "./shared/Footer"

const Home = () => {
      return (
            <div>
                  <Navbar />
                  <HeroSection />
                  <CategoryCarousel />
                  <LatestJobs />
                  <Footer />
            </div>
      )
}

export default Home
