import React from 'react'


export default function VideoIframe(props) {
    const width  = props.width || '620'
    const heigth = props.heigth || '315'

    return (
        <iframe width={width} height={heigth} src={props.src}
            frameborder='0'
            allow='autoplay; encrypted-media'
        />
    )
}