import React, {useContext} from "react";
import desktopDark from "../assets/bg-desktop-dark.jpg"
import desktopLight from "../assets/bg-desktop-light.jpg"
import { Context } from "../context/todosContext";
import Navbar from "../components/navbar";
import NewTodo from "../components/newToDo";
import Todos from "../components/todos";


export default function MainPage(){
    const {isLightMode} = useContext(Context)

    const styles = {
        backgroundImage: isLightMode ? `url(${desktopLight})` : `url(${desktopDark})`
    }
    

    return(
        <div className="app-page">
            <div className="background-pic" style={styles}></div>
            <div className="todo-page">
                <Navbar/>
                <NewTodo/>
                <Todos/>
            </div>
        </div>
    )
}