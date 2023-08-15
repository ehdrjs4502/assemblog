import HeadTitle from '@/components/HeadTitle'
import ContentView from '@/components/content/ContentView'
import Navigation from '@/components/navigation/Navigation'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import PostListHeader from '@/components/posts/list/PostListHeader'
import PaginationView from '@/components/posts/list/PaginationView'
import OrderSelect from '@/components/posts/OrderSelect'

type post = {
    postId: number
    title: string
    thumbnail: string
    categoryTitle: string
    boardTitle: string
    preview: string
    username: string
    commentCount: number
    createdAt: Date
    updatedAt: Date
    likeCount: number
    viewCount: number
    profileImage: string
}

export default function AllCategory() {
    const [page, setPage] = useState<number>(1) // 페이지
    const [postList, setPostList] = useState<post[]>([]) // 게시글 목록
    const [totalPage, setTotalPage] = useState<number>(10) // 전체 페이지
    const [order, setOrder] = useState('created_at') // 정렬 순서

    const title = '전체 카테고리'
    const contentRef = useRef(null)
    const contentTitle = '분류 전체 보기'
    const router = useRouter()
    const contentLabel = '전체 게시글을 확인해보세요!'

    const getPostList = async (order: string) => {
        let page = 1
        if (router.query.page !== undefined) {
            page = parseInt(router.query.page! as string)
        }
        const response = await axios.get(`/server/lists/posts?currentPage=${page}&pageSize=6&order=${order}`, {
            headers: {
                'ngrok-skip-browser-warning': '123456',
            },
        })
        console.log(response.data)
        setPostList(response.data.postList)
        setTotalPage(response.data.totalPage)
    }

    useEffect(() => {
        // URL에 직접 페이지 접근할 때 정상적으로 작동하기 위함
        if (router.query.page) {
            setPage(parseInt(router.query.page?.toString()))
        }
    }, [router.query.page])

    useEffect(() => {
        getPostList(order)
        if (router.query.page === undefined) {
            setPage(1)
        }
    }, [router.isReady, router, order])

    console.log(postList)
    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <PostListHeader />
            <div ref={contentRef}>
                <OrderSelect order={order} setOrder={setOrder} router={router} />
                <ContentView postList={postList} contentTitle={contentTitle} contentLabel={contentLabel} />
                <PaginationView totalPage={totalPage} page={page} setPage={setPage} router={router} />
            </div>
        </div>
    )
}
