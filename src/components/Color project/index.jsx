//MY AIM IS TWEAK THIS PROJECT AFTER BUILDING IT USE BOOLEAN STATEMENTS FOR THE COLOR MODE DETECTION
import { useState } from "react";

export default function Color (){
    const [typeOfColor, setTypeOfColor] = useState ('hex')
    const [colorMode, setColorMode] = useState('#000000')
    function randomUtility (length){
        return Math.floor(Math.random () * length)
    }
    function handleHex (){
        const hex = ['1,2,3,4,5,6,7,8,9,A,B,C,D,E,F']
        let hexColor = '#'
        for (let i=0; 1< 6; i++) {
            hexColor +=  hex[randomUtility(hex.length)]
           
        }
         setColorMode(hex)
         console.log(hexColor)
    
         

    }
    function handleRgb (){

    }

    return (<>
    <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: colorMode,

    }}>
        <button>HEX COLOR MODE</button>
        <button onClick={() => (typeOfColor === 'hex') ? handleHex : handleRgb }>RANDOM COLOR CODE</button>
        <button>RGB COLOR CODE</button></div></>)
}