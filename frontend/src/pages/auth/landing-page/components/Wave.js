import React from 'react'


export default function Wave(props) {
    const colors = props.colors ? 
                        Array.isArray(props.colors) ? 
                            props.colors.length === 2 ?
                                [props.colors[0], props.colors[0], props.colors[1], props.colors[1]]
                                :
                                props.colors
                            :
                            [props.colors, props.colors, props.colors, props.colors]
                        : 
                        ["var(--lp-s-b-00)", "var(--lp-s-b-01)", "var(--lp-s-b-01)", "var(--lp-s-b-02)"]

    const blur = props.blur ?
                        Array.isArray(props.blur) ? 
                            props.blur
                            :
                            [props.blur, props.blur]
                        :
                        [false, false]

    const svg = (color1, color2, blur) => {

        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: color1, stoOpacity: "1" }} />
                        <stop offset="100%" style={{ stopColor: color2, stopOpacity: "1" }} />
                    </linearGradient>
                    <filter id="blur" x="0" y="0">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                    </filter>
                </defs>
                <path d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 
                    447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 
                    L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 
                    981.704672,-7.57670281 826.337463,25.5396311 Z"
                    fill={color1} filter={`${blur && "url(#blur)"}`}>
                </path>
            </svg>
        )
    }

    return (
        <div class="ocean">
            <div class="wave">
                {svg(colors[2], colors[3], blur[1])}
            </div>
            <div class="wave">
                {svg(colors[0], colors[1], blur[0])}
            </div>
        </div>
    )
}