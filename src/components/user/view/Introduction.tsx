import { useEffect, useRef, useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'

interface Props {
    introduction: string
    idx: number
}

export default function Introduction({ introduction, idx }: Props) {
    return (
        <>
            <div className="introduction-box">
                <span>
                    <Typewriter words={[introduction]} typeSpeed={60} />
                </span>
            </div>
            <style jsx>{`
                .introduction-box {
                    width: 450px;
                    max-height: 150px;
                    height: 100%;
                    word-break: break-all;
                    margin-top: 40px;
                    font-size: 20px;
                }

                @media (max-width: 950px) {
                    .introduction-box {
                        font-size: 12px;
                        width: 90%;
                        max-height: 150px;
                        word-wrap: normal;
                        height: 100%;
                        font-size: 20px;
                    }
                }
            `}</style>
        </>
    )
}
