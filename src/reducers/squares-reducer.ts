import {v1} from "uuid";


export type SquareType = {
    id: string
    x: number
    y: number
    color: string
    opacity: number
}

type CreateSquareAT = ReturnType<typeof createSquareAC>
type ChangeSquareColorAT = ReturnType<typeof changeSquareColorAC>
type RestoreSquareColorAT = ReturnType<typeof restoreSquareColorAC>
type BrushOneSquareAT = ReturnType<typeof brushOneSquareAC>

export const createSquareAC = (x: number, y: number) => ({
    type: "CREATE-SQUARE", x, y
}) as const
export const changeSquareColorAC = (id: string, mainColor: string, x: number, y: number) => ({
    type: "CHANGE-SQUARE-COLOR", id, mainColor, x, y
}) as const
export const restoreSquareColorAC = () => ({
    type: "RESTORE-SQUARE-COLOR", color: "white"
}) as const
export const brushOneSquareAC = (id: string, color: string) => ({
    type: "BRUSH-ONE-SQUARE", id, color
}) as const

export type SquaresActionTypes = CreateSquareAT | ChangeSquareColorAT | RestoreSquareColorAT | BrushOneSquareAT

export const squaresReducer = (state: Array<SquareType>, action: SquaresActionTypes): Array<SquareType> => {
    switch (action.type) {
        case "CREATE-SQUARE": {
            const {x, y} = action
            return [...state, {x, y, id: v1(), color: "white", opacity: 1}]
        }
        case "CHANGE-SQUARE-COLOR": {
            const newState = state.map(s => s.x === action.x || s.y === action.y ? {...s, color: "grey", opacity: 0.5} : s)
            return newState.map(s => s.id === action.id ? {...s, color: action.mainColor, opacity: 1} : s)
        }
        case "RESTORE-SQUARE-COLOR": {
            return state.map(s => ({...s, color: action.color, opacity: 1}))
        }
        case "BRUSH-ONE-SQUARE": {
            return state.map(s => s.id === action.id ? {...s, color: action.color} : s)
        }
        default: {
            return state
        }
    }
}