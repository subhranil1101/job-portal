import { useSelector } from "react-redux";
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LatestJobCard = ({ job }) => {
      const navigate = useNavigate()
      const { user } = useSelector((state) => state.auth);

      const handleCardClick = () => {
            if (user) {
                  navigate(`/jobs/description/${job._id}`);
            } else {
                  toast.error("Please login first to view the job details");
                  navigate("/login");
            }
      };

      return (
            <div onClick={handleCardClick} className="hover:scale-105 transition-transform duration-300 ease-in-out p-5 cursor-pointer rounded-xl shadow-xl shadow-slate-500 hover:shadow-blue-200 border border-slate-600 text-xl">
                  <div>
                        <h1 className="text-2xl font-semibold">{job?.company?.name}</h1>
                        <p className="text-base text-gray-600">india</p>
                  </div>
                  <div>
                        <h1 className="text-lg font-bold my-2">{job?.title}</h1>
                        <p className="text-base font-serif italic text-slate-500">{job?.description}</p>
                  </div>
                  <div className="flex gap-3 justify-center pt-3">
                        <Badge variant='ghost' className='text-blue-700 font-bold text-sm'>{job?.position} position</Badge>
                        <Badge variant='ghost' className='text-green-500 font-bold text-sm'>{job?.jobType}</Badge>
                        <Badge variant='ghost' className='text-red-600 font-bold text-sm'>{job?.salary}LPA</Badge>
                  </div>
            </div>
      )
}

export default LatestJobCard
