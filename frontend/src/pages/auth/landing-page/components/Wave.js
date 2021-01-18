import React, { useEffect } from 'react'

export default function Wave(props) {
    const height = props.height ? props.height: 200
    const width = props.width ? props.width : "100%"
    const colors = props.colors ? props.colors : ["var(--w-10)", "var(--w-10)"]
    const objs = []
    const id = []
    const length = []
    const totalSpeed = []
    const speed = []

    useEffect(() => {
        let xs = []
        let lenght = 200

        for (var i = 0; i <= lenght; i++) {
            xs.push(i)
        }

        const points = i => xs.map(x => {
            console.log(totalSpeed[i], length[i], speed[i], id[i])
            let y = (50 + 10 * i + 20 * Math.sin((x + totalSpeed[i]) / length[i]))
            
            return [10 * x, y]
            })

        function animate() {
        
            
            for (let i in objs) {
                if (i <= objs.length) {
                    let el = document.querySelector(`#a${id[i]}`)
                    let path = `M 0 ${height} ` + points(i).map(p => {
                        return p[0] + "," + p[1]
                    }).join(" L") + ` V ${height} Z`
                    el && el.setAttribute("d", path)
                    totalSpeed[i] += speed[i]
                }
            }
            
            requestAnimationFrame(animate)
        }

        animate()
    }, [])

    const wave = (color, id) => {
        return ( <path class="wave" id={`a${id}`} d="M10,10 L50,100 L90,50" fill={color}></path> )
    }

    const waveConstructor = () => {
        for (let color of colors) {
            let a = (20 + Math.floor(Math.random() * 181))
            id.push(a)
            length.push(50 + 50 * Math.random())
            speed.push(a / 100)
            totalSpeed.push(0)
            objs.push(wave(color, String(a)))
        }
      
        return objs;
      }

    return (
        <svg style={{ height: `${height}px`, width: width }}>
            {
                waveConstructor()
            }
        </svg>
    )
}