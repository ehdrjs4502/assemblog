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
}

interface Props {
    postList: post[]
    contentTitle: string
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

export default function ContentView({ postList, contentTitle }: Props) {
    return (
        <>
            <div className="container">
                <div className="latest-box">
                    <div className="latest-title">
                        <span>{contentTitle}</span>
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
                    .latest-box {
                        margin-top: 50px;
                        margin-bottom: 50px;
                        width: 80%;
                        flex-wrap: wrap;
                    }

                    .latest-title {
                        font-size: 32px;
                        font-weight: bold;
                        margin-top: 20px;
                        margin-bottom: 40px;
                    }

                    .card-box {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-gap: 20px;
                    }

                    @media (max-width: 1080px) {
                        .card-box {
                            grid-template-columns: repeat(2, 1fr);
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
