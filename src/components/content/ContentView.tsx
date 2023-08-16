import PostCard from '../posts/list/PostCard'
import { keyframes } from '@emotion/react'
import { Reveal } from 'react-awesome-reveal'

type post = {
    postId: number
    title: string
    thumbnail: string
    categoryTitle: string
    boardTitle: string
    preview: string
    username: string
    commentCount: number
    createdAt: Date
    updatedAt: Date
    likeCount: number
    viewCount: number
    profileImage: string
}

interface Props {
    postList: post[]
    contentTitle: string
    contentLabel: string
}

const customAnimation: any = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -40%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

export default function ContentView({ postList, contentTitle, contentLabel }: Props) {
    return (
        <>
            <div className="container">
                <div className="box">
                    <div className="header">
                        <h4 className="title">{contentTitle}</h4>
                        <span>{contentLabel}</span>
                    </div>
                    <div className="card-box">
                        <Reveal keyframes={customAnimation} cascade damping={0.1} triggerOnce>
                            {postList?.map((post: post) => (
                                <PostCard post={post} key={post.postId} />
                            ))}
                        </Reveal>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .container {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                    }

                    .box {
                        margin-bottom: 50px;
                        width: 1200px;
                        flex-wrap: wrap;
                    }

                    .header {
                        margin-top: 20px;
                        margin-bottom: 40px;
                        text-align: center;
                    }

                    .title {
                        font-family: 'NanumSquare';
                        font-size: 32px;
                        font-weight: bold;
                        margin: 0;
                        margin-bottom: 10px;
                    }

                    .card-box {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-gap: 50px;
                        place-items: center;
                    }

                    @media (max-width: 1080px) {
                        .card-box {
                            grid-template-columns: repeat(2, 1fr);
                        }

                        .box {
                            width: 700px;
                        }
                    }

                    @media (max-width: 700px) {
                        .card-box {
                            grid-template-columns: repeat(1, 1fr);
                        }
                    }
                `}
            </style>
        </>
    )
}
