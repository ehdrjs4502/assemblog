import {RateReview} from '@mui/icons-material'
import { Box, TextField, Button } from '@mui/material'
import axios from 'axios'
import { useRef, useState } from 'react'
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
    setCommentList: (comment: comment[]) => void
}

export default function EditComment({ postId, setCommentList }: Props) {
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [content, setContent] = useState('')

    const nicknameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLInputElement>(null)

    const onClickEditBtn = async () => {
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

        try {
            const response = await axios.post(
                '/server/comments',
                {
                    postId: postId,
                    nickname: nickname,
                    password: password,
                    parentCommentId: 0,
                    depth: 0,
                    content: content,
                },
                {
                    headers: {
                        'ngrok-skip-browser-warning': '1234',
                    },
                }
            )

            console.log(response)

            alert('댓글 작성 완료')

            const comments = await getComment(postId)
            setCommentList(comments)

            setNickname('')
            setPassword('')
            setContent('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#F2F2F2',
                    padding: 2,
                    borderRadius: 5,
                    height: '230px',
                }}>
                <div className="info-box">
                    <TextField
                        id="outlined-basic"
                        size="small"
                        placeholder="닉네임"
                        variant="outlined"
                        onChange={(e) => {
                            setNickname(e.target.value)
                        }}
                        value={nickname}
                        inputRef={nicknameRef}
                        sx={{ flexGrow: 1, marginRight: 1, backgroundColor: '#8588A3', borderRadius: '10px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px',
                                color: 'white',
                            },
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        type="password"
                        size="small"
                        placeholder="비밀번호"
                        variant="outlined"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        value={password}
                        inputRef={passwordRef}
                        sx={{ flexGrow: 1, backgroundColor: '#8588A3', borderRadius: '10px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px',
                                color: 'white',
                            },
                        }}
                    />
                </div>
                <TextField
                    id="standard-multiline-static"
                    placeholder="댓글 달기"
                    multiline
                    rows={4}
                    variant="standard"
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                    value={content}
                    inputRef={contentRef}
                    sx={{ width: '100%', marginTop: '30px' }}
                />
                <Button
                    onClick={() => onClickEditBtn()}
                    variant="contained"
                    startIcon={<RateReview />}
                    sx={{ float: 'right', marginTop: '20px' }}>
                    게시
                </Button>
            </Box>

            <style jsx>{`
                .info-box {
                    display: flex;
                }
            `}</style>
        </>
    )
}
