import React, {useContext} from "react";
import { Context } from "../context/todosContext";
import Todo from "./todo";
import StatusBar from "./status";


export default function Todos(){
    const {todos,backgroundClass} = useContext(Context)

   

    const todoElements = todos.map((thistodo,index) =>(
        <Todo key={index} todo={thistodo} />
    ))
    return(
        <div className={`todos-container ${backgroundClass}`}>
            <div className={`topcorner `}></div>
            {todoElements}
            <StatusBar/>
            <div className="bottomcorner"></div>
        </div>
    )
}