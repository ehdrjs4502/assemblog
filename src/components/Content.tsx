import PostCard from './posts/List/PostCard'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Post {
    postId: number
    title: string
    thumbnail: string
    categoryTitle: string
    boardTitle: string
    preview: string
    writer: string
    date: string
    commentCount: number
    createAt: Date
    updateAt: Date
    likeCount: number
    viewCount: number
}

export default function Content() {
    const [postList, setPostList] = useState<Post[]>([]) // 포스트 목록

    useEffect(() => {
        // 포스트 목록 불러오기
        axios
            .get(`/server/lists/posts/?pageSize=${9}`, {
                headers: {
                    'ngrok-skip-browser-warning': '1234',
                },
            })
            .then((res) => {
                setPostList(res.data.postList)
                console.log(res)
            })
            .catch((e) => console.log(e))
    }, [])

    return (
        <>
            <div className="container">
                <div className="latest-box">
                    <div className="latest-header">
                        <span>최신 글</span>
                    </div>
                    <div className="card-box">
                        {postList.map((post: any) => {
                            return (
                                <>
                                    <PostCard
                                        key={post.postId}
                                        data={{
                                            postId: post.postId,
                                            title: post.title,
                                            thumbnail: post.thumbnail,
                                            categoryTitle: post.categoryTitle,
                                            boardTitle: post.boardTitle,
                                            preview: post.preview,
                                            writer: post.username,
                                            date: post.createdAt,
                                            commentCount: post.commentCount,
                                            createAt: post.createAt,
                                            updateAt: post.updateAt,
                                            likeCount: post.likeCount,
                                            viewCount: post.viewCount,
                                        }}
                                    />
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .container {
                        width: 100%;
                        background-color: skyblue;
                        display: flex;
                        justify-content: center;
                    }
                    .latest-box {
                        margin-top: 30px;
                        width: 80%;
                        flex-wrap: wrap;
                    }

                    .latest-header {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 20px;
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
