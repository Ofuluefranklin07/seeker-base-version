import { Test } from "./MyTest";
import { useContext } from "react";
  export function Tester (){
    const {title, content, Onclik} = useContext(Test)
    return(<>
    <div>
        <h1>{title}
            </h1>
            <p>{content}</p>
            <button onClick={Onclik}>Update content</button></div></>)
}
export default Tester