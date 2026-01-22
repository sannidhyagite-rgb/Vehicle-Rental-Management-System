import { Outlet } from "react-router-dom";
import React from "react";
import AdminNavbar from "../components/Admin/AdminNavbar/Navbar";

        const AdminLayout = () => {
            return (
                <> 
                <AdminNavbar/>
                <Outlet/>
                </>
            )
        }
    export default AdminLayout;