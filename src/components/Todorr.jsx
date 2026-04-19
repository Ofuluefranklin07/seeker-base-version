import { useReducer, useState } from "react";
const initialState = {
  todo: [],
  filterList: "all",
};
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todo: [...state.todo, action.payload] };
    case "TOGGLE_TODO":
      return {
        ...state,
        todo: state.todo.map((todos) =>
          todos.id === action.payload
            ? { ...todos, completed: !todos.completed }
            : todos,
        ), // you cannot mutate a reducer state directly
      };
    case "FILTER":
      return {
        ...state,
        todo: state.todo.filter((todos) => todos.id !== action.payload), // means return the one that the id is not equal to the id in payload
      };
    case "SET_FILTER":
      return { ...state, filterList: action.payload };
    default:
      return state;
  }
}
export default function Todorr() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleAdd() {
    if (!title.trim()) return;
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        completed: false,
      },
    });
    setTitle("");
    setContent("");
  }
  const getFilteredTodo = () => {
    switch (state.filterList) {
      case "active":
        return state.todo.filter((t) => !t.completed);
      case "completed":
        return state.todo.filter((t) => t.completed);
      default:
        return state.todo;
    }
  };
  const filteredTodo = getFilteredTodo();
  const ActiveCount = state.todo.filter((t) => !t.completed).length;
console.log(ActiveCount)
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "blue" }}>YOUR TODO APP</h1>
      <form style={{ marginTop: "5px" }}>
        <input
          type="text"
          placeholder="Add a title here..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          type="text"
          placeholder="Add extra details here..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleAdd}
          disabled={!title.trim()}
          style={{
            backgroundColor: title.trim() ? "#007ACC" : "#cccc",
            cursor: title.trim() ? "pointer" : "not-allowed",
          }}
        >
          ADD TODO
        </button>
      </form>
      <div style={{ display: "flex" }} className="contain">
        <button
          onClick={() => dispatch({ type: "SET_FILTER", payload: "all" })}
          style={{
            backgroundColor: state.filterList === "all" ? "#007ACC" : "#ccc",
            cursor: "pointer",
            color: state.filter === "all" ? "white" : "black",
          }}
        >
          All
        </button>
        <button
          onClick={() => dispatch({ type: "SET_FILTER", payload: "active" })}
          style={{
            padding: "8px 16px",
            backgroundColor: state.filterList === "active" ? "#cc0000" : "#eee",
            color: state.filterList === "active" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: "SET_FILTER", payload: "completed" })}
          style={{
            backgroundColor:
              state.filterList === "completed" ? "green" : "gray",
            color: state.filter === "completed" ? "white" : "black",
          }}
        >
          Completed
        </button>
      </div>
      {/* Todo list */}
      {filteredTodo.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          No todos yet. Add one above!
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredTodo.map((todos) => (
            <li
              key={todos.id}
              style={{
                padding: "16px",
                marginBottom: "12px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                border: "1px solid #eee",
                textDecoration: todos.completed ? "line-through" : "none",
                opacity: todos.completed ? 0.7 : 1,
              }}
            >
              <strong style={{ display: "block", fontSize: "18px" }}>
                {todos.title}
              </strong>
              {todos.content && (
                <p style={{ margin: "8px 0 12px", color: "#555" }}>
                  {todos.content}
                </p>
              )}
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() =>
                    dispatch({ type: "TOGGLE_TODO", payload: todos.id })
                  }
                  style={{
                    padding: "6px 12px",
                    backgroundColor: todos.completed ? "#4CAF50" : "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {todos.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "DELETE_TODO", payload: todos.id })
                  }
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Footer stats */}
      <p style={{ textAlign: "center", marginTop: "24px", color: "#555" }}>
        {ActiveCount} active item{ActiveCount !== 1 ? "s" : ""} left
      </p>
    </div>
  );
}
