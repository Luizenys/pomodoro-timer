import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
    cycles: Cycle[];
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    }, () => {
        const storedStateAsJSON = localStorage.getItem(
            '@pomodoro-timer:cycles-state-1.0.0'
        )

        if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }

        return {cycles: [], activeCycleId: null}
    })

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
        
        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@pomodoro-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])


    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
        // setCycles((state) =>
        //     state.map((cycle) => {
        //         if (cycle.id === activeCycleId) {
        //             return {...cycle, finishedDate: new Date()}
        //         } else {
        //              return cycle
        //         }
        //      })
        // )
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle))
        //setCycles((state) => [...state, newCycle])
        // setCycles([...cycles, newCycle]) 
        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
       
        dispatch(interruptCurrentCycleAction())
    }

    return (
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle, cycles }}>
            {children}
        </CyclesContext.Provider>
    )
}