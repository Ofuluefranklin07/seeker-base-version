import "./Style.css";
import { useState } from "react";
export default function Colour() {
  const Colors = ["red", "green", "blue", "rgba(123, 232, 154", "#5a3e3e74"];
  const [colour, setColour] = useState("#fff");
  const handleColour = () => {
    const random = Math.floor(Math.random() * Colors.length)
    setColour(Colors[random]);
  };
  const hexColor = () => {
      const hexColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setColour(hexColor);
  };
  return (<><main className= 'container' style={{background: colour}}>
    <button onClick={handleColour}>Change color to RGBA</button>
    <h3><span className="color">red green rgba #</span></h3>
    <button onClick={hexColor}>Change to HEX color</button></main></>)
}
