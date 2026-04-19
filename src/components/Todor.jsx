import { useReducer, useState } from 'react';

const initialState = {
  todos: [],          // Array of { id: number, title: string, content: string, completed: boolean }
  filter: 'all',      // 'all' | 'active' | 'completed'
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]  // i don't uunderstand why they included the action.payloa dthe array if data
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed } // i don't understand this line of !todo.completed
            : todo
        ),
      };
      //👉 copy everything in todo
 //but replace only completed
// you can use.map to run a function across a list of items

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload), // explain this statement
      };
      //Remove the todo that was clicked and keep all the others.
      // return the ones that their todo.id was not equal to the action.payload
      // this is wrong state.todos = newTodos;
      //. map modifies an item but teh filter removes it




    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,  
      };

    default:
      return state;
  }
}

export default function Todor() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Transient form state (not managed by reducer — common best practice)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return; // Title is required

    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        completed: false, // we added completed boolean state in teh code so that we can banle to detect and xhange for filter
      },
    });

    setTitle('');
    setContent('');
  };

  // Derived filtered list
  const getFilteredTodos = () => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter((t) => !t.completed); // removes the one that are completed
      case 'completed':
        return state.todos.filter((t) => t.completed);
      default:
        return state.todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const activeCount = state.todos.filter((t) => !t.completed).length;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#007ACC' }}>My Todo Notes App</h1>

      {/* Form */}
      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title (required)"
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Details / notes / content (optional)..."
          rows={3}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            resize: 'vertical',
          }}
        />
        <button
          onClick={handleAdd}
          disabled={!title.trim()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: title.trim() ? '#007ACC' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: title.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Add Todo
        </button>
      </div>

      {/* Filter buttons */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
          style={{
            padding: '8px 16px',
            backgroundColor: state.filter === 'all' ? '#007ACC' : '#eee',
            color: state.filter === 'all' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          All
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
          style={{
            padding: '8px 16px',
            backgroundColor: state.filter === 'active' ? '#007ACC' : '#eee',
            color: state.filter === 'active' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
          style={{
            padding: '8px 16px',
            backgroundColor: state.filter === 'completed' ? '#007ACC' : '#eee',
            color: state.filter === 'completed' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Completed
        </button>
      </div>

      {/* Todo list */}
      {filteredTodos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No todos yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                padding: '16px',
                marginBottom: '12px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #eee',
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.7 : 1,
              }}
            >
              <strong style={{ display: 'block', fontSize: '18px' }}>{todo.title}</strong>
              {todo.content && (
                <p style={{ margin: '8px 0 12px', color: '#555' }}>{todo.content}</p>
              )}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: todo.completed ? '#4CAF50' : '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
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
      <p style={{ textAlign: 'center', marginTop: '24px', color: '#555' }}>
        {activeCount} active item{activeCount !== 1 ? 's' : ''} left
      </p>
    </div>
  );
}

// MY QUESTIONS: WHY CAN'T WE BULD THIS USING USESTATE
//WHAT DOES ACTION.PAYLOD MEANS


//Project 	Key Extra Requirement
// Advanced Quiz App	Timer logic (using setInterval and useEffect).
// E-commerce Cart	Persistent storage (e.g., localStorage) so the cart survives a page refresh.
// Multi-Step Form	Validation logic for each individual step before allowing the user to move "Next".
// Trello Clone	Drag-and-drop libraries (e.g., dnd-kit or react-beautiful-dnd).