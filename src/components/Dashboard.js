import React, { useContext } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import AuthContext from "./auth/auth-context";
import logo from "../images/school-logo.jpg"


const Dashboard = () => {
    const authCtx = useContext(AuthContext);

    if (authCtx.isLoggedIn === false) {
        return <Navigate to="/login" />;
    }

    const logOut = () => {
        authCtx.logout();
    }

    const activeStyles = ({ isActive }) => {
        const linkClasses = ['w3-bar-item w3-button'];
        if (isActive) linkClasses.push('w3-teal');
        return linkClasses.join(" ");
    }

    return (
        <>
            <nav className="w3-sidebar w3-bar-block w3-collapse w3-animate-left w3-card-2" style={{ 'zIndex': 3, 'width': '250px' }} id="mySidebar">
                <img src={logo} className="logo" alt="School Logo" />
                <NavLink to="/" className={activeStyles}> <i className="w3-medium fa fa-home"></i>  Home</NavLink>
                
                <NavLink to="/add-students" className={activeStyles}> <i className="w3-medium fa fa-plus"></i>  Add New Students</NavLink>
                <NavLink to="/students" className={activeStyles}> <i className="w3-medium fa fa-user"></i>  Students List</NavLink>
                
                <NavLink to="/add-courses" className={activeStyles}> <i className="w3-medium fa fa-plus"></i>  Add New Courses</NavLink>
                <NavLink to="/courses" className={activeStyles}> <i className="w3-medium fa fa-user"></i>  Courses List</NavLink>
                
                <NavLink to="/add-results" className={activeStyles}> <i className="w3-medium fa fa-plus"></i>  Add New Results</NavLink>
                <NavLink to="/results" className={activeStyles}> <i className="w3-medium fa fa-user"></i>  Results List</NavLink>
                
                <NavLink to="/login" className={activeStyles} onClick={logOut}><i className="w3-medium fa fa-sign-out"></i>  Logout</NavLink>
            </nav>
            <div className="w3-main" style={{ 'marginLeft': '250px' }}>
                <div className="w3-container">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Dashboard;

