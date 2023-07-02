import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { Drawer } from '@mui/material'
import Category from './categories/Category'
import DrawerHeader from './DrawerHeader'
import axios from 'axios'

interface CategoryItem {
    id: string
    title: string
    orderNum: number
    useState: boolean
    boards: CategoryItem[]
}

export default function Navigation({ contentRef }: any) {
    const [scrollPosition, setScrollPosition] = useState<number>(0) // 현재 스크롤 위치
    const [isDrawerOpen, setIsDrawerOpen] = useState(false) // 사이드바 열지말지 상태
    const [list, setList] = useState<CategoryItem[]>([])

    let contentTop = contentRef.current?.offsetTop // 콘텐츠 영역 top 위치

    // const testList: CategoryItem = [
    //     {
    //         id: '1',
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
    //         id: '2',
    //         title: 'test2',
    //         orderNum: 2,
    //         useState: true,
    //         boards: [
    //             {
    //                 id: 1,
    //                 title: 'board2',
    //                 orderNum: 1,
    //                 useState: true,
    //             },
    //         ],
    //     },

    //     {
    //         id: '3',
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
    
    const originalStyle = {
        // 원래 네비게이션 바 스타일
        position: 'absolute',
        backgroundColor: 'white',
        opacity: 0.9,
    }

    const changeStyle = {
        // 콘텐츠 영역으로 가면 포지션을 fixed로 변경
        position: 'fixed',
        backgroundColor: 'white',
        opacity: 0.9,
    }

    // 카테고리 가져오는 함수
    const getCategories = async () => {
        try {
            const responce = await axios.get('/server/categories', {
                headers: {
                    'ngrok-skip-browser-warning': '1234',
                },
            })
            setList(responce.data);
            console.log(responce);
        } catch (e) {
            alert(e);
        }

        // setList(testList);
    }

    const updateScroll = () => {
        // 현재 스크롤 위치 업데이트 함수
        setScrollPosition(window.scrollY || document.documentElement.scrollTop)
    }

    useEffect(() => {
        window.addEventListener('scroll', updateScroll)
    })

    useEffect(() => {
        getCategories();
    }, [])

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
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                    <IconButton size="large" aria-label="search" color="primary">
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                PaperProps={{ sx: { width: '250px' } }}>
                <DrawerHeader />
                <Category list={list} getCategories={getCategories}/>
            </Drawer>
        </>
    )
}
