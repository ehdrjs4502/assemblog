import HeaderWave from '@/components/HeaderWave'
import FadingTextAnimation from '../FadingTextAnimation'

export default function TagHeader() {
    const title = '태그 저장소'
    const label = '원하는 게시글을 태그로 확인해보세요!'
    return (
        <>
            <div className="header-box">
                <div className="title-box">
                    <FadingTextAnimation text={title} speed={80} delay={0} />
                </div>
                <div className="label-box">
                    <FadingTextAnimation text={label} speed={50} delay={800} />
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
                    flex-direction: column;
                }

                .title-box {
                    font-size: 52px;
                    color: white;
                    font-weight: bold;
                    margin-bottom: 30px;
                }

                .label-box {
                    font-size: 18px;
                    color: white;
                    font-weight: bold;
                }
            `}</style>
        </>
    )
}
