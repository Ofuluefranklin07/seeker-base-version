import { useState, useEffect } from "react";
export default function AsyncLesson (){
    const [users, setUsers] = useState([])
    const [error, setError] = useState (null)
    const[loading, setIsLoading] = useState (true)
    
        useEffect(() => {
         const fetchNames = async () => {
     try{  const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok) throw new Error ("Network Error")
        const Data = await response.json();
    setUsers(Data)
    setError('')
     }
     catch(err){
    setError(err.message)
     }
     finally{
        setIsLoading(false)
     }
      }
      fetchNames(); 
        }, [])
    
return (<>
<div>
    <ul>{users.map(user => <li key={user.id}><strong>{user.name}</strong></li>)}</ul>
</div></>)
}

    