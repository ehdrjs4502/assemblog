import { getCategoryList } from '@/function/getCategory'
import reissueAccToken from '@/function/reissueAccToken'
import { Add } from '@mui/icons-material'
import { Box, Button, Modal, TextField, Typography, IconButton } from '@mui/material'
import axios from 'axios'
import { useRef, useState } from 'react'

interface Props {
    userInfo: {
        email: string
        accessToken: string
        refreshToken: string
    }
    setCategoryList: ([]: any) => void
}

export default function AddCategoryModal({ userInfo, setCategoryList }: Props) {
    const [title, setTitle] = useState<string>('') // 카테고리명
    const titleRef = useRef() // 카테고리명 인풋창
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const style = {
        // 모달 창 스타일
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
    }

    const onClickAddBtn = async () => {
        try {
            const response = await axios.post(
                '/server/api/categories',
                {
                    title: title,
                },
                {
                    headers: {
                        email: userInfo.email,
                        RefreshToken: userInfo.refreshToken,
                        AccessToken: userInfo.accessToken,
                    },
                }
            )

            reissueAccToken(response.headers['accessToken']) // 액세스 토큰 만료되면 재발급하는 함수

            const list = await getCategoryList() // 카테고리 가져오는 함수
            setCategoryList(list)
            handleClose()
            
        } catch (error: any) {
            alert(error.response.data)
        }
    }

    return (
        <>
            <IconButton
                onClick={() => {
                    handleOpen()
                }}
                color="primary"
                aria-label="menu"
                sx={{
                    color: 'gray',
                    '&:hover': {
                        color: 'black',
                    },
                }}>
                <Add />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography sx={{ marginBottom: 3, fontSize: 20 }}>카테고리 추가</Typography>
                    <TextField
                        label="카테고리명"
                        id="standard-size-small"
                        size="small"
                        variant="standard"
                        fullWidth
                        sx={{ m: 1 }}
                        inputRef={titleRef}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                    <div className="modal-button-container">
                        <Button sx={{ marginRight: 2 }} onClick={() => handleClose()} variant="outlined" size="small">
                            취소
                        </Button>
                        <Button
                            onClick={() => {
                                onClickAddBtn()
                            }}
                            variant="contained"
                            size="small">
                            추가
                        </Button>
                    </div>
                </Box>
            </Modal>

            <style jsx>
                {`
                    .modal-button-container {
                        margin-top: 20px;
                        float: right;
                    }
                `}
            </style>
        </>
    )
}
