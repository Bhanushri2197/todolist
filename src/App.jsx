import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [toDoLists, setToDoList] = useState([]);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const todoData = await axios.get('https://66ba6aaafa763ff550fbbd5d.mockapi.io/todolist');
      setToDoList(todoData.data);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Callback function to update todo list
  const handleAddTodo = async () => {
    await fetchData();
  };

  return (
    <div className='toDoBlock'>
      <div className="container">
        <h1 className="headingTitle text-center mt-5 mb-5">My Todo</h1>
        <AddTodoForm onAddTodo={handleAddTodo} />

        <div className='row justify-content-center'>
          {toDoLists.map((todoValues) => (
            <TodoList  onUpdate={fetchData} key={todoValues.id} todoValues={todoValues} />
          ))}
        </div>
      </div>
       
    </div>
  );
}

export default App;
