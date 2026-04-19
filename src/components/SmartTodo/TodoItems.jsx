import { useState } from "react";

export default function TodoItems ({ todo, onDelete}) {
    if (!todo) return null;
    const [isEditing, setIsEditing] = useState (false)
  
    
    return(
      <div className="todo-item">
        <h1 className="todo-title">{todo.title}</h1>
        <p className="todo-content">{todo.content}</p>
        <button onClick={() => onDelete(todo.id)} className="todo-button"> Delete</button>
        <button onClick={() => setIsEditing(!isEditing) && onEdit(todo.id) }></button>

      </div>
    )
}