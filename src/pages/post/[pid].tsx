import Navigation from '@/components/Navigation'
import ViewPost from '@/components/posts/View/ViewPost'
import ViewHeader from '@/components/posts/View/ViewHeader'
import HeadTitle from "@/components/HeadTitle";
import axios from 'axios'
import { useRef } from 'react'

export default function Post({ post }: any) {
    const contentRef = useRef(null);
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
                    tagList: post.tagList
                }}
            />
            <div ref={contentRef}>
                <ViewPost content={post.content} />
            </div>
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const pid: string = ctx.params.pid // 포스트 ID URL
    console.log(pid)
    const res = await axios.get(`https://b0ea-14-35-50-227.ngrok-free.app/posts/${pid}`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    }) // 해당 게시글 데이터 가져오기

    const post = res.data

    console.log(post)

    return {
        props: {
            post: post,
            //             post : {
            //                 title : "테스트 제목",
            //                 content: `## 안녕하세요
            // **글을 작성해봅시다.**
            // ~~~js
            // const test = 10
            // ~~~

            // 이런식으로 작성할 수 있습니다.

            // ![](https://storage.googleapis.com/assemblog_bucket/images/default_thumbnail.png)
            //                 `,
            //                 thumbnail: "https://storage.googleapis.com/assemblog_bucket/images/default_thumbnail.png"
            //             }
        },
    }
}
