import { Tooltip } from '@mui/material'
import Link from 'next/link'

export default function Footer() {
    const linkStlye = {
        width: '60px',
    }

    return (
        <>
            <footer>
                <div className="box">
                    <span className="title">Using Skills</span>
                    <div className="skill-box">
                        <span>Front-End</span>
                        <div className="img-box">
                            <Tooltip title="Next.js" placement="top" arrow>
                                <Link href="https://nextjs.org/" target="_blank" style={linkStlye}>
                                    <img src="/img/next.png" width="60px"></img>
                                </Link>
                            </Tooltip>
                            <Tooltip title="React.js" placement="top" arrow>
                                <Link href="https://ko.legacy.reactjs.org/" target="_blank" style={linkStlye}>
                                    <img src="/img/react.png" width="60px"></img>
                                </Link>
                            </Tooltip>
                            <Tooltip title="TypeScript" placement="top" arrow>
                                <Link href="https://www.typescriptlang.org/" target="_blank" style={linkStlye}>
                                    <img src="/img/ts.png" width="60px"></img>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="skill-box">
                        <span>Back-End</span>
                        <div className="img-box">
                            <Tooltip title="Spring Boot" placement="top" arrow>
                                <Link href="https://spring.io/projects/spring-boot" target="_blank" style={linkStlye}>
                                    <img src="/img/spring2.png" width="60px"></img>
                                </Link>
                            </Tooltip>
                            <Tooltip title="MySQL" placement="top" arrow>
                                <Link href="https://www.mysql.com/" target="_blank" style={linkStlye}>
                                    <img src="/img/mysql.png" width="80px"></img>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                footer {
                    width: 100%;
                    height: 100%;
                    background-color: rgb(31, 31, 31);
                    justify-content: center;
                    display: flex;
                    padding-top: 30px;
                    padding-bottom: 30px;
                    margin-top: 100px;
                }

                .title {
                    text-align: center;
                    color: white;
                    font-weight: bold;
                    font-size: 28px;
                    margin-right: 30px;
                }

                .box {
                    display: flex;
                    align-items: center;
                    width: 70%;
                    justify-content: space-around;
                    margin-top: 30px;
                    margin-bottom: 30px;
                }

                .skill-box {
                    color: white;
                    font-weight: bold;
                }

                .img-box {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    width: 300px;
                    margin-top: 20px;
                }

                .img-box img:hover {
                    cursor: pointer;
                }

                @media (max-width: 950px) {
                    .box {
                        flex-direction: column;
                    }

                    .skill-box {
                        margin-top: 50px;
                    }

                    .title {
                        margin-right: 0px;
                    }
                }
            `}</style>
        </>
    )
}
