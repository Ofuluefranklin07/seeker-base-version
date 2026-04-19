// import { useReducer } from "react";
// const initialState = {count: 10}
// function reducer (state, action){
// switch (action.type){
//     case 'INCREMENT':
//         return{count: state.count + 1}
//         case 'DECREMENT':
//             return{count: state.count - 1}
//             case 'RESET':
//                 return{count: 0}
//                 case 'SQUARE':
//                     return{count: state.count * state.count}
//                     default:
//                         return state
// }
// }
// export default function Reducer (){
//     const [state, dispatch] = useReducer(reducer, initialState)
//     return(<><div className="container">
//         <h1>Count {state.count}</h1>
//         <button onClick={() => dispatch({type: 'INCREMENT'})}>
//             ADD</button>
//                <button onClick={() => dispatch({type: 'DECREMENT'})}>
//             SUBTRACT</button>
//                <button onClick={() => dispatch({type: 'RESET'})}>
//             RESET</button>
//                <button onClick={() => dispatch({type: 'DIVISION'})}>
//             DIVIDE</button>
//             </div></>)

// }

// import { useReducer } from 'react';

// // Reducer function used with React's useReducer hook. Signature must be
// // (state, action) where `action` is an object that by convention contains
// // a `type` field identifying the action.
// function reducer(state, action) {
//   switch (action.type) {
//     case 'incremented_age': {
//       return {
//         name: state.name,
//         age: state.age + 1
//       };
//     }
//     case 'changed_name': {
//       return {
//         name: action.nextName,
//         age: state.age
//       };
//     }
//     default: 
//     return state
//   }
  
// }

// const initialState = { name: 'Taylor', age: 42 };

//  function Form() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   function handleButtonClick() {
//     dispatch({ type: 'incremented_age' });
//   }

//   function handleInputChange(e) {
//     dispatch({
//       type: 'changed_name',
//       nextName: e.target.value
//     }); 
//   }

//   return (
//     <>
//       <input
//         value={state.name}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleButtonClick}>
//         Increment age
//       </button>
//       <p>Hello, {state.name}. You are {state.age}.</p>
//     </>
//   );
// }

//   export default F

import { useReducer } from "react";
const initialState = {count: 0}
 function reducer (state, action){
  switch(action.type){
    case 'DECREMENT':
      return{ count: state.count - 1}
      case 'INCREMENT':
        return{count: state.count + 1}
        default:
             return state;
      
  }
}
export default function Reducer (){


  const [state, dispatch] = useReducer(reducer, initialState)
  return(<><div>
    <h1>count {state.count}</h1><button onClick={() => dispatch ({type: 'INCREMENT'})}>ADD</button>
  <button onClick={() => dispatch({type: 'DECREMENT'})}>SUBTRACT</button></div></>)
}
  