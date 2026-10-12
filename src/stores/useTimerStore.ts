import React from 'react'
import { create } from 'zustand'

type useTimerType = {
    state:number,
    timeLeft: number,
    nextState: ()=>void
}

const timeOptions:number[] = [60*1,60*5,60*10,60*15]

const useTimerStore = create<useTimerType>((set,get)=>({
    state: 0,
    timeLeft: 0,
    nextState: ()=>{
        let newState = get().state + 1
        if (newState > 3) newState = 0
        set(current=>({
            state: newState,
            timeLeft: timeOptions[newState]
        }))
    }
}))

export default useTimerStore