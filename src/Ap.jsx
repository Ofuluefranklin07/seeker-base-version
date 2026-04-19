// import Mline from "./components/MIine";
// import StateTodo from "./components/StateTodo";
// import Todor from "./components/Todor";
// import Todorr from "./components/Todorr";
// import Color from "./assets/color projects/Color";
// import Colour from "./assets/color projects/Colour";
// import Reducer from "./components/Reducer";
// import EffectP from "./components/EffectP";
// import Weather from "./components/Weather";
// import Todoo from './components/FullTodoApp/Todoo'
// import TodooCard from "./components/FullTodoApp/TodooCard";
// import { useState } from "react";

//   export default function Ap() {
//     const [todo, setTodo] = useState([])
//     function handleClick (notes){
//       setTodo(prev => [...prev, notes])

//   }
//   return (
//     <><Todoo onSubmit={handleClick}/>
//     {todo.map((todo) => (<TodooCard key={todo.id} todo={todo}  />))}
    
  
//     </>
//   );
// }

import Weather from "./components/Weather";

import EffectP from "./components/EffectP";
import Todoo from "./components/FullTodoApp/Todoo";
import { useEffect, useState } from "react";
import TodooCard from "./components/FullTodoApp/TodooCard";
import GitSearch from "./components/Github/GitSearch";


export default function Ap (){
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState (null)
  const [ query, setQuery] = useState('')
  
  useEffect (() => {
    if(query.trim().length < 2) {
      setData(null)
      setError ('')
      return
    }
    const handleSearch = async () =>  {
      setLoading(true)
      setData(null)
      setError('')
      try{
        const response = await fetch (`https://api.github.com/users/${query}`)
        if (!response.ok){throw new Error ('user not found')}
        const userdata = await response.json()
        setData(userdata)
      }
      catch(err){
       setError(err.message)
      }
      finally{
        setLoading(false)
      }

    }
    const debounce = setTimeout(handleSearch, 500)
    return ()  =>  clearTimeout(debounce)
  
  }, [query])

console.log(data)

return (<><h2>Git user FInder</h2>


    <h2>GitHub User Finder</h2>

    <GitSearch query={query} setQuery={setQuery} />

    
  
</>)


}