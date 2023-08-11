import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function FadingTextAnimation({ text, speed, delay }: any) {
    text = '    ' + text
    const [activeIndex, setActiveIndex] = useState(0)
    const router = useRouter()

    useEffect(() => {
        setActiveIndex(0)
    }, [router.asPath])

    useEffect(() => {
        if (typeof window !== 'undefined') { // 클라이언트에서만 실행되도록 처리
            if (activeIndex < text.length) {
                const timeout = setTimeout(() => {
                    setActiveIndex(activeIndex + 1)
                }, speed) // 한 글자씩 fade 되는 시간 간격 (밀리초)

                return () => clearTimeout(timeout)
            }
        }
    }, [activeIndex, text.length])

    return (
        <div className="fading-text">
            {text.split('').map((char: string, index: number) => (
                <span key={index} className={`fade-in ${index < activeIndex ? 'active' : ''}`}>
                    {char}
                </span>
            ))}
            <style jsx>{`
                .fading-text {
                    display: inline-block;
                }
                
                .fade-in {
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }
                .fade-in.active {
                    opacity: 1;
                    transition-delay: ${delay}ms;
                }
            `}</style>
        </div>
    )
}
