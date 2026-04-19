import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Chika');

  const increment = () => {
    setCount(prev => prev + 1); // Functional update — best practice!
    setCount(prev => prev + 1); // Batches into +2
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+2</button>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>Hello, {name}!</p>
    </div>
  );
}
export default Counter

