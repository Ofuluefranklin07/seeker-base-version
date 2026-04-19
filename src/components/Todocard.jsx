export default function Todocard ({todo,  onHide}){
  const onDelete = ()=> {
onHide(todo.id)
  }
  
  return(<><div className="container">
  <h1 className="txt-title">{todo.title}</h1>
  <p className="txt-content">{todo.content}</p></div>
  <button onClick={onDelete}>Delete</button></>)
}