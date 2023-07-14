import { Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography, IconButton } from '@mui/material'
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import reissueAccToken from '@/function/reissueAccToken'
import { Settings, Delete } from '@mui/icons-material'
import { getCategoryList } from '@/function/getCategory'
import { Cookies } from 'react-cookie'

interface Props {
    boardID: number
    boardTitle: string
    boardOrderNum: number
    setCategoryList: ([]: any) => void
}

export default function SettingBoardModal({ boardID, boardTitle, boardOrderNum, setCategoryList }: Props) {
    const [title, setTitle] = useState<string>('') // 카테고리명
    const titleRef = useRef() // 카테고리명 인풋창
    const [isChecked, setIsChecked] = useState<boolean>(true) // 숨기기 여부
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const cookie = new Cookies()

    useEffect(() => {
        // 모달창 열렸을 때 초기값 설정
        setTitle(boardTitle)
        setIsChecked(true)
    }, [open])

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

    //게시판 수정하는 함수
    const onClickModifyBtn = async () => {
        let isSuccess = false
        try {
            const response = await axios.patch(
                `/server/api/boards`,
                {
                    id: boardID,
                    title: title,
                    useState: isChecked,
                    orderNum: boardOrderNum,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookie.get('accessToken')}`,
                    },
                }
            )

            console.log(response)

            const list = await getCategoryList() // 카테고리 가져오는 함수
            setCategoryList(list)
            handleClose()
            isSuccess = true
        } catch (error: any) {
            await reissueAccToken
            !isSuccess && onClickModifyBtn()
        }
    }

    //게시판 삭제하는 함수
    const onClickDelBtn = async () => {
        let isSuccess = false
        try {
            await axios.delete(`/server/api/board/${boardID}`, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`,
                },
            })

            const list = await getCategoryList() // 카테고리 가져오는 함수
            setCategoryList(list)
            handleClose()
            isSuccess = true
        } catch (error: any) {
            await reissueAccToken() // 액세스 토큰 만료되면 재발급하는 함수
            !isSuccess && onClickDelBtn()
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
                    '&:hover': { color: 'black' },
                }}>
                <Settings />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box component="form" sx={style}>
                    <Typography sx={{ marginBottom: 3, fontSize: 20 }}>게시판 설정</Typography>
                    <TextField
                        label="게시판명"
                        id="standard-size-small"
                        size="small"
                        variant="standard"
                        defaultValue={boardTitle}
                        fullWidth
                        sx={{ m: 1 }}
                        inputRef={titleRef}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                    <FormControlLabel
                        sx={{ marginLeft: 1, marginTop: 3 }}
                        value="start"
                        control={
                            <Checkbox
                                onChange={(e) => {
                                    setIsChecked(!e.target.checked)
                                }}
                            />
                        }
                        label="게시판 숨기기"
                        labelPlacement="start"
                    />
                    <div className="modal-button-container">
                        <Button
                            onClick={() => {
                                if (confirm('정말로 삭제하시겠습니까?') == true) {
                                    onClickDelBtn()
                                    handleClose()
                                }
                            }}
                            sx={{ marginRight: 2 }}
                            color="error"
                            variant="outlined"
                            startIcon={<Delete />}
                            size="small">
                            삭제
                        </Button>
                        <Button sx={{ marginRight: 2 }} onClick={() => handleClose()} variant="outlined" size="small">
                            취소
                        </Button>
                        <Button
                            onClick={() => {
                                onClickModifyBtn()
                            }}
                            variant="contained"
                            size="small">
                            완료
                        </Button>
                    </div>
                </Box>
            </Modal>

            <style jsx>
                {`
                    .modal-button-container {
                        margin-top: 120px;
                        float: right;
                    }
                `}
            </style>
        </>
    )
}