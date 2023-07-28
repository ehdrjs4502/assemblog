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
                            <div key={idx} className="userinfo-box">
                                <ProfileImage imgUrl={userIntro.profileImageURL} />
                                <Name name={userIntro.username} />
                                <Email email={userIntro.email} />
                                <Introduction introduction={userIntro.introduction} />
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

                    .userinfo-box {
                        position: relative;
                        width: 50%;
                        height: 100vh;
                        padding-top: 70px;
                        display: flex;
                        flex-direction: column;
                        color: rgb(207, 207, 207);
                        align-items: center;
                        
                    }
                `}
            </style>
        </>
    )
}
