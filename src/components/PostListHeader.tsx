import { Fade } from 'react-awesome-reveal'

export default function PostListHeader() {
    return (
        <>
            <div className="header-box">
                <div className="title-box">
                    <Fade
                        cascade
                        damping={0.05}
                        style={{ fontSize: '38px', whiteSpace: 'pre-wrap', fontWeight: 'bold', color: 'white' }}>
                        "프로그래머는 오류를 만든다. 그리고 그 오류를 찾는 것이 재미있다."
                    </Fade>
                    <br />
                    <Fade
                        cascade
                        delay={2000}
                        damping={0.1}
                        direction={'down'}
                        style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: 'white',
                            float: 'right',
                            marginTop: '20px',
                            marginRight: '10px',
                        }}>
                        - 그레이스 호퍼
                    </Fade>
                </div>
            </div>

            <style jsx>{`
                .header-box {
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
