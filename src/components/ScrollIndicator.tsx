import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
    const [scrollPercent, setScrollPercent] = useState(0)

    // 스크롤 이벤트 핸들러 함수
    const handleScroll = () => {
        const scrollTop = window.scrollY // 현재 스크롤 위치

        const windowHeight = window.innerHeight // 화면 높이

        const fullHeight = document.documentElement.scrollHeight // 문서 전체 높이

        const scrolled = (scrollTop / (fullHeight - windowHeight)) * 100 // 스크롤된 비율 계산 (0부터 100까지의 값)

        setScrollPercent(scrolled) // 스크롤된 비율을 상태에 업데이트
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll) // 스크롤 이벤트 리스너 등록

        // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 해제
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // 무지개 색상 계산
    const r = Math.round((255 * scrollPercent) / 100)
    const g = Math.round(255 * (1 - (Math.abs(50 - scrollPercent) * 2) / 100))
    const b = Math.round(255 * (1 - scrollPercent / 100))

    // RGB 값을 CSS 색상 문자열로 변환
    const backgroundColor = `rgb(${r}, ${g}, ${b})`

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '4px',
                width: `${scrollPercent}%`, // 스크롤된 비율만큼 width 설정
                backgroundColor: backgroundColor, // 배경색 설정
                zIndex: 9999,
            }}></div>
    )
}
