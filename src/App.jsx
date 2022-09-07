import React ,{useContext, useEffect}from 'react'
import './App.css'
import MainPage from './pages/mainPage'
import { Context } from './context/todosContext'


function App() {
  const {bodyClass} = useContext(Context)

  useEffect(()  => { //This effect adds a dynamic styling to the body
    document.body.classList.add(bodyClass);

    return () => {
        document.body.classList.remove(bodyClass);
    };
  },[bodyClass]);

  return(
    <>
      <MainPage/>
    </>
  )
}

export default App
