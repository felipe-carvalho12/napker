import React, { useContext, useEffect, useState } from 'react'
import ThemeEditor from './components/ThemeEditor'
import { Link } from 'react-router-dom'


export default function Colors() {

    return (
        <div className="settings-description-container b-t-r-r b-b-r-r b-theme-base-color">
            <div className="d-flex flex-column justify-content-between align-items-center w-100 ">
                <div className="d-flex flex-column w-100">
                    <h3 className="c-primary-color p-30px">Cores</h3>
                    <ThemeEditor 
                        theme = "light"
                        title = "Tema claro"
                        icon  = "brightness_5"
                    />
                    <ThemeEditor 
                        theme = "dark"
                        title = "Tema escuro"
                        icon  = "brightness_3"
                    />
                </div>
            </div>
        </div>
    )
}