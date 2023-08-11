import { useEffect, useState } from 'react'

export default function MouseTracker() {
    const [eyeBallPosition, setEyeBallPosition] = useState({ left: '50%', top: '50%' })

    const handleMouseMove = (event: any) => {
        const x = (event.clientX * 100) / window.innerWidth + '%'
        const y = (event.clientY * 100) / window.innerHeight + '%'

        setEyeBallPosition({ left: x, top: y })
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

            <style jsx>{`
                #eye {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    height: 250px;
                    width: 250px;
                    background: white;
                    border-radius: 50%;
                    overflow: hidden;
                    box-shadow: 0 0 30px 1px #222236ad;
                }

                #eyeBall {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    height: 70px;
                    width: 70px;
                    transform: translate(-50%, -50%);
                    background: black;
                    border-radius: 50%;
                    transition: 0;
                }
            `}</style>
        </>
    )
}
