import Navigation from '@/components/Navigation'
import ViewPost from '@/components/posts/View/ViewPost'
import axios from 'axios'

export default function Post({ post }: any) {
    return (
        <>
            <Navigation contentRef={''} />
            <h4>해당하는 포스트 보여주기</h4>
            <ViewPost post={post}/>
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const pid: string = ctx.params.pid // 포스트 ID URL
    console.log(pid)
    const res = await axios.get(`https://2403-14-35-50-227.ngrok-free.app/posts/${pid}`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    }) // 해당 게시글 데이터 가져오기

    const post = res.data

    console.log(post)

    return {
        props: {
            post: post,
        },
    }
}
