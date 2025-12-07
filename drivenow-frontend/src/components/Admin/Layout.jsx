import Navbar from "./AdminNavbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Outlet />  
      </div>
    </>
  );
}
