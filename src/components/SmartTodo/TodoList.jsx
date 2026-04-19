import "./style.css";
import TodoItems from "./TodoItems";
export default function TodoList({ todos, onDelete, onEdit }) {

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItems key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
