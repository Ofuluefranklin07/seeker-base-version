import { useState } from "react";
import "./Style.css";

const colors = ["red", "green", "rgba(122, 132, 156)", "#0932"];

export default function Color() {
  const [color, setColor] = useState("#fff");

  const handleChangeColor = () => {
    const random = Math.floor(Math.random() * colors.length);
    setColor(colors[random]);
  };

  const setHexColor = () => {
    const hexColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setColor(hexColor);
  };

  return (
    <main style={{ backgroundColor: color }}>
      <div className="container">
        <h2>
          background color :{' '}
          <span className="color" data-testid="color">
            {color}
          </span>
        </h2>
        <button className="btn btn-hero" onClick={handleChangeColor}>
          Change Color
        </button>
        <button className="btn btn-hero" onClick={setHexColor}>
          Set Hex Color
        </button>
      </div>
    </main>
  );
}

