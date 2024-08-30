import React, {memo} from 'react';
import s from "./Square.module.css"
import styled from "styled-components";
import {
    SquaresActionTypes,
    brushOneSquareAC,
    changeSquareColorAC,
    restoreSquareColorAC,
    SquareType
} from "../../reducers/squares-reducer";
import cursorBrush from "../../assets/cursor-brush.png"

type SquarePT = {
    square: SquareType
    dispatchToSquaresReducer: (action: SquaresActionTypes) => void
    isEditMode: boolean
    brushColor: string
}

export const Square = memo(({square, dispatchToSquaresReducer, isEditMode, brushColor}: SquarePT) => {
    const changeColorOnMouseEnterHandler = () => {
        dispatchToSquaresReducer(changeSquareColorAC(square.id, "red", square.x, square.y))
    }
    const changeColorOnMouseLeaveHandler = () => {
        dispatchToSquaresReducer(restoreSquareColorAC())
    }
    const brushOneSquareOnClickHandler = () => {
        dispatchToSquaresReducer(brushOneSquareAC(square.id, brushColor))
    }

    return (
        <>
            {isEditMode
                ? <StyledSquare color={square.color} opacity={1} onClick={brushOneSquareOnClickHandler}/>
                : <StyledSquare color={square.color}
                                cursorUrl={cursorBrush}
                                opacity={square.opacity}
                                className={s.item}
                                onMouseEnter={changeColorOnMouseEnterHandler}
                                onMouseLeave={changeColorOnMouseLeaveHandler}
                />
            }
        </>
    );
});

type StyledSquarePT = {
    color: string
    opacity: number
    cursorUrl?: string
}

export const StyledSquare = styled.div<StyledSquarePT>`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    margin: 2px;
    opacity: ${props => props.opacity};
    background-color: ${props => props.color};
    cursor: url(${props => props.cursorUrl}), auto;
`
