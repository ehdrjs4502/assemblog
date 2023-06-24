import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function Navigation( { contentRef }: any ) {
    const [scrollPosition, setScrollPosition] = useState(0);
    let contentTop = contentRef.current?.offsetTop;
    const originalStyle = {
        position: "absolute", 
        backgroundColor: "white", 
        opacity: 0.9,
    }

    const changeStyle = {
        position: "fixed", 
        backgroundColor: "white", 
        opacity: 0.9,
    }

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(()=>{
        window.addEventListener('scroll', updateScroll);

        console.log(scrollPosition, contentTop);
    });

    return (
        <AppBar sx={scrollPosition + 50 >= contentTop ? changeStyle : originalStyle}>
            <Toolbar>
            <IconButton edge="start" color="primary" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <IconButton size="large" aria-label="search" color="primary">
                <SearchIcon />
            </IconButton>
            </Toolbar>
        </AppBar>
    )
}