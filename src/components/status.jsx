import React, {useContext} from "react"
import { Context } from "../context/todosContext"


export default function StatusBar(){

    const {todos,clearCompleted,showCompleted,showActive,showAll,backgroundClass} = useContext(Context)
    const plural = todos.length === 1 ? "" : "s"

    const unfinished = todos.filter(item => item.isCompleted === false)

    const allStyle ={
        color: "hsl(220, 98%, 61%)"
    }

    return(
        <div className="status-container">
            <div className="items-left">
                <span>{unfinished.length} {`item${plural}`} left</span>
            </div>
            <div className={`filter-items ${backgroundClass}`}>
                <span onClick={showAll} style={allStyle}>All</span>
                <span onClick={showActive} className="light">Active</span>
                <span onClick={showCompleted} className="light">Completed</span>
            </div>
            <div className="clear" onClick={clearCompleted}>
                <span>Clear Completed</span>
            </div>
        </div>
    )
}