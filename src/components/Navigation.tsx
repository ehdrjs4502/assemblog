import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Drawer } from '@mui/material';
import Category from './Category';
import DrawerHeader from './DrawerHeader';

export default function Navigation( { contentRef }: any, {accessToken}: any) {
    const [scrollPosition, setScrollPosition] = useState<number>(0); // 현재 스크롤 위치
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 사이드바 열지말지 상태

    let contentTop = contentRef.current?.offsetTop; // 콘텐츠 영역 top 위치

    const originalStyle = { // 원래 네비게이션 바 스타일
        position: "absolute", 
        backgroundColor: "white", 
        opacity: 0.9,
    }

    const changeStyle = { // 콘텐츠 영역으로 가면 포지션을 fixed로 변경
        position: "fixed", 
        backgroundColor: "white", 
        opacity: 0.9,
    }

    const updateScroll = () => { // 현재 스크롤 위치 업데이트 함수
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }

    useEffect(()=>{
        window.addEventListener('scroll', updateScroll);

        // console.log(scrollPosition, contentTop);
    });

    return (
        <>
        <AppBar sx={scrollPosition + 50 >= contentTop ? changeStyle : originalStyle}>
            <Toolbar>
            <IconButton onClick={() => setIsDrawerOpen(true)} edge="start" color="primary" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <IconButton size="large" aria-label="search" color="primary">
                <SearchIcon />
            </IconButton>
            </Toolbar>
        </AppBar>

        <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} PaperProps={{sx:{width: '250px'}}}>
            <DrawerHeader/>
            <Category/>
        </Drawer>
        </>
    )
}