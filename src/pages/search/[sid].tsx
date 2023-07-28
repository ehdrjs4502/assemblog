import Navigation from '@/components/navigation/Navigation'
import PostListHeader from '@/components/posts/list/PostListHeader'
import HeadTitle from '@/components/HeadTitle'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Content from '@/components/Content'
import PaginationView from '@/components/posts/list/PaginationView'

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
}

export default function searchList() {
    const [page, setPage] = useState<number>(1)
    const [postList, setPostList] = useState<post[]>([])
    const [title, setTitle] = useState<string>('')
    const [totalPage, setTotalPage] = useState<number>(10)
    const router = useRouter()

    const getPostList = async () => {
        //검색 결과에 해당하는 게시글 페이징에 맞게 불러오기
        const title = router.query.sid
        let page = 1
        if (router.query.page !== undefined) {
            page = parseInt(router.query.page! as string)
        }
        const response = await axios.get(`/server/lists/posts?searchWord=${title}&currentPage=${page}&pageSize=1`, {
            headers: {
                'ngrok-skip-browser-warning': '123456',
            },
        })
        console.log(response)
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
        getPostList()
        if (router.query.page === undefined) {
            setPage(1)
        }
    }, [router.isReady, router])

    return (
        <>
            <HeadTitle title={title + ' 게시글 목록'} />
            <Navigation contentRef={''} />
            <PostListHeader />
            {postList.length === 0 ? (
                <div className="no-search-box">
                    <h4>'{title}'에 대한 검색 결과가 없습니다..</h4>
                </div>
            ) : (
                <>
                    <Content postList={postList} contentTitle={title} />
                    <PaginationView totalPage={totalPage} page={page} setPage={setPage} router={router} />
                </>
            )}

            <style jsx>{`
                .no-search-box {
                    display: flex;
                    justify-content: center;
                    font-size: 30px;
                }
            `}</style>
        </>
    )
}
