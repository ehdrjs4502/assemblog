import FadingTextAnimation from '@/components/FadingTextAnimation'
import HeaderWave from '@/components/HeaderWave'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function PostListHeader() {
    const router = useRouter()
    const [num, setNum] = useState<number>(0)
    
    const famouseSaying = [
        `"프로그래머는 오류를 만든다. 그리고 그 오류를 찾는 것이 재미있다."`,
        `"코드가 완벽할 때가 아니라 더 수정할 때 프로젝트가 끝난다." `,
        `"프로그래밍은 컴퓨터에게 하는 말, 사람들에게 하는 말이 아니다." `,
        `"당신이 할 수 있다고 믿든, 할 수 없다고 믿든, 믿는 대로 될 것입니다."`,
        `"코드를 짜기 위해 천재일 필요는 없다! 그냥 시작하라."`,
    ]

    const wrtier = ['- 그레이스 호퍼','- 레이 호튼','- 마틴 파울러','- 헨리 포드','- 바네사 허스트']

    const getRandomIndex = (length: number) => {
        setNum(Math.floor(Math.random() * length))
    }

    useEffect(() => {
        getRandomIndex(famouseSaying.length)
    }, [])

    useEffect(() => {
        getRandomIndex(famouseSaying.length)
    }, [router.asPath])
    
    console.log(num)

    return (
        <>
            <div className="header-box">
                <div className="box">
                    <div className="title-box">
                        <FadingTextAnimation text={famouseSaying[num]} speed={40} delay={0} />
                    </div>
                    <div className="writer-box">
                        <FadingTextAnimation text={wrtier[num]} speed={100} delay={1500} />
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
