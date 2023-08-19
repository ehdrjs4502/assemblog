import BackgroundImg from './view/BackgroundImg'
import Email from './view/Email'
import Introduction from './view/Introduction'
import Link from './view/Link'
import Name from './view/Name'
import ProfileImage from './view/ProfileImage'

export default function UserIntroView({ userIntroList }: any) {
    return (
        <>
            <div className="header">
                <div className="container">
                    {userIntroList.map((userIntro: any, idx: number) => {
                        return (
                            <div key={idx} className={`box box${idx}`}>
                                <div className="info-box">
                                    <ProfileImage imgUrl={userIntro.profileImageURL} />
                                    <Name name={userIntro.username} />
                                    <Email email={userIntro.email} />
                                </div>
                                <Introduction introduction={userIntro.introduction} idx={idx} />
                                <Link linkList={userIntro.links} />
                                <BackgroundImg bgImgURL={userIntro.backgroundImageURL} />
                            </div>
                        )
                    })}
                </div>
            </div>

            <style jsx>
                {`
                    h3 {
                        margin: 0;
                    }

                    .header {
                        width: 100%;
                        height: 100%;
                        position: relative;
                        margin-bottom: 100px;
                    }

                    .container {
                        display: flex;
                        flex-wrap: nowrap;
                    }

                    .box {
                        position: relative;
                        width: 50%;
                        height: 100vh;
                        padding-top: 70px;
                        display: flex;
                        flex-direction: column;
                        color: rgb(207, 207, 207);
                        align-items: center;
                        justify-content: space-around;
                    }

                    .box0 {
                        border-right: 1px solid rgb(255, 255, 255);
                    }

                    .info-box {
                        display: flex;
                        flex-direction: column;
                        align-items: center;    
                    }

                    @media (max-width: 950px) {
                        .container {
                            display: block;
                        }
                        .box {
                            width: 100%;
                            border-bottom: 1px solid black;
                            padding-bottom: 30px;
                        }
                    }
                `}
            </style>
        </>
    )
}
