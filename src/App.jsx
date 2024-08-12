import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [toDoLists,settoDoList] = useState([])
  const fetchData = async () => {
      try {
          const todoData = await axios.get(`https://66ba6aaafa763ff550fbbd5d.mockapi.io/todolist`)
          settoDoList(todoData.data)
      } catch (error) {
          alert("Something went wrong")
      }
  }
  useEffect(() => {
      fetchData()
  },[])

  return <div className='toDoBlock'>
      <div className="container">
        <h1 className="headingTitle text-center mt-5 mb-5">My Todo</h1>
         <AddTodoForm/>

         <div className='row'>
                {
                    toDoLists.map((todoValues) => {
                        return <TodoList todoValues={todoValues} />
                    })
                }
          </div>
      </div>
       
  </div>
    
  }
  

export default App
