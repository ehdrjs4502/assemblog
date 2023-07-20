import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Drawer, Button, Tooltip } from '@mui/material'
import { Menu, Search, PostAdd, Logout, ManageAccounts } from '@mui/icons-material'
import CategoryView from './category/CategoryView'
import DrawerHeader from './DrawerHeader'
import { useRouter } from 'next/router'
import { Cookies } from 'react-cookie'
import { getCategoryList } from '@/function/getCategory'
import TagView from './category/TagView'

type CategoryItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
    boards: BoardItem[]
}

type BoardItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
}

export default function Navigation({ contentRef }: any) {
    const [scrollPosition, setScrollPosition] = useState<number>(0) // 현재 스크롤 위치
    const [isDrawerOpen, setIsDrawerOpen] = useState(false) // 사이드바 열지말지 상태
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
        backgroundColor: 'rgba( 255, 255, 255, 0.6 )',
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

    //로그아웃 버튼 눌렀을 때 함수
    const onClickLogoutBtn = () => {
        cookie.remove('email')
        cookie.remove('accessToken')
        cookie.remove('refreshToken')
        router.push('/login')
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
            console.log(list)
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

    return (
        <>
            <AppBar sx={scrollPosition + 50 >= contentTop ? changeStyle : originalStyle}>
                <Toolbar>
                    <IconButton
                        onClick={() => setIsDrawerOpen(true)}
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                    {isLogin && (
                        <>
                            <Tooltip title="로그아웃" disableInteractive placement="bottom" arrow>
                                <IconButton color="primary" onClick={() => onClickLogoutBtn()}>
                                    <Logout />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="글 작성" disableInteractive placement="bottom" arrow>
                                <IconButton color="primary" onClick={() => router.push('/post/edit')}>
                                    <PostAdd />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="유저 수정" disableInteractive placement="bottom" arrow>
                                <IconButton color="primary" onClick={() => router.push('/userinfo')}>
                                    <ManageAccounts />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                    <Tooltip title="검색" disableInteractive placement="bottom" arrow>
                        <IconButton aria-label="search" color="primary">
                            <Search />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                PaperProps={{ sx: { width: '250px', '::-webkit-scrollbar': { display: 'none' } } }}>
                <DrawerHeader />
                <CategoryView isLogin={isLogin} categoryList={categoryList} setCategoryList={setCategoryList} />
                <TagView />
            </Drawer>
        </>
    )
}
