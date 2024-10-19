// import { useEffect } from "react"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"


// const ProtectedRoute = ({ children }) => {
//       const { user } = useSelector(store => store.auth)
//       const navigate = useNavigate()

//       useEffect(() => {
//             if (user === null || user.role !== 'recruiter') {
//                   navigate("/")
//             }
//             // eslint-disable-next-line react-hooks/exhaustive-deps
//       }, [])
//       return (
//             <>
//                   {children}
//             </>
//       )
// }

// export default ProtectedRoute

import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, user, role }) => {
      // Check if user is authenticated and has the required role
      if (!user || user.role !== role) {
            return <Navigate to="/login" />;
      }

      // Render the child components (admin pages)
      return children;
};

export default ProtectedRoute;
