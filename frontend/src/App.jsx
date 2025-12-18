// import './App.css'
import { useState } from "react";
import {PingComponent} from "./components/atoms/PingComponent";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <button onClick={()=>setIsVisible(!isVisible)}> Toggle</button>
      {isVisible && <PingComponent/>}
    </>
  )
}

export default App
