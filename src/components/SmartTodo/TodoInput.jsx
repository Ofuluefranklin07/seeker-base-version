import { useState, useEffect } from "react";
export default function TodoInput({ onAddTodo, editingTodo, onEditTodo  }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [editing, setEditing] = useState

  // ]
  //   useEffect(() => {
  //   if (editingTodo) {
  //     setTitle(editingTodo.title);
  //     setContent(editingTodo.content);
  //   } else {
  //     setTitle("");
  //     setContent("");
  //   }
  // }, [editingTodo]);
function addTodo(e) {
  e.preventDefault();
  if (editingTodo) {
    onEditTodo(editingTodo.id, { title, content });
  } else {
    onAddTodo({ id: Date.now(), title, content });
  
  setTitle("");
  setContent("");
}
  }
  return (
    <>
      <form className="todo-form" onSubmit={addTodo}>
        <input
          className="todo-input"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          className="todo-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
        <button className="todo-button" type="submit">
          {" "}
          Add todo
        </button>
      </form>
    </>
  )}
