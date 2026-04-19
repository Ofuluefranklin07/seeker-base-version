import { useState } from "react";
import TodoInput from "./components/SmartTodo/TodoInput";
import TodoList from "./components/SmartTodo/TodoList";

export default function TodoApp (){
    const [todos, setTodos] = useState([])
    
    function addTodo (todo){
        setTodos(prev => [...prev, todo])
    }
    
    function handleDelete (id){
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }
    
    return(
        <> 
            <TodoInput onAddTodo={addTodo} />
            <TodoList todos={todos} onDelete={handleDelete} />
        </>
    )
}