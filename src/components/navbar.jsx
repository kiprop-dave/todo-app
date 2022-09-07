import React, {useContext} from "react";
import { Context } from "../context/todosContext";
import moon from "../assets/icon-moon.svg"
import sun from "../assets/icon-sun.svg"

export default function Navbar(){
    const {isLightMode, changeBackground} = useContext(Context)
    return(
        <nav >
            <h1 className="title">TODO</h1>
            <div className="toggletheme" onClick={changeBackground}>
                <img src={isLightMode ? moon : sun} alt="" />
            </div>
        </nav>
    )
}