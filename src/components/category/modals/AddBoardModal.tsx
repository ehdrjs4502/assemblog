import { getCategoryList } from '@/function/getCategory'
import reissueAccToken from '@/function/reissueAccToken'
import { Add } from '@mui/icons-material'
import { Box, Button, Modal, TextField, Typography, IconButton } from '@mui/material'
import axios from 'axios'
import { useRef, useState } from 'react'
import { Cookies } from 'react-cookie'

interface Props {
    categoyID: number
    categoryTitle: string
    setCategoryList: ([]: any) => void
}

export default function AddBoardModal({ categoyID, categoryTitle, setCategoryList }: Props) {
    const [title, setTitle] = useState<string>('') // 게시판명
    const titleRef = useRef() // 게시판명 인풋창
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const cookie = new Cookies()

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
        let isSuccess = false
        try {
            const response = await axios.post(
                '/server/api/boards',
                {
                    parentId: categoyID,
                    title: title,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookie.get('accessToken')}`,
                    },
                }
            )

            if (response.data === 'Duplicate category title') {
                alert('이미 추가된 게시판입니다.')
            } else {
                const list = await getCategoryList() // 카테고리 가져오는 함수
                setCategoryList(list)
                handleClose()
            }
            isSuccess = true
        } catch (error: any) {
            if (error.response.status === 401) {
                await reissueAccToken()
                !isSuccess && onClickAddBtn()
            }
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
                        color: 'blue',
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
                    <Typography sx={{ marginBottom: 3, fontSize: 20 }}>{categoryTitle} 게시판 추가</Typography>
                    <TextField
                        label="게시판명"
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

            <style jsx>{`
                .modal-button-container {
                    margin-top: 20px;
                    float: right;
                }
            `}</style>
        </>
    )
}
