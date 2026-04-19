import Data from "./Data";
import "./style.css"
import { useState } from "react";
export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enaMulti, setEnaMulti] = useState(false);
  const [mulId, setMulId] = useState([]);

  function handCLick(getId) {
    setSelected(getId === selected ? null : getId);
  }
  function handleMultiple(getId) {
    let cpyMultiple= [...mulId];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getId)  
    if (findIndexOfCurrentId === -1) cpyMultiple.push(getId)
        else cpyMultiple.splice(findIndexOfCurrentId, 1)
    setMulId(cpyMultiple)
}
console.log(mulId)

  return (
    <>
      
        <button onClick={() => setEnaMulti(!enaMulti)}>
          Enable Multiple selection
        </button>
        {Data && Data.length > 0 ? (
          Data.map((x, index) => (
            <div
              key={index}
              className="wrapper"
              onClick={
                enaMulti ? () => handleMultiple(x.id)
                 : () => handCLick(x.id)
              }>
              <h2>{x.title}</h2>

              <span>+</span>
              <div>
                {
                    enaMulti ? mulId.indexOf(x.id) !== -1 && 
                     <div>
                      <div><h2>{x.message}</h2>
                    </div>
                    <div>
                      <p>{x.price}</p>
                    </div>
                  </div> :
                  selected === x.id && <div>
                    <div>
                    <h2>{x.message}</h2>
                    </div>
                    <div>
                      <p>{x.price}</p>
                    </div> 
                    </div>
                }
                
              </div>
              </div>
            
          ))
        ) : (
          <div>Not valid</div>
        )}
      
    </>
  );
}
