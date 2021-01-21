import React, { useState, useContext } from 'react'
import RgbaEditor from './RgbaEditor'
import IsCustomSwitch from './IsCustomSwitch'
import ThemeSwitcher from '../../../../../../components/ThemeSwitcher'
import { ThemeContext } from '../../../../../../context/app/AppContext'


export default function Colors(props) {
    const [checked, setChecked] = useState(window.localStorage.getItem(`${theme}-switch`) === 'false' ? false : true)
    const [theme, setThemeContext] = useContext(ThemeContext)

    const isMobile = visualViewport.width <= 980
    const title = "Tema " + theme
    const icon = theme === "light" ? "brightness_5" : "brightness_3"

    return (
        <li className="w-100 d-flex flex-column align-items-center" style={{ overflowY: 'auto', maxHeight: '100%' }}>
            <div
                className="w-100 d-flex align-items-center px-3 py-2 c-primary-grey base-hover"
            >
                {!isMobile ?
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <span class="material-icons-outlined c-secondary-grey align-self-start fs-27 mr-10px">
                                {icon}
                            </span>
                            <ThemeSwitcher id="color-config-switch" />
                            <span className="c-p-c-0 fw-500 fs-15 mr-10px">{title}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="c-secondary-grey fw-300 fs-13 fa-l mr-10px">Tema customizado.</span>
                            <IsCustomSwitch
                                id={theme}
                                checked={checked}
                                setChecked={setChecked}
                            />
                        </div>
                    </div>
                    :
                    <div className="d-flex w-100 justify-content-between flex-column">
                        <div className="d-flex w-100 align-items-center justify-content-between my-5px">
                            <span className="c-p-c-0 fw-500 fs-15 mr-10px">{title}</span>
                            <ThemeSwitcher id="color-config-switch" />
                        </div>
                        <div className="d-flex w-100 align-items-center justify-content-between my-5px">
                            <span className="c-secondary-grey fw-300 fs-13 fa-l mr-10px">Tema customizado.</span>
                            <IsCustomSwitch
                                id={theme}
                                checked={checked}
                                setChecked={setChecked}
                            />
                        </div>
                    </div>
                }
            </div>
            <div className='d-flex h-100 w-100' style={{ overflowY: "auto" }}>
                {isMobile ? 
                    <div className="d-flex flex-column px-5px h-100 w-100">
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
                    :
                    <>
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
                    </>
                }
            </div>
        </li>
    )
}