import React from 'react';

export default function StateTodoCard({ todo, onDelete }) {
   function handledelete (){
        onDelete(todo.id)
    }
  return (
    <div 
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9"
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>{todo.title}</h3>
      <p style={{ margin: "0", color: "#555" }}>{todo.content}</p>
      <button onClick={handledelete}>Delete</button>
    </div>
  );
}