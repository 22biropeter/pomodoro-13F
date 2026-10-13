import { useState, type CSSProperties } from "react"
import { useEffect, useRef, type AnimationEvent as ReactAnimationEvent } from "react"
import useTimerStore from "./stores/useTimerStore"

const App = () => {

  const state = useTimerStore(timer => timer.state)
  const timeLeft = useTimerStore(timer => timer.timeLeft)
  const isRunning = useTimerStore(timer => timer.isRunning)
  const nextState = useTimerStore(timer => timer.nextState)
  const toggleTimer = useTimerStore(timer => timer.toggleTimer)
  const stopTimer = useTimerStore(timer => timer.stopTimer)
  const tick = useTimerStore(timer => timer.tick)
  const [inAnimation, setInAnimation] = useState<boolean>(false)
  const clickTimeout = useRef<number | null>(null)

  useEffect(() => {
    if (!isRunning) return
    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [isRunning, tick])

  useEffect(() => () => {
    if (clickTimeout.current !== null) window.clearTimeout(clickTimeout.current)
  }, [])

  const handleClick = () => {
    if (clickTimeout.current !== null) {
      window.clearTimeout(clickTimeout.current)
      clickTimeout.current = null
      return
    }

    clickTimeout.current = window.setTimeout(() => {
      clickTimeout.current = null
      if (inAnimation) return
      stopTimer()
      setInAnimation(true)
    }, 250)
  }

  const handleDoubleClick = () => {
    if (clickTimeout.current !== null) {
      window.clearTimeout(clickTimeout.current)
      clickTimeout.current = null
    }
    if (!inAnimation) toggleTimer()
  }

  const handleAnimationEnd = (event: ReactAnimationEvent<HTMLDivElement>) => {
    if (event.animationName !== "spin") return
    nextState()
    setInAnimation(false)
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = String(timeLeft % 60).padStart(2, "0")

  return (
    <div>
      DUPLA KATT AZ INDÍTÁSHOZ
      <br />
      SIMA KATT A FORGATÁSHOZ/LEÁLLÍTÁSHOZ
      <div className="container">
      <div
        className={inAnimation ? "cube animate" : "cube"}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onAnimationEnd={handleAnimationEnd}
        style={{
          transform: `rotateX(-45deg) rotateZ(-${state * 90}deg)`,
          "--current-rotation": `${-state * 90}deg`,
        } as CSSProperties}
      >
        <div className="face front"><div className={(inAnimation ? "animate " : "") + (!isRunning && !inAnimation && timeLeft > 0 ? "plate ready" : "plate")}>{minutes}:{seconds}</div></div>
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