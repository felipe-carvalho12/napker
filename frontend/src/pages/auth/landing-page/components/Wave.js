import React, { useEffect } from 'react'

export default function Wave(props) {
    const height = props.height ? props.height: 200
    const width = props.width ? props.width : "100%"
    const colors = props.colors ? props.colors : ["var(--lp-w-10)", "var(--lp-w-10)"]

    useEffect(() => {
        let xs = []
        let lenght = 200

        for (var i = 0; i <= lenght; i++) {
            xs.push(i)
        }

        let t1 = 0
        let t2 = 0

        const points = i => xs.map(x => {
            let y = (50 + 10 * (i-1) + 20 * (Math.sin((x + t1) / 100)) * (Math.sin((x + t2) / 200)))
            
            return [10 * x, y]
            })

        function animate() {
        
            
            for (let i in document.querySelectorAll(".wave")) {
                if (i <= document.querySelectorAll(".wave").length) {
                    let el = document.querySelectorAll(".wave")[i]
                    let path = `M 0 ${height} ` + points(i).map(p => {
                        return p[0] + "," + p[1]
                    }).join(" L") + ` V ${height} Z`
                    el.setAttribute("d", path)
                }
            }
            
            t1 += 1
            t2 += 0.25
            
            requestAnimationFrame(animate)
        }

        animate()
    }, [])

    return (
        <svg style={{ height: `${height}px`, width: width }}>
            <path class="wave" d="M10,10 L50,100 L90,50" fill={colors[1]}></path>
            <path class="wave" d="M10,10 L50,100 L90,50" fill={colors[0]}></path>
        </svg>
    )
}