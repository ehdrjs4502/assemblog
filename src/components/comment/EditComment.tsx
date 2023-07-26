import { RateReview } from '@mui/icons-material'
import { Box, TextField, Button } from '@mui/material'
import axios from 'axios'
import { useRef, useState } from 'react'
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
    setCommentList?: (comment: comment[]) => void
    isWriter?: boolean
    isPostComment: boolean
}

export default function EditComment({ postId, setCommentList, isWriter, isPostComment }: Props) {
    const cookie = new Cookies()
    const [nickname, setNickname] = useState(isWriter ? cookie.get('email') : '')
    const [password, setPassword] = useState('')
    const [content, setContent] = useState('')
    const nicknameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLInputElement>(null)

    console.log('isWriter : ', isWriter)

    //**수정사항 :  로그인 돼있으면 headers에 액세스 토큰도 같이 보내서 작성자가 댓글 작성한지 백엔드에게 보내줌**!!
    const onClickEditBtn = async () => {
        let isSuccess = false

        if (!nickname) {
            nicknameRef.current?.focus()
            return alert('닉네임을 입력해주세요')
        }

        if (!isWriter) {
            if (!password) {
                passwordRef.current?.focus()
                return alert('비밀번호를 입력해주세요')
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
            parentCommentId: 0,
            content: content,
        }

        if (isPostComment) {
            data.postId = postId // 만약 게시글 댓글이면 postId 추가
        }

        try {
            console.log(cookie.get('accessToken'), data)
            const response = await axios.post(`/server/${endpoint}`, data, {
                headers: {
                    'ngrok-skip-browser-warning': '1234',
                    Authorization: `Bearer ${cookie.get('accessToken')}`,
                },
            })

            console.log(response)

            if (isPostComment) {
                alert('댓글 작성 완료')
                const comments = await getComment(postId as number)
                setCommentList!(comments)
            } else {
                alert('방명록 작성 완료')
                const comments = await getGuestBook()
                setCommentList!(comments)
            }

            if (!isWriter) {
                setNickname('')
            }

            setPassword('')
            setContent('')
            isSuccess = true
        } catch (error: any) {
            console.log(error)
            if (error.response.status === 401) {
                await reissueAccToken()
                !isSuccess && onClickEditBtn()
            }
        }
    }

    return (
        <>
            <Box
                component="form"
                sx={{
                    backgroundColor: '#F2F2F2',
                    padding: 2,
                    borderRadius: 5,
                    height: '230px',
                }}>
                <div className="info-box">
                    <TextField
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
                            readOnly: isWriter ? true : false,
                        }}
                    />
                    <TextField
                        type="password"
                        autoComplete="off"
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
