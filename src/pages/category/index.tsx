import HeadTitle from '@/components/HeadTitle'
import Content from '@/components/Content'
import Navigation from '@/components/Navigation'
import axios from 'axios'
import { useRef } from 'react'

export default function allCategory({postList}: any) {
    const title = '전체 카테고리'
    const contentRef = useRef(null)
    const contentTitle = '분류 전체 보기'
    console.log(postList)

    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <div ref={contentRef}>
                <Content postList={postList} contentTitle={contentTitle} />
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const API_URL = process.env.API
    const res: any = await axios.get(`${API_URL}lists/posts`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    console.log(res)
    const postList = res.data.postList || null

    return {
        props: { postList },
        revalidate: 120,
    }
}
