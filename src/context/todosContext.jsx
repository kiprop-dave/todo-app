import React, { createContext,useState,useEffect } from "react";
import {nanoid} from "nanoid"

const Context = createContext()

function TodosContextProvider({children}){
    const [todos, setTodos] = useState(
        ()=> JSON.parse(localStorage.getItem("todoItems"))|| [])
    const [todosCopy, setTodosCopy] = useState(
        ()=>JSON.parse(localStorage.getItem("todoItems")) || [])
    const [todo, setTodo] = useState({
        id: nanoid(),
        isCompleted: false,
        isDeleted: false,
        todoText: ""
    })


    useEffect(()=>{
        localStorage.setItem("todoItems",JSON.stringify(todos))
    },[todos])

    const [isLightMode, setIsLightMode] = useState(false)

    const backgroundClass = isLightMode ? "light-background" : "dark-background" 

    const bodyClass = isLightMode ? "body-light" : "body-dark"

    function changeBackground(){
        setIsLightMode(prev => !prev)
    }

    function handleInput(event){
        const {value, name} = event.target;
        setTodo(prev => ({
            ...prev,
            [name] : value
        }))
    }
    
    function createTodos(){
        setTodos(prev => {
            if(todo.todoText.length > 0 && todo.isDeleted === false){
                return [todo, ...prev]
            }else{
                return prev
            }
        })
        setTodosCopy(prev => {
            if(todo.todoText.length > 0 && todo.isDeleted === false){
                return [todo, ...prev]
            }else{
                return prev
            }
        })
        
        setTodo({
            id: nanoid(),
            isCompleted: false,
            isDeleted: false,
            todoText: ""
        })
    }
    
    function handleCheck(event,id){
        event.stopPropagation()
        setTodos(prev =>{
            return prev.map(item => {
                return(
                    item.id === id ?
                    {
                        ...item,
                        isCompleted: true
                    } : item
                )
            })
        })
        setTodosCopy(prev =>{
            return prev.map(item => {
                return(
                    item.id === id ?
                    {
                        ...item,
                        isCompleted: true
                    } : item
                )
            })
        })
    }

    function handleDelete(event,id){
        event.stopPropagation()
        setTodos(prev => prev.filter(item => item.id !== id))
        setTodosCopy(prev => prev.filter(item => item.id !== id))
    }

    function showCompleted(){
        const filteredFromCopy = todosCopy.filter(item => item.isCompleted === true)
        setTodos(filteredFromCopy)
    }

    function showActive(){
        const filteredFromCopy = todosCopy.filter(item => item.isCompleted === false)
        setTodos(filteredFromCopy)
    }
    
    function showAll(){
        setTodos(todosCopy)
    }

    function clearCompleted(){
        setTodos(prev => prev.filter(item => item.isCompleted === false))
        setTodosCopy(prev => prev.filter(item => item.isCompleted === false))
    }

    const values ={
        todos,backgroundClass,changeBackground,isLightMode,
        handleInput,todo,createTodos,handleCheck,handleDelete,todosCopy,
        clearCompleted,showCompleted,showActive,showAll,bodyClass
    }


    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export {TodosContextProvider, Context}