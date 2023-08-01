import HeaderWave from '@/components/HeaderWave'
import { Fade } from 'react-awesome-reveal'

export default function PostListHeader() {
    return (
        <>
            <div className="header-box">
                <div className='box'>
                    <div className="title-box">
                        <Fade
                            cascade
                            damping={0.05}
                            triggerOnce>
                            "프로그래머는 오류를 만든다. 그리고 그 오류를 찾는 것이 재미있다."
                        </Fade>
                    </div>
                    <div className="writer-box">
                        <Fade
                            cascade
                            delay={2000}
                            damping={0.1}
                            direction={'down'}>
                            - 그레이스 호퍼
                        </Fade>
                    </div>
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
                    font-size: 38px;
                    font-weight: bold;
                    color: white;
                }

                .writer-box {
                    font-size: 18px;
                    font-weight: bold;
                    color: white;
                    float: right;
                    margin-top: 20px;
                    margin-right: 10px;
                }

                @media (max-width: 950px) {
                    .title-box {
                        font-size: 20px;
                    }

                    .writer-box {
                        font-size: 12px;
                    }
                }

                @media (max-width: 720px) {
                    .title-box {
                        font-size: 12px;
                    }

                    .writer-box {
                        font-size: 8px;
                    }
                }
            `}</style>
        </>
    )
}
