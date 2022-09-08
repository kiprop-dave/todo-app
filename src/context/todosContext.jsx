import React, { createContext,useState,useEffect, useRef} from "react";
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

    //drag items

    //save reference for dragItem and dragOverItem
    const dragItem = useRef(null)
    const dragOverItem = useRef(null)

    //handle drag sorting
    const handleSort =() =>{
        //duplicate items
        const _todos = [...todosCopy]

        //remove and save the dragged item Content
        const draggedItemContent = _todos.splice(dragItem.current, 1)[0]

        //switch positions
        _todos.splice(dragOverItem.current,0,draggedItemContent)

        //reset the position ref
        dragItem.current = null;
        dragOverItem.current = null;

        //update the array
        setTodos(_todos)
        setTodosCopy(_todos)
    }

    const values ={
        todos,backgroundClass,changeBackground,isLightMode,
        handleInput,todo,createTodos,handleCheck,handleDelete,todosCopy,
        clearCompleted,showCompleted,showActive,showAll,bodyClass,dragItem,
        dragOverItem,handleSort
    }


    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export {TodosContextProvider, Context}