// import { useReducer } from "react";
// function reducer (state, action ) {

// }
// function myComponent (){
//     const[state, dispatch] = useReducer(reducer , {age: 42})

//     //action: The action performed by the user. 
//     // It can be a value of any type. By convention, an action is usually an
//     //  object with a type property identifying
//     //  it and, optionally, other properties with additional information.
//     //dispattch do not have a return value
// }



// NOTE: This file previously exported the `reducer` as the default export.
// That caused the following runtime error when used from `App.jsx`:
//   Uncaught TypeError: Cannot read properties of undefined (reading 'type')
// Explanation of the bug:
// - `App.jsx` imports the default export and renders it as a component: <UseReducer />
// - If the default export is the reducer function (signature: (state, action)),
//   React will call it as a component: reducer(props). In that call the second
//   parameter (`action`) is undefined, so `action.type` throws the error.
// Fix applied here:
// - Make `reducer` a plain (local) function, and export the React component
//   (`Form`) as the default export so `import UseReducer from "./components/UseReducer"`
//   returns a component React can render.
// Tip: If you need the reducer in other files, export it as a named export:
//   export { reducer } // then import { reducer } from './components/UseReducer'
// or keep component default and add: export { reducer } at the bottom.
import { useReducer } from 'react';

// Reducer function used with React's useReducer hook. Signature must be
// (state, action) where `action` is an object that by convention contains
// a `type` field identifying the action.
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

const initialState = { name: 'Taylor', age: 42 };

 function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }

  function handleInputChange(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    }); 
  }

  return (
    <>
      <input
        value={state.name}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>
        Increment age
      </button>
      <p>Hello, {state.name}. You are {state.age}.</p>
    </>
  );
}

  export default Form;

  // Quick debugging checklist when you see "reading 'type' of undefined":
  // - Check the stack trace: which function is failing? If it's your reducer,
  //   confirm the function is being called with (state, action).
  // - Verify exports/imports: ensure you didn't accidentally import the reducer
  //   where a component was expected (or vice-versa).
  // - Ensure all `dispatch(...)` calls pass an object with a `type` field,
  //   e.g. `dispatch({ type: 'incremented_age' })`.






//   import { useReducer } from 'react';

// const initialState = { count: 0 };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 };
//     case 'decrement':
//       return { count: state.count - 1 };
//     case 'reset':
//       return { count: 0 };
//     case 'double':
//       return { count: state.count * 2 };
//     default:
//       throw new Error('Unknown action');
//   }
// }

// function Counter() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <div>
//       <p>Count: {state.count}</p>
//       <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
//       <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
//       <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
//       <button onClick={() => dispatch({ type: 'double' })}>Double</button>
//     </div>
//   );
// }






// const initialState = { name: '', email: '', age: '' };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'updateField':
//       return { ...state, [action.field]: action.value };
//     case 'reset':
//       return initialState;
//     default:
//       return state;
//   }
// }

// function UserForm() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const handleChange = (field) => (e) => {
//     dispatch({ type: 'updateField', field, value: e.target.value });
//   };

//   return (
//     <div>
//       <input placeholder="Name" value={state.name} onChange={handleChange('name')} />
//       <input placeholder="Email" value={state.email} onChange={handleChange('email')} />
//       <input placeholder="Age" type="number" value={state.age} onChange={handleChange('age')} />
//       <button onClick={() => dispatch({ type: 'reset' })}>Reset Form</button>
//       <p>Current: {JSON.stringify(state)}</p>
//     </div>
//   );
// }



// const initialState = {
//   likes: 0,
//   views: 0,
//   shares: 0,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return { ...state, [action.field]: state[action.field] + 1 };
//     case 'decrement':
//       return { ...state, [action.field]: state[action.field] - 1 };
//     case 'boost':
//       return { ...state, [action.field]: state[action.field] + 10 };
//     case 'reset':
//       return initialState;
//     default:
//       return state;
//   }
// }

// function CounterDashboard() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const total = state.likes + state.views + state.shares;

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>Likes: {state.likes} <button onClick={() => dispatch({ type: 'increment', field: 'likes' })}>+</button> <button onClick={() => dispatch({ type: 'boost', field: 'likes' })}>Boost</button></p>
//       <p>Views: {state.views} {/* Add buttons similarly */}</p>
//       <p>Shares: {state.shares} {/* Add buttons */}</p>
//       <p>Total Engagements: {total}</p>
//       <button onClick={() => dispatch({ type: 'reset' })}>Reset All</button>
//     </div>
//   );
// }