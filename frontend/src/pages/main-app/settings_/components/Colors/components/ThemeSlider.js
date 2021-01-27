import React from 'react'
import Slider from '@material-ui/core/Slider'


export default function ColorSlider(props) {
    const max = props.max
    const value = props.value
    const title = props.title
    const setValue = props.setValue
    const handleChange = props.handleChange

    return (
        <div className="d-flex align-items-center w-100">
            <span>{title}</span>
            <Slider
                defaultValue={value}
                max={max}
                className='c-primary-color mx-10px'
                onChange={(e, newValue) => {setValue(newValue); handleChange()}}
            />
            <strong>{Math.floor(value)}</strong>
        </div>
    )
}