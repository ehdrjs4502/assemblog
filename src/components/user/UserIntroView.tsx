import Email from './view/Email'
import Introduction from './view/Introduction'
import Link from './view/Link'
import Name from './view/Name'
import ProfileImage from './view/ProfileImage'

export default function UserIntroView({ userIntroList }: any) {
    const style: any = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundImage: `url(${userIntroList[1]?.backgroundImageURL})`,
    }
    console.log(userIntroList)

    return (
        <>
            <div className="header">
                <div className="container">
                    {userIntroList.map((userIntro: any, idx: number) => (
                        <div className="userinfo-box" style={style}>
                            <ProfileImage imgUrl={userIntro.profileImageURL} />
                            <Name name={userIntro.username} />
                            <Email email={userIntro.email} />
                            <Introduction introduction={userIntro.introduction} />
                            <Link linkList={userIntro.links} />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>
                {`
                    h3 {
                        margin: 0;
                    }

                    .header {
                        width: 100vw;
                        height: 100vh;
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
