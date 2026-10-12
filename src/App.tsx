import { useState, type CSSProperties } from "react"
import useTimerStore from "./stores/useTimerStore"

const App = () => {

  const timerStore = useTimerStore()
  const [inAnimation, setInAnimation] = useState<boolean>(false)

  return (
    <div>
      <div className="container">
      <div className={inAnimation?"cube animate":"cube"} onClick={()=>{
        if (inAnimation) return
        setInAnimation(true)
        let i = setInterval(()=>{
          timerStore.nextState()
          setInAnimation(false)
          clearInterval(i)
        },500)
      }} 
      style={{
        transform: `rotateX(-45deg) rotateZ(-${timerStore.state * 90}deg)`,
        "--current-rotation": `${-timerStore.state * 90}deg`,
      } as CSSProperties}>
        <div className="face front"><div className="plate">{Math.floor(timerStore.timeLeft/60)}:{timerStore.timeLeft%60}</div></div>
        <div className="face back"></div>
        <div className="face right">5</div>
        <div className="face left">15</div>
        <div className="face top">1</div>
        <div className="face bottom">10</div>
      </div>
    </div>
    </div>
  )
}

export default App