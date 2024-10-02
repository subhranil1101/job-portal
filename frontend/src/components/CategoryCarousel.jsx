import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

const category = [
      "Frontend Developer",
      "Backend Developer",
      "Graphic Designer",
      "Fullstack Developer",
      "Java Developer",
      "Data Scientist"
]
const CategoryCarousel = () => {
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
                                                <Button variant="outline" className="hover:bg-gray-100 font-mono font-semibold rounded-full">{cat}</Button>
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
