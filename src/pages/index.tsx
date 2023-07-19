import HeadTitle from '@/components/HeadTitle'
import Introduction from '@/components/Introduction'
import Navigation from '@/components/Navigation'
import Content from '@/components/Content'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export default function Home({ postList }: any) {
    const title = 'Main'
    const contentRef = useRef(null)
    const contentTitle = '최신글'

    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <Introduction />
            <div ref={contentRef}>
                <Content postList={postList} contentTitle={contentTitle} />
            </div>
        </div>
    )
}

// 게시글 목록 ssg 방식으로 가져오기
export async function getStaticProps() {
    const API_URL = process.env.API
    // const res: any = await axios.get(`${API_URL}lists/posts`, {
    //     headers: {
    //         'ngrok-skip-browser-warning': '1234',
    //     },
    // })

    // const postList = res.data.postList || null
    
    const postList = [{}]

    return {
        props: { postList },
        revalidate: 120,
    }
}
