import { useState } from "react"
export default function Todo({onAddTodo}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  function HandleSubmit(e){
    e.preventDefault()
    if(!title || !content) return;

    const addNewTodo ={
      title,
      content,
      id: Date.now() }
    
    setTitle('')
      setContent('')
      
      onAddTodo(addNewTodo)

  }

  return (<><form>
    <input type="text" placeholder="Add title here"
     value={title} onChange={(e) => setTitle(e.target.value)} />
    <textarea type="text" placeholder="Add your content here" value={content} onChange={(e) => setContent(e.target.value)}
    />
    <button onClick={HandleSubmit}>Add more tasks</button></form></>)
}