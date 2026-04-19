// import Weather from "./components/Weather";
// import "./App.css";
// import EffectP from "./components/EffectP";
// import Todoo from "./components/FullTodoApp/Todoo";
// import { useEffect, useState } from "react";
// import TodooCard from "./components/FullTodoApp/TodooCard";
// import GitSearch from "./components/Github/GitSearch";

// export default function App (){
//   const [username, setUsername] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [data, setData] = useState (null)
//   const [ query, setQuery] = useState('')
  
//   useEffect (() => {
//     if(query.trim().length < 2) {
//       setData(null)
//       setError ('')
//       return
//     }
//     const handleSearch = async () =>  {
//       setLoading(true)
//       setData(null)
//       setError('')
//       try{
//         const response = await fetch (`https://api.github.com/users/${query}`)
//         if (!response.ok){throw new Error ('user not found')}
//         const userdata = await response.json()
//         setData(userdata)
//       }
//       catch(err){
//        setError(err.message)
//       }
//       finally{
//         setLoading(false)
//       }

//     }
//     const debounce = setTimeout(handleSearch, 500)
//     return ()  =>  clearTimeout(debounce)
  
//   }, [query])

// return (<><h2>Git user FInder</h2>
//   <GitSearch setQuery={setQuery}
//   query={query}/>
  
// </>)


// }

import Index from './components/Accordion project/Index'
export default function App (){
  return (<><Index/></>)
}