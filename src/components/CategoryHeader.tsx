import React, {useState, useEffect, useRef, useCallback} from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Box, Button, Modal, TextField } from '@mui/material';
import { Cookies } from 'react-cookie';

interface Props {
    isLogin: Boolean,
    cookie: {
        email: string;
        refToken: string;
        accToken: string;
    };
}


export default function CategoryHeader({isLogin, cookie: cookie}: Props) {
    const [open, setOpen] = useState(false); // 모달 상태
    const modalOpen = () => setOpen(true); // 모달 열기
    const modalClose = () => setOpen(false); // 모달 닫기
    const [title, setTitle] = useState<string>(''); // 카테고리명
    const titleRef = useRef(); // 카테고리명 인풋창
    const newCookie = new Cookies();

    const style = { // 모달 창 스타일
        position: 'absolute' as 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '10px',
        p: 4,
      };

    const testClick = async () => {
        try {
            const responce = await  axios.post('/categories',{
                name: title
            },{
                headers: {
                    email: cookie['email'],
                    RefreshToken: cookie['refToken'],
                    AccessToken: cookie['accToken'],
                },
            });

            if (responce.headers['accesstoken'] !== undefined) { // 액세스 토큰 만료되면 재발급
                newCookie.set('accessToken', responce.headers['accesstoken'], {
                    path: "/",
                    secure: true,
                });
            }
        } catch (error:any) {
            alert(error.response.data.message);
        }
    }


    return (
        <>
        <div className='category-header'>
            <span>Category</span>
            {isLogin ? (
                <div className='admin-settings'>
                    <IconButton onClick={modalOpen} color="primary" aria-label="menu" sx={{color:"gray", "&:hover": {color:"black"}}}>
                        <AddIcon />
                    </IconButton>
                </div>
            ) : ""}
        </div>

        <Modal
            open={open}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <TextField
                    label="카테고리명"
                    id="standard-size-small"
                    size="small"
                    variant="standard"
                    fullWidth sx={{m: 1}}
                    inputRef={titleRef}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
                <div className='modal-button-container'>
                    <Button sx={{marginRight: 2}} onClick={() => setOpen(false)} variant="outlined" size="small">
                        취소
                    </Button>
                    <Button onClick={() => {testClick()}} variant="contained" size="small">
                        추가
                    </Button>
                </div>
            </Box>
        </Modal>
        
        <style jsx>{`
            .category-header {
                display: flex;
                padding-left: 10px;
            }

            .category-header span {
                justify-content: center;
                align-items: center;
                display: flex;
                font-weight: bold;
            }

            .admin-settings {
                margin-left: auto;
                margin-right: 9px;
            }

            .modal-button-container {
                margin-top: 20px;
                float: right;
            }
            
        `}
        </style>
        </>
    )
}