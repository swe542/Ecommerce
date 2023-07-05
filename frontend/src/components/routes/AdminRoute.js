import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import CenterSpinner from "../common/CenterSpinner";
export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/auth/admin-auth",
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false);
      } finally {
        setLoading(false); // Set loading state to false after the request is complete
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  if (loading) {
    return <CenterSpinner path="" />; // Render CenterSpinner while loading
  }

  return ok ? <Outlet /> : <CenterSpinner path="" />;
}

// export default function AdminRoute() {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuth();
//   console.log("ress");
//   useEffect(() => {
//     const authCheck = async () => {
//       const res = await axios.get(
//         "http://localhost:8000/api/v1/auth/admin-auth",
//         {
//           headers: {
//             Authorization: auth?.token,
//           },
//         }
//       );

//       if (res.data.ok) {
//         setOk(true);
//       } else {
//         setOk(false);
//       }
//     };
//     if (auth?.token) authCheck();
//   }, [auth?.token]);
//   return ok ? <Outlet /> : <CenterSpinner path="" />;
// }
