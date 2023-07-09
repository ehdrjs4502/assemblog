import Navigation from '@/components/Navigation'
import ViewPost from '@/components/posts/View/ViewPost'
import ViewHeader from '@/components/posts/View/ViewHeader'
import HeadTitle from '@/components/HeadTitle'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ModifyBtn from '@/components/posts/button/ModifyBtn'
import DelBtn from '@/components/posts/button/DelBtn'
import { Cookies } from 'react-cookie'
import ViewTag from '@/components/posts/View/ViewTag'
import { useRouter } from 'next/router'

type userInfo = {
    email: string
    accessToken: string
    refreshToken: string
}
export default function Post({ post }: any) {
    const [mounted, setMounted] = useState<boolean>(false) //Hydration failed because the initial UI 에러 해결하기 위함
    const cookie = new Cookies()
    const router = useRouter()
    const contentRef = useRef(null)
    const userInfo: userInfo = {
        email: cookie.get('email'),
        accessToken: cookie.get('accessToken'), // 액세스 토큰 저장
        refreshToken: cookie.get('refreshToken'), // 리프레쉬 토큰 저장
    }

    useEffect(() => {
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
            <div ref={contentRef}>
                <div className="box">
                    <div className="content-box">
                        {mounted && userInfo.email === post.writerMail ? (
                            <div className="btn-box">
                                <ModifyBtn post={post} />
                                <DelBtn id={post.postId} userInfo={userInfo} />
                            </div>
                        ) : null}
                        <ViewPost content={post.content} />
                        <ViewTag tagList={post.tagList} />
                    </div>
                </div>
            </div>

            <style jsx>
                {`
                    .box {
                        width: 100%;
                        /* 자식 요소(.child)를 중앙 정렬하기 */
                        display: flex;
                        justify-content: center;
                    }

                    .content-box {
                        margin-top: 30px;
                        width: 60%;
                    }
                `}
            </style>
        </>
    )
}

//ssg 방식으로 빌드 시에 정적 html 파일 생성 npm run build && npm run start 해야함
export async function getStaticProps({ params }: any) {
    try {
        const res = await axios.get(`https://684a-14-35-50-227.ngrok-free.app/posts/${params.pid}`)

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
    const res: any = await axios.get(`https://684a-14-35-50-227.ngrok-free.app/lists/posts`, {
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
