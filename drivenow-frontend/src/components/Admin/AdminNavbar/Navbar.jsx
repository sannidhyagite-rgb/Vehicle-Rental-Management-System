import "./Navbar.css"
import { NavLink } from "react-router-dom";


function Navbar(){
     const styles = {
    link: {
      textDecoration: "none",
      color: "inherit"
    }
  };
   return(
        <nav className="navbar">
            <div className="logo">🚗 DriveNow</div>
    
            <ul className="nav-menu">
              <div className="navlist">
              <NavLink to="/" style={styles.link} className={({isActive}) => isActive ? "active" : ""}>
               Dashboard
              </NavLink>
              <NavLink to="/users" style={styles.link} className={({isActive}) => isActive ? "active" : ""}>
               Users
              </NavLink>
              <li>Vehicles</li>
              <li>Bookings</li>
              <li>Reports</li>
              <li>Complaints</li>
              </div>
            </ul>
    
            <div className="profile-section">
              <span>👤 Admin User</span>
             <button type="button" className="btn btn-outline-danger">Logout</button>
            </div>
          </nav>
   )
          
}

export default Navbar;