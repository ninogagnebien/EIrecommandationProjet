import { useState } from 'react';
import './Categories.css';

function Categories() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="Counter-container">
      <h1>This is a counter example</h1>
      <div>Counter value : {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>Increment counter</button>
    </div>
  );
}

export default Categories;
