import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

const filterData = [
      {
            filterType: 'Location',
            array: ['Kolkata', 'Bangalore', 'Mumbai', 'Noida', 'Delhi', 'Pune', 'Hyderabad']
      },
      {
            filterType: 'Industry',
            array: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer']
      },
      {
            filterType: 'Salary',
            array: ['0-40K', '40k-1Lac', '1Lac-5Lac']
      }
]
const FilterCard = () => {
      return (
            <div className=" p-5">
                  <h1 className="my-2 text-center text-2xl font-semibold">Filter Jobs</h1>
                  <hr className="mt-3" />
                  <RadioGroup>
                        {
                              filterData.map((data, index) => (
                                    <div className="px-5" key={index}>
                                          <h1 className="text-xl font-bold">{data.filterType}</h1>
                                          {data.array.map((item, index) => {
                                                return (
                                                      <div className="px-1 flex gap-1 items-center text-lg py-[2px]" key={index}>
                                                            <RadioGroupItem value={item} />
                                                            <label>{item}</label>
                                                      </div>
                                                )
                                          })}
                                    </div>
                              ))
                        }
                  </RadioGroup>
            </div>
      )
}

export default FilterCard
