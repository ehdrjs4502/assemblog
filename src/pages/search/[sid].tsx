import Navigation from '@/components/navigation/Navigation'
import PostListHeader from '@/components/posts/list/PostListHeader'
import HeadTitle from '@/components/HeadTitle'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ContentView from '@/components/content/ContentView'
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

export default function SearchList() {
    const [page, setPage] = useState<number>(1) // 페이지
    const [postList, setPostList] = useState<post[]>([]) // 게시글 목록
    const [title, setTitle] = useState<string>('') // 게시판 제목
    const [totalPage, setTotalPage] = useState<number>(10) // 전체 페이지
    const [order, setOrder] = useState('created_at') // 정렬 순서

    const router = useRouter()
    const searchLabel = '검색 결과에 맞는 게시글을 확인해보세요!'
    const contentRef = useRef(null)

    const getPostList = async (order: string) => {
        //검색 결과에 해당하는 게시글 페이징에 맞게 불러오기
        const title = router.query.sid
        let page = 1
        if (router.query.page !== undefined) {
            page = parseInt(router.query.page! as string)
        }
        const response = await axios.get(
            `/server/lists/posts?searchWord=${title}&currentPage=${page}&pageSize=6&order=${order}`,
            {
                headers: {
                    'ngrok-skip-browser-warning': '123456',
                },
            }
        )
        setPostList(response.data.postList)
        setTotalPage(response.data.totalPage)
    }

    useEffect(() => {
        // URL에 직접 페이지 접근할 때 정상적으로 작동하기 위함
        if (router.query.page) {
            setPage(parseInt(router.query.page?.toString()))
        }
    }, [router.query.page])

    // 라우터 값 가져오고난 후 게시글 목록 불러오기
    useEffect(() => {
        if (!router.isReady) return
        setTitle(router.query.sid as string)
        getPostList(order)
        if (router.query.page === undefined) {
            setPage(1)
        }
    }, [router.isReady, router])

    return (
        <>
            <HeadTitle title={title + ' 게시글 목록'} />
            <Navigation contentRef={contentRef} />
            <PostListHeader />
            {postList.length === 0 ? (
                <div className="no-search-box">
                    <h4>&apos;{title}&apos;에 대한 검색 결과가 없습니다..</h4>
                </div>
            ) : (
                <div ref={contentRef}>
                    <OrderSelect order={order} setOrder={setOrder} router={router} />
                    <ContentView postList={postList} contentTitle={title} contentLabel={searchLabel} />
                    <PaginationView totalPage={totalPage} page={page} setPage={setPage} router={router} />
                </div>
            )}

            <style jsx>{`
                .no-search-box {
                    display: flex;
                    justify-content: center;
                    font-size: 30px;
                }

                @media (max-width: 720px) {
                    .no-search-box {
                        font-size: 12px;
                    }
                }
            `}</style>
        </>
    )
}
