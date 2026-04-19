// for usestate when the state is small 
// updates are usually simple but when they become many, we introduced useREducer
//  to avoid scaterting because ut helps to al the state logic in ine place

import { useReducer } from "react";

// for useReducer, STATE- what is  currently happening
//ACTION - button you press
//REDUCER - the tv's brain that decides what happens when the button is pressed

const initialState = {count : 0}

const reducer = (state, action) => {
    switch(action.type){
        case 'INCREMENT':
            return{count: state.count + 1}
            
            case 'DECREMENT':
                return{count: state.count - 1}

                case 'RESET':
                    return{count: 0}
                    default:
                        return state

    }

}
function Mline (){
    const[state, dispatch] = useReducer(reducer, initialState)


    return(<><div>
        <h2>Count: {state.count}</h2>
        <button onClick={() => dispatch({type: 'INCREMENT'})}>ADD HERE</button>
        <button onClick={() => dispatch ({type: 'DECREMENT'})}>sUBTRACT HERE</button>
        <button onClick={() => dispatch({type: 'RESET'})}>RESET</button>
        
        
        
        
        </div></>)
    


}
export default Mline