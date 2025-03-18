import { Outlet } from "react-router-dom";
import MenuSide from "./MenuSide.jsx";

export default function Layout() {
  return (
    <div className="w-full min-h-screen flex flex-row bg-white">
      <MenuSide />
      <Outlet />
    </div>
  );
}
