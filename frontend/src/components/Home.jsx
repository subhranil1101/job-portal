import CategoryCarousel from "./CategoryCarousel"
import HeroSection from "./HeroSection"
import Navbar from "./shared/Navbar"
import LatestJobs from "./LatestJobs"
import Footer from "./shared/Footer"
import useGetAllJobs from "@/hooks/useGetAllJobs"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Home = () => {
      const { user } = useSelector(store => store.auth)
      const navigate = useNavigate()
      useGetAllJobs()
      useEffect(() => {
            if (user?.role === 'recruiter') {
                  navigate("/admin/companies")
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

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
