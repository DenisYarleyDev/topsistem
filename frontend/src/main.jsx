import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Home from "./pages/Home.jsx";
import CadUser from "./pages/CadUser.jsx";
import Layout from "./components/Layout.jsx";
import Sellers from "./pages/Sellers.jsx";
import Products from "./pages/Products.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "cad-user",
        element: <CadUser />,
      },
      {
        path: "sellers",
        element: <Sellers />,
      },
      {
        path: "products",
        element: <Products />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
