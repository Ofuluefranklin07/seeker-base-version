import TodoInput from "./components/SmartTodo/TodoInput";

import TodoList from "./components/SmartTodo/TodoList";

import { useState } from "react";

export default function Apper (){
 const [todos, setTodos] = useState ([])
 const [editingTodo, setEditingTodo] = useState(false)
 function handleAdd (todo){
    setTodos(prev => [...prev, todo])
 }
 function handleDelete (id){
    setTodos(prev => prev.filter(todo => todo.id !== id))
 }
// function handleEdit(id, updatedFields) {
//   setTodos(prev => prev.map(todo => {
//     if (todo.id === id) {
//       return { ...todo, ...updatedFields }
//     } else {
//       return todo
//     }
//   }));
//   setEditingTodo(null);


 return (<><div>
    <TodoInput onAddTodo={handleAdd} editingTodo={editingTodo} />
    <TodoList todos={todos}  onDelete={handleDelete} onEdit={handleEdit}   /> </div></>)
}