import { useEffect, useState } from 'react'

export default function MouseTracker() {
    const [eyeBallPosition, setEyeBallPosition] = useState({ left: '50%', top: '50%' })
    const [innerWidth, setInnerWidth] = useState<number>(0)
    const [summon, setSummon] = useState(false)

    // 마우스 움직일 때 눈알 위치 변경 함수
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

    // 현재 모니터 너비 구하는 함수
    useEffect(() => {
        const resizeListener = () => {
            setInnerWidth(window.innerWidth)
        }
        window.addEventListener('resize', resizeListener)

        console.log('innerWidth', innerWidth)
    }, [innerWidth])

    // 눈눈이 소환하는 함수
    const onClickSummonBox = () => {
        setSummon(!summon)
        console.log(summon)
    }

    return (
        <>
            {innerWidth > 900 &&
                (summon ? (
                    <div className="summon-box" onClick={onClickSummonBox}>
                        <div className="eye">
                            <div
                                className="eyeBall"
                                style={{ left: eyeBallPosition.left, top: eyeBallPosition.top }}></div>
                        </div>
                        <div className="eye2">
                            <div
                                className="eyeBall"
                                style={{ left: eyeBallPosition.left, top: eyeBallPosition.top }}></div>
                        </div>
                    </div>
                ) : (
                    <div className="summon-box" onClick={onClickSummonBox}>
                        <span>눈눈이 소환</span>
                    </div>
                ))}

            <style jsx>{`
                .summon-box {
                    color: rgb(136, 136, 136);
                    font-size: 10px;
                }

                .summon-box:hover {
                    cursor: pointer;
                }
                .eye {
                    border: 0.5px solid gray;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    height: 20px;
                    width: 20px;
                    background: white;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-left: -25px;
                }

                .eye2 {
                    border: 0.5px solid gray;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    height: 20px;
                    width: 20px;
                    background: white;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-left: 25px;
                }

                .eyeBall {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    height: 12px;
                    width: 12px;
                    transform: translate(-50%, -50%);
                    background: black;
                    border-radius: 50%;
                    transition: 0;
                }
            `}</style>
        </>
    )
}
