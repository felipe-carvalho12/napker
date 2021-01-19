import React, { useEffect, useState } from 'react'
import Slider from '@material-ui/core/Slider'

export default function Colors(props) {
    const cssVariables = document.documentElement.style
    const title = props.title || ""
    const cssVar = props.cssVar
    
    let oldColor = window.localStorage.getItem(cssVar) && window.localStorage.getItem(cssVar).split(",")

    const [redValue, setRedValue] = useState(oldColor ? Math.floor(oldColor[0]) : 255)
    const [greenValue, setGreenValue] = useState(oldColor ? Math.floor(oldColor[1]) : 255)
    const [blueValue, setBlueValue] = useState(oldColor ? Math.floor(oldColor[2]) : 255)
    const [opacityValue, setOpacityValue] = useState(oldColor ? (oldColor[3] * 100) : 50)
    const [isOpen, setIsOpen] = useState(true)

    const handleChange = () => {
        const colorRgb = toString(redValue, greenValue, blueValue, opacityValue/100)
        const hoverRgb = toString(hoverFormula(redValue), hoverFormula(greenValue), hoverFormula(blueValue), hoverOpacityFormula(opacityValue)/100)

        cssVariables.setProperty(cssVar, `rgba(${colorRgb})`)
        cssVariables.setProperty(`${cssVar}-hover`, `rgba(${colorRgb})`)
        window.localStorage.setItem(cssVar, colorRgb)
        window.localStorage.setItem(`${cssVar}-hover`, hoverRgb)
    }

    const toString = (redValue, greenValue, blueValue, opacityValue) => {
        return `${String(redValue)},${String(greenValue)},${String(blueValue)},${String(opacityValue)}`
    }

    const hoverFormula = color => {
        return (
            (color + (255 - color) * 0.2 ) 
        )
    }

    const hoverOpacityFormula = opacity => {
        return (
            (opacity + 10) < 100 ? 
                (opacity + 10)
                :
                (opacity - 10)
        )
    }

    const open = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true)
    }


    return (
        <div className="b--base-color mb-10px p-10px box-med b-theme-base-color">
            <div 
                className="w-100 d-flex justify-content-between"
                onClick={open}
            >
                <i
                    className="material-icons-sharp align-self-start icon base-hover text-secondary algorithm-settings-details"
                    style={{ width: '25px', height: '25px' }}
                >
                    {!isOpen ? "keyboard_arrow_right" : "keyboard_arrow_down"}</i>
                <h3 className="c-primary-grey fs-17">{title}</h3>
            </div>
            <div className={`mb-10px ${!isOpen ? 'd-none' : 'd-flex'}`}>
                <div className="px-5x" style={{ width: '100%' }}>
                    <div class="range px-10px">
                        <Slider
                            defaultValue={redValue}
                            className='c-primary-color'
                            max={255}
                            onChange={(e, value) => {setRedValue(value); handleChange()}}
                        />
                    </div>
                    <div className="d-flex justify-content-between px-10px">
                        <spam className="text-secondary">Vermelho</spam>
                        <strong>{redValue}</strong>
                    </div>
                </div>
                <div className="px-5x" style={{ width: '100%' }}>
                    <div class="range px-10px">
                        <Slider
                            defaultValue={greenValue}
                            className='c-primary-color'
                            max={255}
                            onChange={(e, value) => {setGreenValue(value); handleChange()}}
                        />
                    </div>
                    <div className="d-flex justify-content-between px-10px">
                        <spam className="text-secondary">Verde</spam>
                        <strong>{greenValue}</strong>
                    </div>
                </div>
                <div className="px-5x" style={{ width: '100%' }}>
                    <div class="range px-10px">
                        <Slider
                            defaultValue={blueValue}
                            className='c-primary-color'
                            max={255}
                            onChange={(e, value) => {setBlueValue(value); handleChange()}}
                        />
                    </div>
                    <div className="d-flex justify-content-between px-10px">
                        <spam className="text-secondary">Azul</spam>
                        <strong>{blueValue}</strong>
                    </div>
                </div>
                <div className="px-5x" style={{ width: '100%' }}>
                    <div class="range px-10px">
                        <Slider
                            defaultValue={opacityValue}
                            className='c-primary-color'
                            onChange={(e, value) => {setOpacityValue(value); handleChange()}}
                        />
                    </div>
                    <div className="d-flex justify-content-between px-10px">
                        <spam className="text-secondary">Opacidade</spam>
                        <strong>{opacityValue}</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}
