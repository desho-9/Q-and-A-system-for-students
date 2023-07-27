import React, { useState } from "react";
import Quora from "./Quora";
import Logo from "./logo.gif";
import Home from "@material-ui/icons/Home";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import AssignmentTurnedInOutlined from "@material-ui/icons/AssignmentTurnedInOutlined";
import Close from "@material-ui/icons/Close";
import PeopleAltOutlined from "@material-ui/icons/PeopleAltOutlined";
import ExpandMore from "@material-ui/icons/ExpandMore";
import NotificationsOutlined from "@material-ui/icons/NotificationsOutlined";
import Search from "@material-ui/icons/Search";
import Modal from "react-responsive-modal";
import { Avatar, Button, Input } from "@material-ui/core";
import "react-responsive-modal/styles.css";
import "./css/QuoraHeader.css";
import axios from "axios";
import {auth} from "./auth/firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
function QuoraHeader(){
    const [isModalOpen,SetIsModalOpen]=useState(false);
    const [inputUrl,SetInputUrl]=useState("");
    const [question,setQuestion]=useState("");
    const close=(<Close/>);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const handleSubmit=async ()=>{
       console.log("Hello world");
       if(question!==""){
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body={
        user:user,
       questionName:question,
       questionUrl:inputUrl
        }
        await axios.post("/api/questions",body,config).then((res)=>{
            console.log(res.data);
            alert(res.data.message);
        }).catch((e)=>{
            console.log(e);
            alert("Error in adding question");
        })
       }
    }
    const handleLogout=()=>{
        if (window.confirm("Are you sure to logout ?")) {
            signOut(auth)
              .then(() => {
                dispatch(logout());
                console.log("Logged out");
              })
              .catch(() => {
                console.log("error in logout");
              });
          }
    }
    return(
        <div>
         <div className="qHeader">
            <div className="qHeader-content">
                <div className="qHeader__logo">
                    <img src={Logo}/>
                </div>
                <div className="qHeader__icons">
                    <div className="qHeader__icon"><Home/></div>
                    <div className="qHeader__icon"><FeaturedPlayListIcon/></div>
                    <div className="qHeader__icon"><AssignmentTurnedInOutlined/></div>
                    <div className="qHeader__icon"><PeopleAltOutlined/></div>
                    <div className="qHeader__icon"><NotificationsOutlined/></div>
                </div>
                <div className="qHeader__input">
                    <Search/>
                    <input type="text" placeholder="Search Questions"/>
                </div>
                <div className="qHeader__Rem">
                  <span onClick={handleLogout}> <Avatar src={user?.photo} /></span> 
                </div>
                <Button onClick={()=> SetIsModalOpen(true)}>Add Question</Button>
                <Modal open={isModalOpen} closeIcon={close} onClose={()=> SetIsModalOpen(false)} closeOnEsc center closeOnOverlayClick={false} styles={{overlay:{
                    height:"auto"
                }}}>
                    <div className="modal__title">
                        <h5>Add Question</h5>
                        <h5>Share Link</h5>
                    </div>
                    <div className="modal__info">
                        <Avatar className="avatar"/>
                        <div className="modal__scope">
                            <PeopleAltOutlined/>
                            <p>Public</p>
                            <ExpandMore/>

                        </div>
                    </div>
                    <div className="modal__field">
                        <Input
                        onClick={handleSubmit}
                        defaultValue={question}
                        
                        onChange={e=>setQuestion(e.target.value)}
                        type="text" 
                        placeholder="Start your Question with What, How , Why"/>
                        <div style={{
                            display:"flex",
                            flexDirection:"column"
                        }}>
                            <input 
                            style={{
                                margin:"5px 0",
                                border:"1px solid lightgray",
                                padding:"10px",
                                outline:"2px solid black"

                            }}
                            type="text"
                             placeholder="optional, include a link that gives context"
                            value={inputUrl}
                            onChange={(e)=>{
                                SetInputUrl(e.target.value);
                            }}
                            />
                            {
                                inputUrl!=="" &&  <img src={inputUrl} alt="display Images" style={{
                                    height:"40vh" ,
                                    objectFit:"contain"
                                }}/>
                            }
                           
                        </div>
                    </div>
                    <div className="modal__buttons">
                    <button className="cancle" onClick={()=> SetIsModalOpen(false)}>Cancel</button>
                        <button onClick={handleSubmit} type="submit" className="add" >
                            Add Question
                        </button>
                    </div>
                </Modal>

            </div>
            <div></div>
         </div>
        </div>
    )
}
export default QuoraHeader;