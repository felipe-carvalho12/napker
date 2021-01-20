import React, { useState, useEffect } from 'react'
import { setTheme } from '../../../../../../config/utils'

export default function IsCustomSwitch(props) {
    const checkboxId = `${props.id}-switch`

    let custom = window.localStorage.getItem(checkboxId) || 'true'

    const [isChecked, setIsChecked] = useState(custom === 'false' ? true : false)

    useEffect(() => {
        custom = window.localStorage.getItem(checkboxId)
    }, [window.localStorage.getItem(checkboxId)])

    const switchIsCustom = () => {

        isChecked ? 
            setIsChecked(false)
            : 
            setIsChecked(true)

        custom = isChecked ? 'true' : 'false'

        window.localStorage.setItem(checkboxId, isChecked ? 'true' : 'false')

        setTheme()
    }

    return (
        <div
            className={`pr-10px default-switcher ${props.className}`}
            style={props.style}
        >
            <div class="one-quarter" id="switch">
                <input type="checkbox" class="checkbox" id={checkboxId} checked={isChecked} onChange={switchIsCustom} />
                <label class="label m-0" for={checkboxId}>
                    <div class="ball"></div>
                </label>
            </div>
        </div>
    )
} 