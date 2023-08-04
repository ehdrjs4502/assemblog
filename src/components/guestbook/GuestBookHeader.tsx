import { Fade } from 'react-awesome-reveal'
import HeaderWave from '../HeaderWave'
import { useEffect, useState } from 'react'

export default function GusetBookHeader() {
    const [windowWidth, setWindowWidth] = useState<number>(0)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        handleResize() // 초기 렌더링 시 windowWidth를 설정하기 위해 호출
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const titleStyle: any = {
        fontSize: windowWidth <= 950 ? '20px' : '48px',
        fontWeight: 'bold',
        color: 'white',
    }

    const labelStyle: any = {
        fontSize: windowWidth <= 950 ? '10px' : '18px',
        fontWeight: 'bold',
        color: 'white',
    }
    return (
        <>
            <div className="header-box">
                <div className="title-box">
                    <Fade cascade damping={0.05} style={titleStyle} triggerOnce>
                        블로그를 방문해주셔서 감사합니다.
                    </Fade>
                    <div style={{ marginTop: '40px' }}>
                        <Fade cascade damping={0.03} delay={1500} style={labelStyle} triggerOnce>
                            블로그 방명록은 소중한 손님들과의 소통 창구입니다. 자유롭게 글을 남겨주세요.
                        </Fade>
                    </div>
                </div>
            </div>
            <HeaderWave />

            <style jsx>{`
                .header-box {
                    position: relative;
                    text-align: center;
                    background-color: rgb(34, 34, 34);
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </>
    )
}
