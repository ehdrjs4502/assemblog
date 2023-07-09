import HeadTitle from '@/components/HeadTitle'
import Introduction from '@/components/Introduction'
import Navigation from '@/components/Navigation'
import Content from '@/components/Content'
import { useRef } from 'react'
import axios from 'axios'

export default function Home({postList}: any) {
    const title = 'Main';
    const contentRef = useRef(null);
    console.log(postList)

    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef}/>
            <Introduction />
            <div ref={contentRef}>
                <Content postList={postList}/>
            </div>
        </div>
    )
}


// 게시글 목록 ssg 방식으로 가져오기
export async function getStaticProps() {
    const res: any = await axios.get(`https://684a-14-35-50-227.ngrok-free.app/lists/posts`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    const postList = res.data.postList

    return {
        props: { postList },
        revalidate: 10,
    }
}