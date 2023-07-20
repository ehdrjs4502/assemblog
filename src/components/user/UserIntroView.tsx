import Email from './view/Email'
import Introduction from './view/Introduction'
import Name from './view/Name'
import ProfileImage from './view/ProfileImage'

export default function UserIntroView({ usersIntro }: any) {
    console.log(usersIntro)
    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="userinfo-box">
                        <ProfileImage imgUrl={usersIntro[0].profileImageURL} />
                        <Name name={usersIntro[0].username}/>
                        <Email email={usersIntro[0].email}/>
                        <Introduction introduction={usersIntro[0].introduction}/>
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

                    .userinfo-box {
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                    }
                `}
            </style>
        </>
    )
}
