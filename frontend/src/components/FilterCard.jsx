import { useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
import { XIcon } from "lucide-react"

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
      const [selectedValue, setSelectedValue] = useState("")
      const dispatch = useDispatch()

      const changeHandler = (value) => {
            setSelectedValue(value)
      }

      const clearFilter = () => {
            setSelectedValue("")
      }


      useEffect(() => {
            dispatch(setSearchedQuery(selectedValue))
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [selectedValue])

      return (
            <div className="px-5 py-2">
                  <h1 className="my-2 text-center text-2xl font-semibold">Filter Jobs</h1>
                  <hr className="mt-3" />
                  <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                        {
                              filterData.map((data, index) => (
                                    <div className="px-5" key={index}>
                                          <h1 className="text-xl font-bold">{data.filterType}</h1>
                                          {data.array.map((item, idx) => {
                                                const itemId = `r${item}-${idx}`
                                                return (
                                                      <div className="px-1 flex gap-1 items-center text-lg py-[2px]" key={index}>
                                                            <RadioGroupItem value={item} id={itemId} />
                                                            <label htmlFor={itemId}>{item}</label>
                                                      </div>
                                                )
                                          })}
                                    </div>
                              ))
                        }
                  </RadioGroup>
                  <span onClick={clearFilter} className="cursor-pointer flex items-center  w-fit mx-auto mt-2 text-blue-950 font-medium">
                        <XIcon />Clear Filter
                  </span>
            </div>
      )
}

export default FilterCard
