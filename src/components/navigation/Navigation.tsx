import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { Cookies } from 'react-cookie'
import { getCategoryList } from '@/function/getCategory'
import DrawerView from './Drawer.tsx/DrawerView'
import LogoutBtn from './buttons/LogoutBtn'
import EditPostBtn from './buttons/EditPostBtn'
import UserSettingBtn from './buttons/UserSettingBtn'
import SearchBtn from './buttons/SearchBtn'
import MouseTracker from './MouseTracker'

type CategoryItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
    boardCount: number
    boards: BoardItem[]
}

type BoardItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
    postCount: number
}

export default function Navigation({ contentRef }: any) {
    const [scrollPosition, setScrollPosition] = useState<number>(0) // 현재 스크롤 위치
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false) // 사이드바 열지말지 상태
    const [isLogin, setIsLogin] = useState<boolean>(false) // 로그인 되어있는지 확인
    const [categoryList, setCategoryList] = useState<CategoryItem[]>([]) // 카테고리 목록
    const router = useRouter()
    const cookie = new Cookies()

    let contentTop!: number

    if (contentRef !== '') {
        contentTop = contentRef.current?.offsetTop // 콘텐츠 영역 top 위치
    }

    const originalStyle = {
        // 원래 네비게이션 바 스타일
        position: 'absolute',
        backgroundColor: 'rgba( 255, 255, 255, 0 )',
        boxShadow: 'none',
    }

    const changeStyle = {
        // 콘텐츠 영역으로 가면 포지션을 fixed로 변경
        position: 'fixed',
        backgroundColor: 'rgba( 255, 255, 255, 0.6 )',
    }

    const updateScroll = () => {
        // 현재 스크롤 위치 업데이트 함수
        setScrollPosition(window.scrollY || document.documentElement.scrollTop)
    }

    useEffect(() => {
        window.addEventListener('scroll', updateScroll)
    })

    useEffect(() => {
        // 로그인한 사용자인지 확인
        if (cookie.get('email') !== undefined) {
            setIsLogin(true)
        }

        // 카테고리 리스트 가져오기
        const fetchCategoryList = async () => {
            const list = await getCategoryList() // 카테고리 가져오는 함수
            setCategoryList(list)
        }

        fetchCategoryList()

        // const testList: CategoryItem[] = [
        //     {
        //         id: 1,
        //         title: 'test1',
        //         orderNum: 1,
        //         useState: false,
        //         boards: [
        //             {
        //                 id: 1,
        //                 title: 'board1',
        //                 orderNum: 1,
        //                 useState: true,
        //             },
        //         ],
        //     },

        //     {
        //         id: 2,
        //         title: 'test2',
        //         orderNum: 2,
        //         useState: true,
        //         boards: [
        //             {
        //                 id: 1123,
        //                 title: 'board2',
        //                 orderNum: 1,
        //                 useState: true,
        //             },
        //             {
        //                 id: 2,
        //                 title: 'board3',
        //                 orderNum: 2,
        //                 useState: false,
        //             },
        //         ],
        //     },

        //     {
        //         id: 3,
        //         title: 'test3',
        //         orderNum: 3,
        //         useState: true,
        //         boards: [],
        //     },

        //     {
        //         id: 4,
        //         title: 'test4',
        //         orderNum: 4,
        //         useState: false,
        //         boards: [],
        //     },
        // ]

        // setCategoryList(testList)
    }, [])

    // 페이지가 바껴도 Drawer가 계속 열려있어서 router 바뀌면 닫히게 함
    useEffect(() => {
        setIsDrawerOpen(false)
    }, [router.asPath])

    const isScrollPastContentTop: boolean = scrollPosition + 450 >= contentTop // 스크롤이 콘텐츠 영역으로 왔는지 확인(boolean)

    return (
        <>
            <AppBar sx={isScrollPastContentTop ? changeStyle : originalStyle}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        onClick={() => setIsDrawerOpen(true)}
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <Menu />
                    </IconButton>
                    <MouseTracker/>
                    <div className="btn-box">
                        <SearchBtn isScrollPastContentTop={isScrollPastContentTop} />
                        {isLogin && (
                            <>
                                <EditPostBtn />
                                <UserSettingBtn />
                                <LogoutBtn />
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            {/*햄버거바 눌렀을 때 나오는 드로어*/}
            <DrawerView
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
                isLogin={isLogin}
                categoryList={categoryList}
                setCategoryList={setCategoryList}
            />

            <style jsx>
                {`
                    .btn-box {
                        display: flex;
                    }
                `}
            </style>
        </>
    )
}
