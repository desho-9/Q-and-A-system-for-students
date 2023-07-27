import React, { useEffect, useState } from "react";
import QuoraBox from "./QuoraBox";
import "./css/feed.css";
import Post from "./Post";
import axios from "axios";
function Feed(){
    const [Questions,setQuestions]=useState([]);
    useEffect(()=>{
        axios.get("/api/questions")
            .then((res)=>{
                console.log(res.data);
                console.log("Amit");
                setQuestions(res.data.reverse());
            })
            .catch((e)=>{
                console.log(e);
            })
    },[])
    return(
        <div className="feed">
        <QuoraBox/>
        {
            Questions.map((question,index)=> (<Post key={index} questions={question.questionName} time={question.createdAt} answers={question.allAnswers} source={question.questionUrl} id={question._id} user={question?.user}/>))
        }        
        </div>
    )
}
export default Feed;