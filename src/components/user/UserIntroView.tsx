import BackgroundImg from './view/BackgroundImg'
import Email from './view/Email'
import Introduction from './view/Introduction'
import Link from './view/Link'
import Name from './view/Name'
import ProfileImage from './view/ProfileImage'

export default function UserIntroView({ userIntroList }: any) {
    console.log(userIntroList)

    return (
        <>
            <div className="header">
                <div className="container">
                    {userIntroList.map((userIntro: any, idx: number) => {
                        const style: any = {
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '100vw',
                            height: '100vh',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundImage: `url(${userIntro.backgroundImageURL})`,
                        }
                        return (
                            <div key={idx} className="box">
                                <div className='info-box'>
                                    <ProfileImage imgUrl={userIntro.profileImageURL} />
                                    <Name name={userIntro.username} />
                                    <Email email={userIntro.email} />
                                </div>
                                <Introduction introduction={userIntro.introduction} idx ={idx}/>
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
                        background-color: gray;
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
                            padding-left: 10px;
                            padding-right: 10px;
                            padding-bottom: 30px;
                        }
                    }
                `}
            </style>
        </>
    )
}
