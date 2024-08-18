import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList({ todoValues, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(todoValues.name);
  const [newDescription, setNewDescription] = useState(todoValues.description);
  const [status, setStatus] = useState(todoValues.status || 'Not Completed');


  useEffect(() => {
    setStatus(todoValues.status || 'Not Completed');
  }, [todoValues]);
  

  const handleEdit = async () => {
    try {
      await axios.put(`https://66ba6aaafa763ff550fbbd5d.mockapi.io/todolist/${todoValues.id}`, {
        name: newName,
        description: newDescription,
        status: status, // Update status when editing
      });
      onUpdate();
      setIsEditing(false);
    } catch (error) {
      alert('Error updating todo');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://66ba6aaafa763ff550fbbd5d.mockapi.io/todolist/${todoValues.id}`);
      onUpdate();
    } catch (error) {
      alert('Error deleting todo');
    }
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      await axios.put(`https://66ba6aaafa763ff550fbbd5d.mockapi.io/todolist/${todoValues.id}`, {
        ...todoValues,
        status: newStatus,
      });
      onUpdate();
    } catch (error) {
      alert('Error updating status');
    }
  };

  return (
    <div className={`listCart d-flex flex-column justify-content-between ${status === 'Completed' ? 'completed' : ''}`}>
      <div>
        <div className="nameBlock">
          <span>Name : </span>
          {isEditing ? (
            <input className='editInput'
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          ) : (
            <span>{todoValues.name}</span>
          )}
        </div>
        <div className="mt-3 mb-3 descriptionBlock">
          <span>Description : </span>
          {isEditing ? (
            <input className='editInput'
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          ) : (
            <span>{todoValues.description}</span>
          )}
        </div>
        <div className="statusBlock d-flex">
          <span>Status :</span>
          <div className="dropdown statusDropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {status}
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" type="button" onClick={() => handleStatusChange('Not Completed')}>Not Completed</button></li>
              <li><button className="dropdown-item" type="button" onClick={() => handleStatusChange('Completed')}>Completed</button></li>
            </ul>
          </div>
        </div>
      </div>  
      <div className="buttonBlock d-flex align-items-center justify-content-end">
        {isEditing ? (
          <>
            <button className="btn btn-sm editBtn" onClick={handleEdit}>
              Save
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-sm editBtn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn btn-sm delBtn" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoList;
