import { create } from 'zustand'

type useTimerType = {
    state:number,
    timeLeft: number,
    isRunning: boolean,
    nextState: ()=>void
    toggleTimer: ()=>void
    stopTimer: ()=>void
    tick: ()=>void
}

const timeOptions:number[] = [60*1,60*5,60*10,60*15]

const useTimerStore = create<useTimerType>((set,get)=>({
    state: 0,
    timeLeft: timeOptions[0],
    isRunning: false,
    nextState: ()=>{
        let newState = get().state + 1
        if (newState > 3) newState = 0
        set({
            state: newState,
            timeLeft: timeOptions[newState],
            isRunning: false
        })
    },
    toggleTimer: ()=>set(current=>current.timeLeft > 0 ? { isRunning: !current.isRunning } : current),
    stopTimer: ()=>set({ isRunning: false }),
    tick: ()=>set(current=>{
        if (!current.isRunning) return current
        const timeLeft = Math.max(0, current.timeLeft - 1)
        return { timeLeft, isRunning: timeLeft > 0 }
    })
}))

export default useTimerStore