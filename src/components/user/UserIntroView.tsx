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
                            width:'100vw',
                            height:'100vh',
                            backgroundRepeat : 'no-repeat',
                            backgroundSize : 'cover',
                            backgroundImage: `url(${userIntro.backgroundImageURL})`,
                        }
                        return (
                            <div className="userinfo-box" style={style}>
                                <ProfileImage imgUrl={userIntro.profileImageURL} />
                                <Name name={userIntro.username} />
                                <Email email={userIntro.email} />
                                <Introduction introduction={userIntro.introduction} />
                                <Link linkList={userIntro.links} />
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
                    }

                    .container div {
                        width: 50%;
                        height: 100vh;
                        border: 1px solid black;
                        background-color: hsl(209, 100%, 69%);
                        padding-top: 70px;
                    }
                `}
            </style>
        </>
    )
}
