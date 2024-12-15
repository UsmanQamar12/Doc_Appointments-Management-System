import React from "react";
import "../styles/LayoutStyles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // console.log("User data:", user);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // Define menus with specific paths for Appointments
  const doctorMenu = [
    { name: "Home", path: "/", icon: "fa-solid fa-house" },
    { name: "Appointments", path: "/doctor-appointments", icon: "fa-solid fa-list" },
    { name: "Profile", path: `/doctor/profile/${user?._id}`, icon: "fa-solid fa-user" },
  ];

  const userMenu = [
    { name: "Home", path: "/", icon: "fa-solid fa-house" },
    { name: "Appointments", path: "/appointments", icon: "fa-solid fa-list" },
    { name: "Apply Doctor", path: "/apply-doctor", icon: "fa-solid fa-user-doctor" },
    { name: "Profile", path: `/doctor/profile/${user?._id}`, icon: "fa-solid fa-user" },
  ];

  const adminMenu = [
    { name: "Home", path: "/", icon: "fa-solid fa-house" },
    { name: "Doctors", path: "/admin/doctors", icon: "fa-solid fa-user-doctor" },
    { name: "Users", path: "/admin/users", icon: "fa-solid fa-user" },
  ];

  // Render menu list based on user role
  let SidebarMenu;
  if (user?.isAdmin) {
    SidebarMenu = adminMenu;
    console.log("Rendering admin menu");
  } else if (user?.isDoctor) {
    SidebarMenu = doctorMenu;
    console.log("Rendering doctor menu");
  } else {
    SidebarMenu = userMenu;
    console.log("Rendering user menu");
  }

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>DOCTOR APP<hr /></h6>
          </div>
          <div className="menu">
            {SidebarMenu.map((menu, index) => (
              <div key={index} className={`menu-item ${location.pathname === menu.path ? "active" : ""}`}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            ))}
            <div className="menu-item" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content" style={{ cursor: "pointer" }}>
              <Badge
                count={user?.notification ? user.notification.length : 0}
                onClick={() => navigate("/notification")}
              >
                <i className="fa-solid fa-bell"></i>
              </Badge>
              <Link to="/profile">{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
