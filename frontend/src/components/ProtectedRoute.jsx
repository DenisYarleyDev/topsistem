import { Navigate } from "react-router-dom";

//FRONT COMPONENT PROTECTED ROUTES
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  //desativar se quer acessar paginas protegidas por token
  // if (!token) {
  //   return <Navigate to={"/"} />;
  // } else {
  //   return children;
  // }
  return children;
}
