import Navigation from '@/components/Navigation'
import HeadTitle from '@/components/HeadTitle'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Category({ postList }: any) {
    console.log(postList)
    const router = useRouter()
    return (
        <>
            <HeadTitle title={router.query.cid![1] + ' 게시글 목록'} />
            <Navigation contentRef={''} />
            <h4>{router.query.cid![1] + ' 게시글 목록'}</h4>
        </>
    )
}

export async function getServerSideProps(context: any) {
    // URL 파라미터
    // const API_URL = process.env.API
    // const res: any = await axios.get(`${API_URL}lists/posts/?boardId=${}`, {
    //     headers: {
    //         'ngrok-skip-browser-warning': '1234',
    //     },
    // })

    // const postList = res.data.postList

    console.log(context.query)

    const postList = context.query

    return {
        props: { postList },
    }
}
