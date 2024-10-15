import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"

const category = [
      "Frontend Developer",
      "Backend Developer",
      "Graphic Designer",
      "Fullstack Developer",
      "Java Developer",
      "Data Scientist"
]
const CategoryCarousel = () => {

      const navigate = useNavigate()
      const dispatch = useDispatch()
      const searchJobHandler = (query) => {
            dispatch(setSearchedQuery(query))
            navigate("/browse")
      }
      return (
            <div>
                  <Carousel className="mx-auto w-full max-w-xl mt-16 mb-10" opts={{
                        align: "start",
                        loop: true,
                  }} >
                        <CarouselContent className="-ml-2">
                              {category.map((cat, index) => {
                                    return (
                                          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-evenly items-center ">
                                                <Button variant="outline" className="hover:bg-gray-100 font-mono font-semibold rounded-full" onClick={() => searchJobHandler(cat)}>{cat}</Button>
                                          </CarouselItem>
                                    )
                              })}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                  </Carousel>
            </div>
      )
}

export default CategoryCarousel
