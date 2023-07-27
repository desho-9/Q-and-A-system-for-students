import React from "react";
import "./css/WidgetContent.css";
function WidgetContent(){
    return(
        <div className="widget__contents">
            <div className="widget__content">
                <img src="https://cdn.pixabay.com/photo/2016/12/13/21/20/alien-1905155__340.png" className="img"/>
                <div className="widget__contentTitle">
                    <h5>Answered Questions</h5>
                    {/* <p>The best mobile app development company</p> */}
                </div>
            </div>

        </div>
    )
}
export default WidgetContent;