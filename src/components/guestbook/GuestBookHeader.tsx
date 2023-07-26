import { Fade } from 'react-awesome-reveal'
import HeaderWave from '../HeaderWave'

export default function GusetBookHeader() {
    return (
        <>
            <div className="header-box">
                <div className="title-box">
                    <Fade
                        cascade
                        damping={0.05}
                        style={{ fontSize: '3.5vw', whiteSpace: 'pre-wrap', fontWeight: 'bold', color: 'white' }}>
                        블로그를 방문해주셔서 감사합니다.
                    </Fade>
                    <div style={{ marginTop: '40px' }}>
                        <Fade
                            cascade
                            damping={0.03}
                            delay={1500}
                            style={{ fontSize: '1.2vw', whiteSpace: 'pre-wrap', fontWeight: 'bold', color: 'white' }}>
                            블로그 방명록은 소중한 손님들과의 소통 창구입니다. 자유롭게 글을 남겨주세요.
                        </Fade>
                    </div>
                </div>
            </div>
            <HeaderWave/>
            
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
