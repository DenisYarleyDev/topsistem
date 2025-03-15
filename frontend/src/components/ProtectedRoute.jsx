import { Navigate } from "react-router-dom";

//FRONT COMPONENT PROTECTED ROUTES
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
