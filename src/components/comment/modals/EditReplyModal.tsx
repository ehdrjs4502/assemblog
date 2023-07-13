import { useRef, useState } from 'react'
import { IconButton, Box, Modal, TextField, Button, Typography, Tooltip } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
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
    postId: number
    parentId: number
    depth: number
    setCommentList: (comment: comment[]) => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    border: '1px solid #000',
    backgroundColor: 'white',
    boxShadow: 10,
    p: 4,
    borderRadius: 2,
}

export default function EditReplyModal({ postId, parentId, depth, setCommentList }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const [nickname, setNickname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const nicknameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLInputElement>(null)

    const onClickReplyBtn = async () => {
        if (!nickname) {
            nicknameRef.current?.focus()
            return alert('닉네임을 입력해주세요')
        }

        if (!password) {
            passwordRef.current?.focus()
            return alert('비밀번호를 입력해주세요')
        }
        if (!content) {
            contentRef.current?.focus()
            return alert('내용을 입력해주세요')
        }
        console.log('postId : ', postId)
        try {
            const response = await axios.post(
                `/server/comments`,
                {
                    postId: postId,
                    nickname: nickname,
                    password: password,
                    content: content,
                    parentCommentId: parentId,
                    depth: depth + 1,
                },
                {
                    headers: {
                        'ngrok-skip-browser-warning': '1234',
                    },
                }
            )

            console.log(response)

            const comments = await getComment(postId)
            setCommentList(comments)
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Tooltip title="답글 달기" disableInteractive placement="top" arrow>
                <IconButton onClick={() => handleOpen()} size="small" aria-label="delete">
                    <RateReviewIcon />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography>답글 달기</Typography>
                    <div>
                        <TextField
                            placeholder="닉네임"
                            variant="standard"
                            onChange={(e) => setNickname(e.target.value)}
                            sx={{ flexGrow: 1, marginRight: 1 }}
                            inputRef={nicknameRef}
                        />
                        <TextField
                            autoComplete="off"
                            placeholder="비밀번호"
                            variant="standard"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ flexGrow: 1, marginRight: 1 }}
                            inputRef={passwordRef}
                        />
                    </div>

                    <TextField
                        placeholder="답글 달기"
                        multiline
                        rows={4}
                        variant="standard"
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                        sx={{ width: '100%', marginTop: '30px' }}
                        inputRef={contentRef}
                    />
                    <div className="modal-button-container">
                        <Button
                            sx={{ marginRight: 2 }}
                            onClick={() => handleClose()}
                            variant="outlined"
                            color="error"
                            size="small">
                            취소
                        </Button>
                        <Button
                            onClick={() => {
                                onClickReplyBtn()
                            }}
                            variant="contained"
                            startIcon={<RateReviewIcon />}
                            size="small">
                            게시
                        </Button>
                    </div>
                </Box>
            </Modal>

            <style jsx>
                {`
                    .info-box {
                        display: flex;
                    }
                    .modal-button-container {
                        margin-top: 30px;
                        float: right;
                    }
                `}
            </style>
        </>
    )
}
