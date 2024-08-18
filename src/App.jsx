import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [toDoLists, setToDoList] = useState([]);
  const [filter, setFilter] = useState('All'); 

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const todoData = await axios.get('https://66ba6aaafa763ff550fbbd5d.mockapi.io/todolist');
      setToDoList(todoData.data);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // Fetch data on pafe load
  useEffect(() => {
    fetchData();
  }, []);

  // Callback function to update todo list
  const handleAddTodo = async () => {
    await fetchData();
  };

  // Filter todos based on the selected filter
  const filteredToDoLists = toDoLists.filter(todo => {
    if (filter === 'All') return true;
    return todo.status === filter;
  });

  return (
    <div className='toDoBlock'>
      <div className="container">
        <h1 className="headingTitle text-center mt-5 mb-5">My Todo</h1>
        <AddTodoForm onAddTodo={handleAddTodo} />

        <div className="mb-4 d-flex justify-content-end">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Filter: {filter}
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" type="button" onClick={() => setFilter('All')}>All</button></li>
              <li><button className="dropdown-item" type="button" onClick={() => setFilter('Completed')}>Completed</button></li>
              <li><button className="dropdown-item" type="button" onClick={() => setFilter('Not Completed')}>Not Completed</button></li>
            </ul>
          </div>
        </div>

        <div className='row justify-content-center'>
          {filteredToDoLists.map((todoValues) => (
            <TodoList onUpdate={fetchData} key={todoValues.id} todoValues={todoValues} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
