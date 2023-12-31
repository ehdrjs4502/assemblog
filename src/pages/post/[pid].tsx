import Navigation from '@/components/navigation/Navigation'
import PostView from '@/components/posts/view/PostView'
import HeaderView from '@/components/posts/view/HeaderView'
import HeadTitle from '@/components/HeadTitle'
import { useEffect, useRef, useState } from 'react'
import ModifyBtn from '@/components/posts/buttons/ModifyBtn'
import DelBtn from '@/components/posts/buttons/DelBtn'
import { Cookies } from 'react-cookie'
import TagView from '@/components/posts/view/TagView'
import { useRouter } from 'next/router'
import CommentView from '@/components/comment/CommentView'
import axios from 'axios'
import PrevNextPostView from '@/components/posts/view/PrevNextPostView'
import HeaderWave from '@/components/HeaderWave'

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
        tagList: string[]
        postId: number
    }
}

export default function Post({ post }: Props) {
    const cookie = new Cookies()
    const [mounted, setMounted] = useState<boolean>(false) //Hydration failed because the initial UI 에러 해결하기 위함
    const [isWriter, setIsWriter] = useState<boolean>(post?.writerMail !== cookie.get('email') ? false : true) // 로그인한 사용자가 글쓴이인지 확인
    const router = useRouter()
    const contentRef = useRef(null)
    useEffect(() => {
        //Hydration failed because the initial UI 에러 해결하기 위함
        // if(post.writerMail! !== cookie.get('email')) {
        //     setIsWriter(false)
        // }
        setMounted(true)
    }, [])

    if (router.isFallback) {
        // fallback true로 하고 build시에 TypeError: Cannot read properties of undefined (reading 'title') 떠서 해결하기 위함
        return <div>Loading...</div>
    }

    return (
        <>
            <HeadTitle title={post.title} />
            <Navigation contentRef={contentRef} />

            {/* 게시글 헤더 영역 */}
            <HeaderView
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
                    {mounted && isWriter && (
                        <div className="btn-box">
                            <ModifyBtn post={post} />
                            <DelBtn id={post.postId} />
                        </div>
                    )}
                    <PostView content={post.content} />
                    <TagView tagList={post.tagList} />
                    <PrevNextPostView title={post.boardTitle} postId={post.postId} />
                </div>
                {/* 댓글 영역 */}
                <div className="comment-box">
                    <CommentView postId={post.postId} isWriter={isWriter} isPostComment={true} />
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

                    .btn-box {
                        display: flex;
                        justify-content: flex-end;
                    }

                    .comment-box {
                        margin-top: 30px;
                        margin-bottom: 100px;
                        width: 60%;
                    }

                    @media (max-width: 950px) {
                        .content-box {
                            margin-top: 30px;
                            width: 90%;
                        }

                        .comment-box {
                            margin-top: 30px;
                            margin-bottom: 100px;
                            width: 90%;
                        }
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
    const res = await axios.get(`${API_URL}lists/posts`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    const paths = res.data.postList!.map((post: any) => ({
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
// const pid: string = ctx.params.pid // 포스트 ID URL
// console.log(pid)
// const res = await axios.get(`https://684a-14-35-50-227.ngrok-free.app/posts/${pid}`, {
//     headers: {
//         'ngrok-skip-browser-warning': '1234',
//     },
// }) // 해당 게시글 데이터 가져오기

// if (!res) {
//     return {
//         notFound: true,
//     }
// }

// const post = res.data

// console.log(post)

//         return {
//             props: {
//                 // post: post,
//                 post: {
//                     postId: 1,
//                     title: '테스트 제목',
//                     content: `## 안녕하세요
// **글을 작성해봅시다.**
// ~~~js
// const test = 10
// ~~~

// 이런식으로 작성할 수 있습니다.

// ![](https://cdn.discordapp.com/attachments/1136307485398007878/1136307555824582796/indo.png)
//                 `,
//                     thumbnail: 'https://cdn.discordapp.com/attachments/1136307485398007878/1136307555824582796/indo.png',
//                     tagList: ['태그', '우와'],
//                     writerMail: 'a@naver.com',
//                     username: 'tester',
//                     categoryTitle: '카테고리',
//                     boardTitle: '게시판',
//                 },
//             },
//         }
//     } catch (error) {
//         return {
//             notFound: true,
//         }
//     }
// }
