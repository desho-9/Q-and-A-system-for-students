import { Avatar } from "@material-ui/core";
import {React,useState} from "react";
import "./css/Post.css";
import ArrowDownwardOutlined from "@material-ui/icons/ArrowDownwardOutlined";
import ArrowUpwardOutlined from "@material-ui/icons/ArrowUpwardOutlined";
import RepeatOutlined from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlined from "@material-ui/icons/ChatBubbleOutlined";
import ShareOutlined from "@material-ui/icons/ShareOutlined";
import Close from "@material-ui/icons/Close";
import ReactQuill from "react-quill";
import MoreHorizOutlined from "@material-ui/icons/MoreHorizOutlined";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from 'react-time-ago'
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import {  selectUser } from "../feature/userSlice";
import {  useSelector } from "react-redux";
function LastSeen({ Date }) {
  return (
    <div>
       <ReactTimeAgo date={Date} locale="en-US" timeStyle="round"/>
    </div>
  )
}


function Post(props){
    const user = useSelector(selectUser);
    const handleQuill=(value)=>{
        SetAnswer(value);
        console.log(value);
        }
    const  handleSubmit= async ()=>{
        const config={
            header:{
                "Content-Type":"application/json"
            }
        }
        const body={
            user:user,
            questionId:props.id,
            answer:answer
        }
        if(props.id&&answer!=""){
            await axios.post("/api/answers",body,config).then((res)=>{
                console.log(res.data);
                alert("Answer added successfully");
                window.location.href="/"
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
    const [isModalOpen,SetIsModalOpen]=useState(false)
    const [answer,SetAnswer]=useState("");
    const close=(<Close/>);

    return(
        <div className="post">
<div className="post__info">
    <Avatar src={props?.user?.photo}/>
    <h4>{props?.user?.userName}</h4>
    <small><LastSeen Date={props.time}/></small>
</div>
<div className="post__body">
    <div className="post__question">
    <p>
      {props.questions}
    </p>
    <button className="post__btnAnswer" onClick={()=>SetIsModalOpen(true)}>Answer</button>
    <Modal 
    open={isModalOpen} closeIcon={close} onClose={()=> SetIsModalOpen(false)} closeOnEsc center closeOnOverlayClick={false} styles={{overlay:{
        height:"auto"
    }}}
    >
        <div className="modal__question">
            <h1>{props.questions}</h1>
            <p>asked by {" "} <span className="name">{user?.userName}</span> {" "} on {" "} <span className="name">{new Date(props.time).toLocaleString()}</span> </p> 
        </div>
        <div className="modal__answer">
            <ReactQuill onChange={handleQuill} placeholder="Enter your answer" value={answer}/>
        </div>
        <div className="modal__button">
        <button className="cancle" onClick={()=> SetIsModalOpen(false)}>Cancel</button>
                        <button type="submit" className="add" onClick={handleSubmit} >
                            Add Answer
                        </button>
        </div>
    </Modal>
    </div>
    {
        props.source!=="" && <img src={props.source} alt="img"/>
    }
</div>
<div className="post__footer">
    <div className="post__footerAction">
        <ArrowUpwardOutlined/>
        <ArrowDownwardOutlined/>
    </div>
    <RepeatOutlined/>
    <ChatBubbleOutlined/>
    <div className="post__footerLeft">
        <ShareOutlined/>
        <MoreHorizOutlined/>
    </div>
</div>
<p style={{
    color:"rgba(0,0,0,0.5)",
    fontSize:"12px",
    fontWeight:"bold",
    margin:"10px 0"
}}> {props.answers.length} Answers</p>
    {props.answers.map((_a)=>(
            <>
<div style={{margin:"5px 0px 0px 0px", padding:"5px 0px 0px 0px",borderTop:"1px solid lightgrey"}} className="post__answer">

    
    
 <div style={{display:"flex",flexDirection:"column",width:"100%",padding:"10px 5px", borderTop:"1px solid lightgray"}}className="post-answer-container">
 <div  style={{alignItems:"center",display:"flex",marginBottom:"10px",fontSize:"12px",fontWeight:600,color:"#888" }} className="post-answered">
     <Avatar src={_a?.user?.photo}/>
     <div className="post-info" style={{
         margin:"0px, 10px"
     }}>
         <p>{_a?.user?.userName}</p>
         <span><LastSeen Date={_a.createdAt}/></span>
     </div>
 </div>
 <div className="post-answer">{ReactHtmlParser(_a.answer)} Hi</div>
</div>
</div>
</>
    ))}
   

        </div>
    )
}
export default Post;