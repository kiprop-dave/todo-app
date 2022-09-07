import React, {useContext} from "react";
import { Context } from "../context/todosContext";


export default function NewTodo(){
    const {handleInput, todo,backgroundClass,
    createTodos} = useContext(Context)

    return(
        <div className={`newtodo ${backgroundClass}`}>
            <div className="circle-icon"></div>
            <input 
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