import React, { useState } from 'react'
import RgbaEditor from './RgbaEditor'
import IsCustomSwitch from './IsCustomSwitch'


export default function Colors(props) {
    const themeContext = props.themeContext
    const setThemeContext = props.setThemeContext
    const theme = props.theme
    const title = props.title
    const icon = props.icon

    const [checked, setChecked] = useState(window.localStorage.getItem(`${theme}-switch`) === 'false' ? false : true)

    return (
        <li className="w-100 d-flex flex-column align-items-center" style={{ overflowY: 'auto', maxHeight: '80%' }}>
            <div
                className="w-100 d-flex align-items-center px-3 py-2 c-primary-grey base-hover"
            >
                <span class="material-icons-outlined c-secondary-grey align-self-start fs-27 mr-10px">
                    {icon}
                </span>
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <div className="d-flex flex-column align-items-start">
                        <span className="c-p-c-0 fw-500 fs-15 mr-10px">{title}</span>
                        <div className="d-flex align-items-center">
                            <span className="c-secondary-grey fw-300 fs-13 fa-l mr-10px">Tema customizado.</span>
                            <IsCustomSwitch
                                id={theme}
                                checked={checked}
                                setChecked={setChecked}
                            />
                        </div>
                    </div>
                    <i
                        className="material-icons-sharp align-self-start icon base-hover text-secondary algorithm-settings-details"
                        style={{ width: '25px', height: '25px' }}
                        onClick={() => setThemeContext(theme)}
                    >
                        {themeContext !== theme ? "keyboard_arrow_right" : "keyboard_arrow_down"}
                    </i>
                </div>
            </div>
            <div className={`${themeContext !== theme ? 'd-none' : 'd-flex h-100'} w-100`} style={{ overflowY: "auto" }}>
                <div className="m-5px d-flex flex-column w-100">
                    <RgbaEditor
                        cssVar="--primary-color"
                        title="Cor primária"
                        theme={theme}
                        setChecked={setChecked}
                    />
                    <RgbaEditor
                        cssVar="--theme-base-color"
                        title="Cor base"
                        theme={theme}
                        setChecked={setChecked}
                    />
                    <RgbaEditor
                        cssVar="--background"
                        title="Cor do fundo"
                        theme={theme}
                        setChecked={setChecked}
                    />
                </div>
                <div className={`m-5px d-flex flex-column w-100`}>
                    <RgbaEditor
                        cssVar="--primary-grey"
                        title="Cor da fonte primária"
                        theme={theme}
                        setChecked={setChecked}
                    />
                    <RgbaEditor
                        cssVar="--secondary-grey"
                        title="Cor da fonte secundária"
                        theme={theme}
                        setChecked={setChecked}
                    />
                </div>
            </div>
        </li>
    )
}