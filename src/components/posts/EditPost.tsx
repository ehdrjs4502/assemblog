import MDEditor, { commands } from '@uiw/react-md-editor'
import { useState, useRef, ChangeEvent, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Cookies } from 'react-cookie'
import { Checkbox, FormControlLabel, Switch } from '@mui/material'

type CategoryItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
    boards: BoardItem[]
}

type BoardItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
}

type userInfo = {
    email: string
    accessToken: string
    refreshToken: string
}

export default function EditPost() {
    const [category, setCategory] = useState<string>('') // 선택한 카테고리
    const [categoryList, setCategoryList] = useState<CategoryItem[]>([]) // 카테고리 리스트
    const [title, setTitle] = useState<string>('') // 제목
    const [content, setContent] = useState<any>('') // 내용
    const [commentIsChecked, setCommentIsChecked] = useState<boolean>(false); // 댓글 달기 여부
    const [hidePostIsChecked, setHidePostIsChecked] = useState<boolean>(false); // 포스트 숨기기 여부
    const custumCommands = commands.getCommands().filter((e) => e.name !== 'image') // 기존 이미지 버튼 삭제
    const fileInputRef = useRef<HTMLInputElement>(null) // 파일 인풋창 ref
    const cookie = new Cookies()
    const router = useRouter()
    const userInfo: userInfo = {
        email: cookie.get('email'),
        accessToken: cookie.get('accessToken'), // 액세스 토큰 저장
        refreshToken: cookie.get('refreshToken'), // 리프레쉬 토큰 저장
    }

    const getCategoryList = async () => {
        try {
            const responce = await axios.get('/server/categories', {
                headers: {
                    'ngrok-skip-browser-warning': '1234',
                },
            })
            setCategoryList(responce.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCategoryList()
    }, [])

    const handleButtonClick = () => {
        // 인풋 파일 창 클릭
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const imageToolbar = {
        // 이미지 툴바 생성
        name: 'image',
        groupName: 'image',
        // 아이콘 모양
        icon: (
            <svg viewBox="0 0 16 16" width="12px" height="12px">
                <path
                    d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
                    fill="currentColor"
                />
            </svg>
        ),
        children: (handle: any) => {
            // 클릭시 나올 요소
            return (
                <div style={{ width: 120, padding: 10 }}>
                    <div>Image Upload</div>
                    <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
                    <button type="button" onClick={handleButtonClick}>
                        이미지 선택
                    </button>
                </div>
            )
        },
        buttonProps: { 'aria-label': 'Insert title' },
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        // 이미지 파일 선택
        // 파일 가져오기
        const file = event.target.files?.[0]

        if (file) {
            const formData = new FormData()
            formData.append('file', file) // 폼 데이터에 저장
            formData.append('email', userInfo.email)

            for (let key of formData.keys()) {
                console.log(key, ':', formData.get(key))
            }

            axios
                .patch('/server/api/uploads/images', formData, {
                    headers: {
                        email: userInfo.email,
                        RefreshToken: userInfo.refreshToken,
                        AccessToken: userInfo.accessToken,
                    },
                })
                .then((response) => {
                    // 업로드 완료 후 처리할 작업
                    console.log('파일 업로드 성공:', response)
                })
                .catch((error) => {
                    // 업로드 오류 처리
                    console.error('파일 업로드 오류:', error)
                })
        }
    }

    const handleCancle = () => {
        // 취소 버튼 클릭
        if (confirm('정말로 취소하시겠습니까?') === true) {
            router.push('/')
        }
    }

    const handleaddPost = async () => {
        console.log('제목 : ', title, '내용 : ', content, '카테고리ID : ', category, hidePostIsChecked, commentIsChecked);
        // 게시 버튼 클릭
        try {
            const resopnse = await axios.post(
                '/server/api/posts',
                {
                    boardID: category, // 카테고리 ID
                    title: title, // 제목
                    content: content, // 내용
                    tag: '', // 태그
                    postUseState: true, // 숨김 여부
                    commentUseState: true, // 댓글 가능 여부
                    preview: '', // 게시글 목록에 보일 내용 프리뷰
                },
                {
                    headers: {
                        // email: userInfo.email,
                        // RefreshToken: userInfo.refreshToken,
                        // AccessToken: userInfo.accessToken,
                    },
                }
            )
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <Box sx={{ marginTop: 10, padding: 5 }}>
            {/* 카테고리 설정 요소 */}

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">카테고리</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value)
                    }}
                    label="카테고리">
                    {categoryList.map(
                        ({ boards }) =>
                            boards.length !== 0 &&
                            boards.map((board) => (
                                <MenuItem key={board.id} value={board.id}>
                                    {board.title}
                                </MenuItem>
                            ))
                    )}
                </Select>
            </FormControl>

            {/* 제목 입력 요소 */}
            <TextField
                id="standard-basic"
                variant="standard"
                placeholder="제목을 입력하세요"
                sx={{ width: '100%' }}
                inputProps={{
                    style: {
                        height: '35px',
                        fontSize: '20px',
                    },
                }}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
            />

            {/* 내용 입력 요소 (마크다운에디터) */}
            <MDEditor
                value={content}
                onChange={setContent}
                height={500}
                textareaProps={{
                    placeholder: '내용을 입력하세요',
                }}
                commands={[
                    // 툴바 설정
                    ...custumCommands,
                    commands.group([], imageToolbar),
                ]}
            />

            {/* 태그 입력 요소 */}
            <TextField id="standard-basic" variant="standard" placeholder="태그 입력" sx={{ width: '100%' }} />

            <FormControlLabel
                value="comment"
                control={<Switch color="primary" onChange={(e) => {
                    setCommentIsChecked(e.target.checked)
                }} />}
                label="댓글 가능"
                labelPlacement="start"
            />

            <FormControlLabel
                value="comment"
                control={<Switch color="primary" onChange={(e) => {
                    setHidePostIsChecked(e.target.checked)
                }} />}
                label="포스트 숨기기"
                labelPlacement="start"
            />
            <br/>
            {/* 버튼 요소 */}
            <Button size="small" variant="outlined" color="error" onClick={handleCancle}>
                취소
            </Button>
            <Button size="small" variant="contained" onClick={handleaddPost}>
                게시
            </Button>
        </Box>
        
    )
}
