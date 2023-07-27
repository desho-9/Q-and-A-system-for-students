import React from "react";
import SideBarOptions from "./SideBarOptions";
import "./css/SideBar.css";
function SideBar(){
    return(
        <div className="sidebar">
        <SideBarOptions/>
        </div>
    )
}
export default SideBar;