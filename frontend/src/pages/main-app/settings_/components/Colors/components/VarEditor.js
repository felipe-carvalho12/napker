import React, { useState } from 'react'
import ThemeSlider from './ThemeSlider'
import { setTheme } from '../../../../../../config/utils'

export default function VarEditor(props) {
    const cssVariables = document.documentElement.style
    const theme = props.theme
    const title = props.title || ""
    const cssVar = props.cssVar
    const setChecked = props.setChecked
    const isMobile = visualViewport.width <= 980
    const modifier = props.modifier || 0
    const maxValue = props.maxValue

    const sizeVariants = ["-0", "-1", "-2", "-3", "-4", "-5"]
    const variantSizes = [0.5, 1, 2, 3, 4, 5]

    const [value, setValue] = useState(window.localStorage.getItem(`${cssVar},${theme}`) ? (parseInt(window.localStorage.getItem(`${cssVar},${theme}`)) - modifier) : maxValue)
    const [isOpen, setIsOpen] = useState(!isMobile)

    const apply = (cssVar, theme, value) => {
        window.localStorage.setItem(`${cssVar},${theme}`, String(value + modifier))
    }

    const handleChange = () => {
        setChecked(true)
        for (let i in sizeVariants) {
            cssVariables.setProperty(cssVar + sizeVariants[i], String((value + modifier) * variantSizes[i]) + "px")
        }
        cssVariables.setProperty(cssVar, String(Math.floor(value + modifier)) + "px")
    }

    const open = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true)
    }


    return (
        <div className="mb-10px p-10px box-med b-theme-base-color">
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
                <ThemeSlider 
                    max = {maxValue}
                    value = {value}
                    title = {""}
                    setValue = {setValue}
                    handleChange = {handleChange}
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
                        onClick={() => apply(cssVar, theme, value)}
                    >
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    )
}
