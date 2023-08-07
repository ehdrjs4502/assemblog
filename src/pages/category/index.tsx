import HeadTitle from '@/components/HeadTitle'
import ContentView from '@/components/content/ContentView'
import Navigation from '@/components/navigation/Navigation'
import axios from 'axios'
import { ChangeEvent, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import PostListHeader from '@/components/posts/list/PostListHeader'
import PaginationView from '@/components/posts/list/PaginationView'

export default function AllCategory({ postList, totalPage, currentPage }: any) {
    const title = '전체 카테고리'
    const contentRef = useRef(null)
    const contentTitle = '분류 전체 보기'
    const router = useRouter()
    const [page, setPage] = useState(currentPage)
    const contentLabel = '전체 게시글을 확인해보세요!'

    //페이지 이동하는 함수
    const handleChange = (e: ChangeEvent<unknown>, value: number) => {
        router.push({ pathname: router.pathname, query: { ...router.query, page: value } })
        setPage(value)
    }

    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <PostListHeader />
            <div ref={contentRef}>
                <ContentView postList={postList} contentTitle={contentTitle} contentLabel={contentLabel} />
                <PaginationView totalPage={totalPage} page={page} setPage={setPage} router={router} />
            </div>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const API_URL = process.env.API
    let page = 1
    if (context.query.page !== undefined) {
        page = context.query.page
    }
    console.log(page)
    const res: any = await axios.get(`${API_URL}lists/posts?currentPage=${page}&pageSize=6`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })
    const postList = res.data.postList || null
    const totalPage = res.data.totalPage || null
    const currentPage = res.data.currentPage || null

    return {
        props: { postList, totalPage, currentPage },
    }
}
