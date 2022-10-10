import {FC, useState} from "react";
import classes from "./Counter.module.scss"

const Counter:FC = () => {
  const [state, setState] = useState(0);

  function minus() {
      setState(prev=>prev-1)
  }
  function plus(){
      setState(prev=>prev+1)

  }

    return (
      <div className={classes.container}>
        <h2>Счётчик</h2>
          <h1>{state}</h1>
          <div className={classes.btns}>
              <button onClick={minus}>- Минус</button>
              <button onClick={plus}>+ Плюс</button>
          </div>
      </div>
  )
}

export default Counter;