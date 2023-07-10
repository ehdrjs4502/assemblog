import Navigation from '@/components/Navigation'
import ViewPost from '@/components/posts/view/ViewPost'
import ViewHeader from '@/components/posts/view/ViewHeader'
import HeadTitle from '@/components/HeadTitle'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ModifyBtn from '@/components/posts/button/ModifyBtn'
import DelBtn from '@/components/posts/button/DelBtn'
import { Cookies } from 'react-cookie'
import ViewTag from '@/components/posts/view/ViewTag'
import { useRouter } from 'next/router'
import EditComment from '@/components/comment/EditComment'
import Comment from '@/components/comment/Comment'
import { getComment } from '@/function/getComment'

interface Props {
    post: {
        title: string
        username: string
        updatedAt: string
        boardTitle: string
        categoryTitle: string
        thumbnail: string
        viewCount: number
        writerMail: string
        content: string
        tagList: []
        postId: number
    }
}

type userInfo = {
    email: string
    accessToken: string
    refreshToken: string
}

type comment = {
    id: number
    nickname: string
    content: string
    createdAt: string
    depth: number
    likeState: boolean
    parentCommentId: number
}

export default function Post({ post }: Props) {
    const [mounted, setMounted] = useState<boolean>(false) //Hydration failed because the initial UI 에러 해결하기 위함
    const [commentList, setCommentList] = useState<comment[]>([]) // 댓글 목록

    const cookie = new Cookies()
    const router = useRouter()
    const contentRef = useRef(null)
    const userInfo: userInfo = {
        email: cookie.get('email'),
        accessToken: cookie.get('accessToken'), // 액세스 토큰 저장
        refreshToken: cookie.get('refreshToken'), // 리프레쉬 토큰 저장
    }

    useEffect(() => {
        // 댓글 가져오기
        const fetchComments = async () => {
            const comments = await getComment(post.postId)
            setCommentList(comments)
        }
        fetchComments()

        //Hydration failed because the initial UI 에러 해결하기 위함
        setMounted(true)
    }, [])

    if (router.isFallback) {
        // npm run build시에 TypeError: Cannot read properties of undefined (reading 'title') 떠서 해결하기 위함
        return <div>Loading...</div>
    }

    return (
        <>
            <HeadTitle title={post.title} />
            <Navigation contentRef={contentRef} />

            {/* 게시글 헤더 영역 */}
            <ViewHeader
                data={{
                    title: post.title,
                    writer: post.username,
                    date: post.updatedAt,
                    boradTitle: post.boardTitle,
                    categoryTitle: post.categoryTitle,
                    thumbnail: post.thumbnail,
                    viewCount: post.viewCount,
                }}
            />

            {/* 게시글 내용 영역 */}
            <div className="box" ref={contentRef}>
                <div className="content-box">
                    {/* 글 작성자와 로그인한 사용자가 일치하면 글 수정,삭제 버튼 보이도록 함  */}
                    {mounted && userInfo.email === post.writerMail ? (
                        <div className="btn-box">
                            <ModifyBtn post={post} />
                            <DelBtn id={post.postId} userInfo={userInfo} />
                        </div>
                    ) : null}
                    <ViewPost content={post.content} />
                    <ViewTag tagList={post.tagList} />
                </div>
                <div className="comment-box">
                    <EditComment postId={post.postId} setCommentList={setCommentList} />
                    <Comment commentList={commentList} />
                </div>
            </div>

            <style jsx>
                {`
                    .box {
                        width: 100%;
                        /* 자식 요소(.child)를 중앙 정렬하기 */
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                    }

                    .content-box {
                        margin-top: 30px;
                        width: 60%;
                    }

                    .comment-box {
                        margin-top: 30px;
                        margin-bottom: 100px;
                        width: 60%;
                    }
                `}
            </style>
        </>
    )
}

//ssg 방식으로 빌드 시에 정적 html 파일 생성 npm run build && npm run start 해야함
export async function getStaticProps({ params }: any) {
    const API_URL = process.env.API
    try {
        const res = await axios.get(`${API_URL}posts/${params.pid}`)

        const post = res.data

        return {
            props: { post },
            revalidate: 10,
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export async function getStaticPaths() {
    const API_URL = process.env.API
    const res: any = await axios.get(`${API_URL}lists/posts`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    const paths = res.data.postList.map((post: any) => ({
        params: { pid: post.postId.toString() },
    }))

    return {
        paths,
        fallback: true,
    }
}

// ssr 방식
// export const getServerSideProps = async (ctx: any) => {
//     try {
//         const pid: string = ctx.params.pid // 포스트 ID URL
//         console.log(pid)
//         const res = await axios.get(`https://684a-14-35-50-227.ngrok-free.app/posts/${pid}`, {
//             headers: {
//                 'ngrok-skip-browser-warning': '1234',
//             },
//         }) // 해당 게시글 데이터 가져오기

//         if (!res) {
//             return {
//                 notFound: true,
//             }
//         }

//         const post = res.data

//         console.log(post)

//         return {
//             props: {
//                 post: post,
// //                 post: {
// //                     postId: 1,
// //                     title: '테스트 제목',
// //                     content: `## 안녕하세요
// // **글을 작성해봅시다.**
// // ~~~js
// // const test = 10
// // ~~~

// // 이런식으로 작성할 수 있습니다.

// // ![](https://storage.googleapis.com/assemblog_bucket/images/default_thumbnail.png)
// //                 `,
// //                     thumbnail: 'https://storage.googleapis.com/assemblog_bucket/images/default_thumbnail.png',
// //                     tagList: ['태그','우와'],
// //                     writerMail: 'a@naver.com',
// //                     username:'tester',
// //                     categoryTitle: '카테고리',
// //                     boardTitle: '게시판',
// //                 },
//             },
//         }
//     } catch (error) {
//         return {
//             notFound: true,
//         }
//     }
// }
