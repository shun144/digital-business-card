import Sample from "@/Sample";
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Sample />
    </>
  );
}

export default App;
