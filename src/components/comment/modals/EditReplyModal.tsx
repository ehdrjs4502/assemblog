import { useEffect, useRef, useState } from 'react'
import { IconButton, Box, Modal, TextField, Button, Typography, Tooltip } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
import axios from 'axios'
import { getComment } from '@/function/getComment'
import { Cookies } from 'react-cookie'
import { getGuestBook } from '@/function/getGuestBook'
import reissueAccToken from '@/function/reissueAccToken'

type comment = {
    id: number
    nickname: string
    content: string
    createdAt: string
    deleted: boolean
    likeState: boolean
    parentCommentId: number
    writer: boolean
}

type data = {
    nickname: string
    password: string
    parentCommentId: number
    content: string
    postId?: number
}

interface Props {
    postId?: number
    parentId: number
    setCommentList: (comment: comment[]) => void
    isPostComment: boolean
    isWriter?: boolean
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
    '@media (max-width:950px)': {
        width: '70%',
    },
}

export default function EditReplyModal({ postId, parentId, setCommentList, isPostComment, isWriter }: Props) {
    const cookie = new Cookies()
    const [open, setOpen] = useState<boolean>(false)
    const [nickname, setNickname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [content, setContent] = useState<string>('')
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const nicknameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLInputElement>(null)

    // 게시글 작성자이거나 방명록 페이지에 로그인한 사람인지
    const isAdminOrWriter = !((!isWriter || !isPostComment) && !cookie.get('email'))

    useEffect(() => {
        if (isAdminOrWriter) {
            setNickname(cookie.get('email'))
        }

        // 게시글 작성자거나 방명록페이지에 로그인한 사람이면 email 변경 못하게 boolean값 저장
        setIsDisabled(typeof window !== 'undefined' && isAdminOrWriter ? true : false)
    }, [])

    const onClickReplyBtn = async () => {
        let isSuccess = false

        if (!nickname) {
            nicknameRef.current?.focus()
            return alert('닉네임을 입력해주세요')
        }

        // 게시글 작성자가 아니거나 방명록 페이지이면서 로그인 안 한 유저이면
        if (!isAdminOrWriter) {
            if (!password) {
                passwordRef.current?.focus()
                alert('비밀번호를 입력해주세요')
                return
            }
        }

        if (!content) {
            contentRef.current?.focus()
            return alert('내용을 입력해주세요')
        }

        const endpoint = isPostComment ? 'comments' : 'guestbooks' // 엔드 포인트 설정

        const data: data = {
            nickname: nickname,
            password: password,
            parentCommentId: parentId,
            content: content,
        }

        if (isPostComment) {
            data.postId = postId // 만약 게시글 댓글이면 postId 추가
        }

        console.log('data : ', data)
        try {
            const response = await axios.post(`/server/${endpoint}`, data, {
                headers: {
                    'ngrok-skip-browser-warning': '1234',
                    Authorization: `Bearer ${cookie.get('accessToken')}`,
                },
            })

            console.log('response : ', response)

            if (isPostComment) {
                alert('댓글 작성 완료')
                const comments = await getComment(postId as number)
                setCommentList!(comments)
            } else {
                alert('방명록 작성 완료')
                const comments = await getGuestBook()
                setCommentList!(comments)
            }

            if (!isAdminOrWriter) {
                setNickname('')
            }
            setPassword('')
            setContent('')

            handleClose()

            isSuccess = true
        } catch (error: any) {
            if (error.response.status === 401) {
                await reissueAccToken()
                !isSuccess && onClickReplyBtn()
            }
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
                <Box sx={style} component="form">
                    <Typography>답글 달기</Typography>
                    <div className="info-box">
                        <TextField
                            placeholder="닉네임"
                            variant="standard"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            sx={{ flexGrow: 1, marginRight: 1 }}
                            inputRef={nicknameRef}
                            InputProps={{
                                disabled: isDisabled,
                            }}
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
                        margin-top: 20px;
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
