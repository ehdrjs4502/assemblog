import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Box, Modal, TextField, Button, Typography, Tooltip } from '@mui/material'
import axios from 'axios'
import { getComment } from '@/function/getComment'

type comment = {
    id: number
    nickname: string
    content: string
    createdAt: string
    depth: number
    likeState: boolean
    parentCommentId: number
}

interface Props {
    id: number
    postId: number
    setCommentList: (comment: comment[]) => void
}

export default function DelCommentModal({ id, postId, setCommentList }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const style = {
        position: 'absolute' as 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        border: '1px solid #000',
        backgroundColor: 'white',
        boxShadow: 10,
        p: 4,
    }

    const onClickDelBtn = async () => {
        const data: any = { id: id, password: password }
        try {
            const response = await axios.delete(`/server/comments?id=${id}&password=${password}`, {
                headers: {
                    'ngrok-skip-browser-warning': '1234',
                },
            })
            console.log(response)

            //성공하면
            const comments = await getComment(postId)
            setCommentList(comments)
        } catch (error: any) {
            alert(error.response.data)
        }
    }

    return (
        <>
            <Tooltip title="삭제" disableInteractive placement="top" arrow>
                <IconButton onClick={() => handleOpen()} size="small" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography>댓글 삭제</Typography>
                    <TextField
                        autoComplete="off"
                        id="standard-basic"
                        label="비밀번호"
                        variant="standard"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="modal-button-container">
                        <Button sx={{ marginRight: 2 }} onClick={() => handleClose()} variant="outlined" size="small">
                            취소
                        </Button>
                        <Button
                            onClick={() => {
                                if (confirm('정말로 삭제하시겠습니까?') == true) {
                                    onClickDelBtn()
                                    handleClose()
                                }
                            }}
                            color="error"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            size="small">
                            삭제
                        </Button>
                    </div>
                </Box>
            </Modal>

            <style jsx>
                {`
                    .modal-button-container {
                        margin-top: 30px;
                        float: right;
                    }
                `}
            </style>
        </>
    )
}
