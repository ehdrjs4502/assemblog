import HeaderWave from '@/components/HeaderWave'
import { Fade } from 'react-awesome-reveal'

export default function TagHeader() {
    return (
        <>
            <div className="header-box">
                <div className="title-box">
                    <Fade
                        cascade
                        damping={0.1}
                        triggerOnce
                        style={{
                            fontSize: '38px',
                            whiteSpace: 'pre-wrap',
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: 'center',
                        }}>
                        태그 저장소
                    </Fade>
                    <br />
                    <Fade
                        triggerOnce
                        cascade
                        delay={1000}
                        damping={0.05}
                        direction={'down'}
                        style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: 'center',
                            marginTop: '20px',
                            marginRight: '10px',
                        }}>
                        태그로 게시물을 방문해보세요!
                    </Fade>
                </div>
            </div>
            <HeaderWave />

            <style jsx>{`
                .header-box {
                    background-color: rgb(34, 34, 34);
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .title-box {
                    margin: 0;
                    text-align: center;
                }
            `}</style>
        </>
    )
}
