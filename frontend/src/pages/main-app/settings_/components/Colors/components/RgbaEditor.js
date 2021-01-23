import React, { useState } from 'react'
import ColorSlider from './ColorSlider'
import { setTheme } from '../../../../../../config/utils'

export default function RgbaEditor(props) {
    const cssVariables = document.documentElement.style
    const theme = props.theme
    const title = props.title || ""
    const cssVar = props.cssVar
    const setChecked = props.setChecked
    const isMobile = visualViewport.width <= 980
    
    let oldColor = window.localStorage.getItem(`${cssVar},${theme}`) && window.localStorage.getItem(`${cssVar},${theme}`).split(",")

    const [redValue, setRedValue] = useState(oldColor ? Math.floor(oldColor[0]) : 255)
    const [greenValue, setGreenValue] = useState(oldColor ? Math.floor(oldColor[1]) : 255)
    const [blueValue, setBlueValue] = useState(oldColor ? Math.floor(oldColor[2]) : 255)
    const [opacityValue, setOpacityValue] = useState(oldColor ? Math.floor(oldColor[3] * 100) : 50)
    const [isOpen, setIsOpen] = useState(!isMobile)

    const apply = (cssVar, theme, redValue, greenValue, blueValue, opacityValue) => {
        window.localStorage.setItem(`${cssVar},${theme}`, toString(redValue, greenValue, blueValue, opacityValue/100))
    }

    const handleChange = () => {
        setChecked(true)
        cssVariables.setProperty(`${cssVar}`      , toRgb(toString(             redValue ,              greenValue ,              blueValue ,                     opacityValue/100)))
        cssVariables.setProperty(`${cssVar}-hover`, toRgb(toString(hoverFormula(redValue), hoverFormula(greenValue), hoverFormula(blueValue),                     opacityValue/100)))
        cssVariables.setProperty(`${cssVar}-0`    , toRgb(toString(             redValue ,              greenValue ,              blueValue ,             0.8  * (opacityValue/100))))
        cssVariables.setProperty(`${cssVar}-1`    , toRgb(toString(             redValue ,              greenValue ,              blueValue ,             0.6  * (opacityValue/100))))
        cssVariables.setProperty(`${cssVar}-2`    , toRgb(toString(             redValue ,              greenValue ,              blueValue ,             0.4  * (opacityValue/100))))
        cssVariables.setProperty(`${cssVar}-3`    , toRgb(toString(             redValue ,              greenValue ,              blueValue ,             0.2  * (opacityValue/100))))
        cssVariables.setProperty(`${cssVar}-4`    , toRgb(toString(             redValue ,              greenValue ,              blueValue ,             0.16 * (opacityValue/100))))
        cssVariables.setProperty(`${cssVar}-5`    , toRgb(toString(             redValue ,              greenValue ,              blueValue ,             0.12 * (opacityValue/100))))
        cssVariables.setProperty(`${cssVar}-6`    , toRgb(toString(             redValue ,              greenValue ,              blueValue ,             0.08 * (opacityValue/100))))
        cssVariables.setProperty(`${cssVar}-7`    , toRgb(toString(             redValue ,              greenValue ,              blueValue ,             0.04 * (opacityValue/100))))
    }

    const toRgb = value => `rgba(${value})`

    const toString = (redValue, greenValue, blueValue, opacityValue) => {
        return `${String(redValue)},${String(greenValue)},${String(blueValue)},${String(opacityValue)}`
    }

    const hoverFormula = color => {
        return ( (color + ((255 - color) * 0.2)) >= 255 ? 
          (color - (color * 0.05))
          :
          (color + ((255 - color) * 0.2))
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
                    className="material-icons-sharp align-self-start icon base-hover algorithm-settings-details"
                    style={{ width: '25px', height: '25px' }}
                >
                    {!isOpen ? "keyboard_arrow_right" : "keyboard_arrow_down"}</i>
                <h3 
                    className="fs-15"
                >
                    {title}
                </h3>
            </div>
            <div 
                className={`${!isOpen ? 'd-none' : 'd-flex'} flex-column`}
            >
                <ColorSlider 
                    title = "R"
                    max={255}
                    handleChange = {handleChange}
                    color = {redValue}
                    setColor = {setRedValue}
                />
                <ColorSlider 
                    title = "G"
                    max={255}
                    handleChange = {handleChange}
                    color = {greenValue}
                    setColor = {setGreenValue}
                />
                <ColorSlider 
                    title = "B"
                    max={255}
                    handleChange = {handleChange}
                    color = {blueValue}
                    setColor = {setBlueValue}
                />
                <ColorSlider 
                    title = "O"
                    max={100}
                    handleChange = {handleChange}
                    color = {opacityValue}
                    setColor = {setOpacityValue}
                />
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-secondary d-flex justify-content-center align-items-center mr-10px" 
                        style={{ height: "30px" }}
                        onClick={() => setTheme()}
                    >
                        Resetar
                    </button>
                    <button
                        className="btn btn-primary d-flex justify-content-center align-items-center" 
                        style={{ height: "30px" }}
                        onClick={() => apply(cssVar, theme, redValue, greenValue, blueValue, opacityValue)}
                    >
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    )
}
