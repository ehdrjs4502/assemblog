import Navigation from '@/components/navigation/Navigation'
import HeadTitle from '@/components/HeadTitle'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Content from '@/components/Content'
import PaginationView from '@/components/posts/list/PaginationView'
import PostListHeader from '@/components/posts/list/PostListHeader'

export default function tagPostList() {
    const [page, setPage] = useState<number>(1)
    const [postList, setPostList] = useState([])
    const [title, setTitle] = useState('')
    const [totalPage, setTotalPage] = useState<number>(10)
    const router = useRouter()
    const API_URL = process.env.API

    const getPostList = async () => {
        //태그에 해당하는 게시글 페이징에 맞게 불러오기
        const title = router.query.tid
        console.log('title : ', title)
        let page = 1
        if (router.query.page !== undefined) {
            page = parseInt(router.query.page! as string)
        }
        const response = await axios.get(`/server/lists/posts?tagName=${title}&currentPage=${page}&pageSize=1`, {
            headers: {
                'ngrok-skip-browser-warning': '123456',
            },
        })
        console.log(response.data)
        setPostList(response.data.postList)
        setTotalPage(response.data.totalPage)
    }

    // useEffect(() => {
    //     // 페이지 처음 마운팅 될 때 포스트 목록 가져오기
    //     getPostList()
    // }, [])

    useEffect(() => {
        // URL에 직접 페이지 접근할 때 정상적으로 작동하기 위함
        if (router.query.page) {
            setPage(parseInt(router.query.page?.toString()))
        }
    }, [router.query.page])

    // 라우터 값 가져오고난 후 게시글 목록 불러오기
    useEffect(() => {
        if (!router.isReady) return
        setTitle(router.query.tid! as string)
        getPostList()
        if (router.query.page === undefined) {
            setPage(1)
        }
    }, [router.isReady, router])

    const contentRef = useRef(null)
    return (
        <>
            <HeadTitle title={title + ' 태그 목록'} />
            <Navigation contentRef={contentRef} />
            <PostListHeader />
            <Content postList={postList} contentTitle={title + ' 태그의 게시글'} />
            <PaginationView totalPage={totalPage} page={page} setPage={setPage} router={router} />
        </>
    )
}
