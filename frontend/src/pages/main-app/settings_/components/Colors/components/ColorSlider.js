import React from 'react'
import Slider from '@material-ui/core/Slider'


export default function ColorSlider(props) {
    const max = props.max
    const color = props.color
    const title = props.title
    const setColor = props.setColor
    const handleChange = props.handleChange

    return (
        <div className="d-flex align-items-center w-100">
            <span>{title}</span>
            <Slider
                defaultValue={color}
                max={max}
                className='c-primary-color mx-10px'
                onChange={(e, value) => {setColor(value); handleChange()}}
            />
            <strong>{Math.floor(color)}</strong>
        </div>
    )
}