import Navigation from '@/components/Navigation'
import HeadTitle from '@/components/HeadTitle'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Pagination } from '@mui/material'

export default function tagPostList() {
    const [page, setPage] = useState<number>(1)
    const [postList, setPostList] = useState([])
    const [title, setTitle] = useState('')
    const router = useRouter()
    const API_URL = process.env.API
    //페이지 이동하는 함수
    const handleChange = (e: ChangeEvent<unknown>, value: number) => {
        router.push({ pathname: router.pathname, query: { ...router.query, page: value } })
        setPage(value)
    }

    const getPostList = async () => {
        //태그에 해당하는 게시글 페이징에 맞게 불러오기
        // const response = await axios.get(`${API_URL}lists/tags?tag=${title}&currentPage=${page}`)
        // setPostList(response.data)
    }

    useEffect(() => {
        // 페이지 처음 마운팅 될 때 포스트 목록 가져오기
        getPostList()
    }, [])

    useEffect(() => {
        // URL에 직접 페이지 접근할 때 정상적으로 작동하기 위함
        if (router.query.page) {
            setPage(parseInt(router.query.page?.toString()))
        }
    }, [router.query.page])

    useEffect(() => {
        if (!router.isReady) return
        setTitle(router.query.tid!.toString())
    }, [router.isReady])

    console.log(router.query)

    const contentRef = useRef(null)
    return (
        <>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <h2>{title} 태그에 있는 포스트 목록</h2>
            <Pagination count={10} page={page} onChange={handleChange} />
        </>
    )
}
