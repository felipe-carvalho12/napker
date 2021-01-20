import React, { useState, useEffect } from 'react'
import { setTheme } from '../../../../../../config/utils'

export default function IsCustomSwitch(props) {
    const checkboxId = `${props.id}-switch`
    const checked = props.checked
    const setChecked = props.setChecked

    useEffect(() => {

        window.localStorage.setItem(checkboxId, checked ? 'true' : 'false')
        setTheme()

    }, [checked])

    return (
        <div
            className={`pr-10px default-switcher ${props.className}`}
            style={props.style}
        >
            <div class="one-quarter" id="switch">
                <input type="checkbox" class="checkbox" id={checkboxId} checked={checked} onChange={() => setChecked(!checked)} />
                <label class={`label m-0 ${checked ? "b-primary-color" : "b-background"}`} for={checkboxId}>
                    <div class="ball"></div>
                </label>
            </div>
        </div>
    )
} 