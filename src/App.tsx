import React, {Reducer, useEffect, useReducer, useState} from 'react';
import './App.css';
import {
    SquaresActionTypes,
    createSquareAC,
    squaresReducer,
    SquareType,
    restoreSquareColorAC
} from "./reducers/squares-reducer";
import {Square} from "./components/square/Square";
import {ColorPalette} from "./components/square/ColorPallete";


function App() {
    const [squares, dispatchToSquaresReducer] = useReducer<Reducer<Array<SquareType>, SquaresActionTypes>>(squaresReducer, [])
    const [brushColor, setBrushColor] = useState<string>("black")
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    useEffect(() => {
        for (let i = 1; i < 11; i++) {
            for (let j = 1; j < 11; j++) {
                dispatchToSquaresReducer(createSquareAC(j, i))
            }
        }
    }, []);

    return (
        <div className="App">
            <ColorPalette setBrushColor={setBrushColor}/>
            <div className={"squaresWrapper"}>
                {squares.map(s => {
                    return (
                        <Square key={s.id}
                                brushColor={brushColor}
                                square={s}
                                dispatchToSquaresReducer={dispatchToSquaresReducer}
                                isEditMode={isEditMode}
                        />
                    )
                })}
                <button onClick={() => setIsEditMode(!isEditMode)}>Change Mode</button>
                <button onClick={() => dispatchToSquaresReducer(restoreSquareColorAC())}>Reset</button>
            </div>
        </div>
    );
}

export default App;
