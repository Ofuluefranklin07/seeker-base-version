import { useState } from "react";
import StateTodoCard from "./StateTodoCard";

export default function StateTodo() {
  const [todo, setTodo] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  const handleAdd = (e) => {
    e.preventDefault();
    
    // Validation: Check if fields are empty
    if (!form.title.trim() && !form.content.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: form.title,
      content: form.content,
    };

    setTodo((prev) => [...prev, newTodo]);
    
    // Reset form
    setForm({ title: '', content: '' });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  function handledelete(id) {
    const updated = todo.filter((t) => t.id !== id);
    setTodo(updated);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>
      
      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="title"
          placeholder="Title..."
          onChange={handleOnchange}
          value={form.title}
          style={{ display: "block", marginBottom: "10px", padding: "5px" }}
        />
        
        <textarea
          rows={3}
          placeholder="Content..."
          name="content"
          onChange={handleOnchange}
          value={form.content}
          style={{ display: "block", marginBottom: "10px", padding: "5px" }}
        />
        
        {/* 
           Fixed the button: 'disable' is a boolean attribute, not a style.
           Also removed unused variable 'take' from your original code. 
        */}
        <button 
          type="submit" 
          disabled={!form.title.trim()}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          Add Todo
        </button>
      </form>

      <div className="todo-list">
        {/* 
           FIX: Changed 'todo={todo}' to 'todo={t}'. 
           In a map, 't' is the single item, 'todo' is the whole list.
           Also fixed key={t.id}
        */}
        {todo.map((t) => (
          <StateTodoCard key={t.id} todo={t} onDelete={handledelete} />
        ))}
      </div>
    </div>
  );
}
