import React from "react";
import QuoraHeader from "./QuoraHeader";
import "./css/Quora.css";
import Widget from "./Widget";
import SideBar from "./SideBar";
import Feed from "./Feed";
function Quora(){
    return(
        <div className="quora">     
<QuoraHeader/>
<div className="quora__contents">
    <div className="quora__content">
        <SideBar/>
        <Feed/>
        <Widget/>
    </div>
</div>
        </div>
        

    )
}
export default Quora;