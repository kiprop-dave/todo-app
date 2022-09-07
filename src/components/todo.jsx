import React,{useContext, useState} from "react";
import { Context } from "../context/todosContext";
import checkIcon from "../assets/icon-check.svg"
import crossIcon from "../assets/icon-cross.svg"


export default function Todo({todo}){
    const [isHovered, setIsHovered] = useState(false)

    const {todoText,id,isCompleted} = todo
    
    const {backgroundClass,handleCheck,handleDelete,isLightMode} = useContext(Context)

    function getBackgroundCheck(){
        if(isCompleted){
            return "#3a7bfd"
        }else if(isLightMode && !isCompleted){
            return "#fafafa"
        }else if(!isLightMode && !isCompleted){
            return "hsl(235, 24%, 19%)"
        }else{
            return "#3a7bfd"
        }
    }
    
    const checkLight ={
        backgrounColor:  isCompleted ? "white" : "hsl(220, 98%, 61%)"
    }

    const checkDark = {
        backgroundColor: isCompleted ? "hsl(220, 98%, 61%)" : "hsl(235, 24%, 19%)"
        // backgrounColor: getBackgroundCheck()
        // backgroundColor:  isCompleted ? "hsl(220, 98%, 61%)" : "#fafafa"
    }
    const crossStyles ={
        backgroundImage: `url(${crossIcon})`
    }
    const textStyle ={
        textDecoration: isCompleted ? "line-through" : "none" ,
        opacity: isCompleted ? "0.5" : "1" ,
        fontSize: "12px"
    }


    return(
        <>
            <div className={`todo ${backgroundClass}`}
                onMouseEnter={()=> setIsHovered(true)}
                onMouseLeave={()=> setIsHovered(false)}>
                <div className={`circle-icon check-icon`}
                onClick={(e)=>handleCheck(e,id)} style={checkDark}>
                    {
                        isCompleted && 
                        <img src={checkIcon} alt="" />
                    }
                </div>
                <div className="todo-text" style={textStyle}>{todoText}</div>
                <div className="circle-icon cross-icon mobile"></div>
                {
                    isHovered &&
                    <div className="circle-icon cross-icon" style={crossStyles}
                    onClick={(e)=>handleDelete(e,id)}></div>
                }
            </div>
            <hr style={{width: "100%",height:"0.1px"}}/>
        </>
    )
}