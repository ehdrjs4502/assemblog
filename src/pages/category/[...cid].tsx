import Navigation from '@/components/Navigation'
import HeadTitle from '@/components/HeadTitle'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import Content from '@/components/Content'
import PaginationView from '@/components/PaginationView'
import PostListHeader from '@/components/PostListHeader'

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

export default function Category() {
    const [page, setPage] = useState<number>(1)
    const [postList, setPostList] = useState<post[]>([])
    const [title, setTitle] = useState<string>('')
    const [totalPage, setTotalPage] = useState<number>(10)
    const router = useRouter()

    const getPostList = async () => {
        //게시판에 해당하는 게시글 페이징에 맞게 불러오기
        const title = router.query.cid![1]
        let page = 1
        if (router.query.page !== undefined) {
            page = parseInt(router.query.page! as string)
        }
        const response = await axios.get(`/server/lists/posts?boardTitle=${title}&currentPage=${page}&pageSize=1`, {
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

    // 라우터 값 가져오고난 후 게시글 목록 불러오기
    useEffect(() => {
        if (!router.isReady) return
        setTitle(router.query.cid![1])
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
            <Content postList={postList} contentTitle={title + " 게시판의 게시글"} />
            <PaginationView totalPage={totalPage} page={page} setPage={setPage} router={router} />
        </>
    )
}
