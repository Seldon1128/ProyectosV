import {Header} from "./components/Header"
import {Tabs} from "./components/Tabs"
import {TodoList} from "./components/TodoList"
import {TodoInput} from "./components/TodoInput"
import Auth from "./components/Auth"
import { useCookies } from "react-cookie"

import {useState, useEffect} from 'react'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [todos, setTodos] = useState([])

  const getData = async () => {
    try{
      const response = await fetch('http://localhost:5005/todos', {
            headers: { 'Authorization': authToken }
        })
      const todosData = await response.json()
      setTodos(todosData)
      console.log(todosData)
    }catch (err){
      console.error(err)
    }
  }

  const[selectedTab, setSelectedTab] = useState('Open')

  const handleAddTodo = async (newTodo) => {
    try{
      const response = await fetch(`http://localhost:5005/todos`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken  
        },
        body: JSON.stringify({task: newTodo})
      })
      if (response.ok){
        console.log('WORKED')
        getData()
      }
    }catch(err){
      console.error(err)
    }

  }

  const handleCompleteTodo = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:5005/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken  
        },
        body: JSON.stringify({ completed: true }) 
      })

      if (response.ok) {
        getData() 
      } else {
        console.error('Error al marcar como completado')
      }
    } catch (err) {
      console.error('Error en fetch:', err)
    }
  }

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:5005/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken  
        }
      })
      if (response.ok){
        getData()
      } else {
        console.error('Error al eliminar')
      }
    } catch (err){
       console.error('Error en fetch:', err)
    }
  }

  useEffect(() => {
    if(authToken){
      getData()
    }},[authToken])


  return (
      <div>
        {!authToken && <Auth/>}
        {authToken &&
          <>
            <Header todos={todos}/>
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos}/>
            <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos}/>
            <TodoInput handleAddTodo={handleAddTodo}/>
          </>
        }
      </div>
  )
}

export default App
