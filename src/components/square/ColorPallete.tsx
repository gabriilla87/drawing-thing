import React from 'react';
import s from "./ColorPallete.module.css"
import {StyledSquare} from "./Square";

type ColorPalettePT = {
    setBrushColor: (color: string) => void
}

const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white"];

export const ColorPalette = ({setBrushColor}: ColorPalettePT) => {
    const setBrushColorOnClickHandler = (color: string) => {
        setBrushColor(color)
    }

    return (
        <div className={s.colorPaletteWrapper}>
            {colors.map(c => <StyledSquare className={s.colorItem} opacity={1} color={c} onClick={() => setBrushColorOnClickHandler(c)}/>)}
        </div>
    );
};