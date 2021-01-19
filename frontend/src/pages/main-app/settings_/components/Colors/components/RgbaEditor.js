import React, { useState } from 'react'
import ColorSlider from './ColorSlider'

export default function RgbaEditor(props) {
    const cssVariables = document.documentElement.style
    const theme = props.theme
    const title = props.title || ""
    const cssVar = props.cssVar
    
    let oldColor = window.localStorage.getItem(`${cssVar},${theme}`) && window.localStorage.getItem(`${cssVar},${theme}`).split(",")

    const [redValue, setRedValue] = useState(oldColor ? Math.floor(oldColor[0]) : 255)
    const [greenValue, setGreenValue] = useState(oldColor ? Math.floor(oldColor[1]) : 255)
    const [blueValue, setBlueValue] = useState(oldColor ? Math.floor(oldColor[2]) : 255)
    const [opacityValue, setOpacityValue] = useState(oldColor ? (oldColor[3] * 100) : 50)
    const [isOpen, setIsOpen] = useState(true)

    const handleChange = () => {
        const colorRgb = toString(redValue, greenValue, blueValue, opacityValue/100)
        const hoverRgb = toString(hoverFormula(redValue), hoverFormula(greenValue), hoverFormula(blueValue), hoverOpacityFormula(opacityValue)/100)

        window.localStorage.setItem(`${cssVar},${theme}`, colorRgb)
        window.localStorage.setItem(`${cssVar}-hover,${theme}`, hoverRgb)
        window.localStorage.setItem(`${cssVar}-0,${theme}`, toString(redValue, greenValue, blueValue, 0.8  * (opacityValue/100)))
        window.localStorage.setItem(`${cssVar}-1,${theme}`, toString(redValue, greenValue, blueValue, 0.6  * (opacityValue/100)))
        window.localStorage.setItem(`${cssVar}-2,${theme}`, toString(redValue, greenValue, blueValue, 0.4  * (opacityValue/100)))
        window.localStorage.setItem(`${cssVar}-3,${theme}`, toString(redValue, greenValue, blueValue, 0.2  * (opacityValue/100)))
        window.localStorage.setItem(`${cssVar}-4,${theme}`, toString(redValue, greenValue, blueValue, 0.16 * (opacityValue/100)))
        window.localStorage.setItem(`${cssVar}-5,${theme}`, toString(redValue, greenValue, blueValue, 0.12 * (opacityValue/100)))
        window.localStorage.setItem(`${cssVar}-6,${theme}`, toString(redValue, greenValue, blueValue, 0.08 * (opacityValue/100)))
        window.localStorage.setItem(`${cssVar}-7,${theme}`, toString(redValue, greenValue, blueValue, 0.04 * (opacityValue/100)))
    }

    const toRgb = value => `rgba(${value})`

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
        <div 
            className="b--base-color mb-10px p-10px box-med"
            style={{ background: toRgb(toString(redValue, greenValue, blueValue, opacityValue/100))}}
        >
            <div 
                className="w-100 d-flex justify-content-between"
                onClick={open}
            >
                <i
                    className="material-icons-sharp align-self-start icon base-hover text-secondary algorithm-settings-details"
                    style={{ width: '25px', height: '25px' }}
                >
                    {!isOpen ? "keyboard_arrow_right" : "keyboard_arrow_down"}</i>
                <h3 
                    style={{ color: toRgb(toString(255 - redValue, 255 - greenValue, 255 - blueValue, 100 - opacityValue/100))}}
                    className="fs-15"
                >
                    {title}
                </h3>
            </div>
            <div 
                className={`${!isOpen ? 'd-none' : 'd-flex'} flex-column`}
                style={{ height: "120px" }}
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
            </div>
        </div>
    )
}
