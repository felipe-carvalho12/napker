import React from 'react'


export default function VideoIframe(props) {
    const width  = props.width || '620'
    const height = props.height || '315'

    return (
        <iframe width={width} height={height} src={props.src}
            frameborder='0'
            allow='autoplay; encrypted-media; fullscreen'
        />
    )
}