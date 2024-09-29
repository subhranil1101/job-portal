import CategoryCarousel from "./CategoryCarousel"
import HeroSection from "./HeroSection"
import Navbar from "./shared/Navbar"
import LatestJobs from "./LatestJobs"

const Home = () => {
      return (
            <div>
                  <Navbar />
                  <HeroSection />
                  <CategoryCarousel />
                  <LatestJobs />
            </div>
      )
}

export default Home
