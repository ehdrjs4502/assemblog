import { useEffect, useState } from 'react'

export default function MouseTracker() {
    const [eyeBallPosition, setEyeBallPosition] = useState({ left: '50%', top: '50%' })

    const handleMouseMove = (event: any) => {
        let x = (event.clientX * 100) / window.innerWidth
        let y = (window.innerHeight * event.clientY) / 0.9 / window.innerHeight
        if (x < 20) {
            x = 20
        } else if (x > 80) {
            x = 80
        }
        if (y > 80) {
            y = 80
        }
        console.log((window.innerHeight * event.clientY) / 2, event.clientY * 500)
        setEyeBallPosition({ left: x + '%', top: y + '%' })
    }

    const handleMouseOut = () => {
        setEyeBallPosition({ left: '50%', top: '50%' })
    }

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseout', handleMouseOut)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseout', handleMouseOut)
        }
    }, [])

    return (
        <>
            <div id="eye">
                <div id="eyeBall" style={{ left: eyeBallPosition.left, top: eyeBallPosition.top }}></div>
            </div>
            <div id="eye2">
                <div id="eyeBall" style={{ left: eyeBallPosition.left, top: eyeBallPosition.top }}></div>
            </div>

            <style jsx>{`
                #eye {
                    border: 0.5px solid gray;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    height: 30px;
                    width: 30px;
                    background: white;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-left: -30px;
                }

                #eye2 {
                    border: 0.5px solid gray;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    height: 30px;
                    width: 30px;
                    background: white;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-left: 30px;
                }

                #eyeBall {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    height: 15px;
                    width: 15px;
                    transform: translate(-50%, -50%);
                    background: black;
                    border-radius: 50%;
                    transition: 0;
                }
            `}</style>
        </>
    )
}
