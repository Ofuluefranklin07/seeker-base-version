import { useState } from "react";
import HeaderT from './FullTodoApp/HeaderT'
export default function Todoo (){
const [title, setTitle] = useState('')
const [content, setContent] = useState('')

return(<><div><HeaderT/></div></>)
}