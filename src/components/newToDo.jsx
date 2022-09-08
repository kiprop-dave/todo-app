import React, {useContext} from "react";
import { Context } from "../context/todosContext";


export default function NewTodo(){
    const {handleInput, todo,backgroundClass,
    createTodos} = useContext(Context)


    //Allows the user to press enter and create a new todo item
    const keyDownHandler = (event) =>{
        if(event.key === 'Enter'){
            event.preventDefault()
            createTodos()
        }
    }

    return(
        <div className={`newtodo ${backgroundClass}`}>
            <div className="circle-icon"></div>
            <input 
            onKeyUp={(e) => keyDownHandler(e)}
            className={`todo-input ${backgroundClass}`}
            type="text" 
            name="todoText" 
            placeholder="Create a new todo..."
            value={todo.todoText}
            onChange ={handleInput} />
            <div className="add-icon" onClick={()=> createTodos()}></div>
        </div>
    )
}