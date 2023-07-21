import Email from './view/Email'
import Introduction from './view/Introduction'
import Link from './view/Link';
import Name from './view/Name'
import ProfileImage from './view/ProfileImage'

export default function UserIntroView({ userIntroList }: any) {
    const style: any = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundImage: `url(${userIntroList[1].backgroundImageURL})`,
      };
    console.log(userIntroList)

    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="userinfo-box" style={style}>
                        <ProfileImage imgUrl={userIntroList[1].profileImageURL} />
                        <Name name={userIntroList[1].username} />
                        <Email email={userIntroList[1].email} />
                        <Introduction introduction={userIntroList[1].introduction} />
                        <Link linkList={userIntroList[1].links}/>
                    </div>
                    <div>
                        <span>이병선</span>
                    </div>
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
