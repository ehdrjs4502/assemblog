import { useEffect, useRef, useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'

interface Props {
    introduction: string
    idx: number
}

export default function Introduction({ introduction, idx }: Props) {
    const [scrollPosition, setScrollPosition] = useState<number>(0) // 현재 스크롤 위치를 저장하는 상태 변수
    const [isClient, setIsClient] = useState(false) // 클라이언트 측에서 실행되었는지 여부를 저장하는 상태 변수
    const introRef = useRef(null) // 도입부 컨테이너를 참조하는 useRef

    const updateScroll = () => {
        // 현재 스크롤 위치 업데이트 함수
        setScrollPosition(window.scrollY || document.documentElement.scrollTop)
    }

    useEffect(() => {
        window.addEventListener('scroll', updateScroll)
    })

    useEffect(() => {
        // 클라이언트 측에서 실행되면 isClient 상태를 true로 업데이트
        setIsClient(true)
    }, []) // 빈 배열을 넣어서 컴포넌트가 처음 마운트될 때만 이펙트 실행

    // 브라우저의 폭이 950px 이하이고, 클라이언트 측에서 실행 중일 때 텍스트 또는 Typewriter 컴포넌트를 렌더링
    const shouldRenderTypewriter = isClient && window.innerWidth <= 950

    return (
        <>
            {shouldRenderTypewriter ? ( // Typewriter가 참이면 (폭이 950px 이하)
                <>
                    {idx === 0 ? ( // idx가 0이라면 (첫번째 유저 소개이면 그냥 보이게 함)
                        <div className="introduction-box" ref={introRef}>
                            <span>
                                <Typewriter words={[introduction]} typeSpeed={60} />
                            </span>
                        </div>
                    ) : ( // idx가 0이 아니면 (두번째 유저 소개이면 스크롤이 450 이상 내려갔을 때 보이게 함)
                        <div className="introduction-box" ref={introRef}>
                            <span>{scrollPosition > 450 && <Typewriter words={[introduction]} typeSpeed={60} />}</span>
                        </div>
                    )}
                </>
            ) : (
                <div className="introduction-box" ref={introRef}>
                    <span>
                        <Typewriter words={[introduction]} typeSpeed={60} />
                    </span>
                </div>
            )}
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
                        width: 100%;
                        max-height: 150px;
                        word-break: break-all;
                        height: 100%;
                        font-size: 20px;
                    }
                }
            `}</style>
        </>
    )
}
