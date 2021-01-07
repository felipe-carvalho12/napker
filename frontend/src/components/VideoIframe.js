import React from 'react'


export default function VideoIframe(props) {

    return (
        <iframe width="620" height="315" src={props.src}
            frameborder='0'
            allow='autoplay; encrypted-media'
        />
    )
}