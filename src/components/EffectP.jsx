import { useEffect, useState } from "react";
export default function EffectP() {
     const [count, setCount] = useState(0);
  useEffect(
    () =>
      {console.log(
        "trust in the lord with all your heart and lean ot on your own understanding"
      )},
    []
  );

  return (
    <>
      <div>
        <h1>Use effect practice  <span>  {count}</span>
        <button onClick={() => setCount(count + 1)}>Increment</button>
         
        </h1>
      </div>
    </>
  );
}
