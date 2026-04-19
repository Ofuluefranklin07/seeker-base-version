import { Test } from "./MyTest";
import { useContext } from "react";
export default function Rupcard(){
    const {myBusiness} = useContext(Test)
    return(
        <>
            <h1>{myBusiness.header}</h1>
            <p>{myBusiness.paragraph}</p>
        </>
    )
}