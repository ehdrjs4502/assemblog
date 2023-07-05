import { useState, useRef, ChangeEvent, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Cookies } from 'react-cookie'
import { FormControlLabel, Switch } from '@mui/material'
import SetCategory from './EditCategory'
import EditTitle from './EditTitle'
import EditThumbnail from './EditThumbnail'
import EditContent from './EditContent'
import reissueAccToken from '@/function/reissueAccToken'
import EditTag from './EditTag'

type userInfo = {
    email: string
    accessToken: string
    refreshToken: string
}

export default function EditPost() {
    const [category, setCategory] = useState<string>('') // 선택한 카테고리
    const [thumbnail, setThumbnail] = useState<string>('') // 썸네일 URL 설정
    const [title, setTitle] = useState<string>('') // 제목
    const [content, setContent] = useState<any>('') // 내용
    const [tagList, setTagList] = useState<any>([]) // 태그 리스트
    const [commentIsChecked, setCommentIsChecked] = useState<boolean>(false) // 댓글 달기 여부
    const [hidePostIsChecked, setHidePostIsChecked] = useState<boolean>(false) // 포스트 숨기기 여부
    const contentImgInputRef = useRef<HTMLInputElement>(null) // 파일 인풋창 ref
    const thumnailImgInputRef = useRef<HTMLInputElement>(null) // 썸네일 인풋창 ref
    const cookie = new Cookies()
    const router = useRouter()
    const userInfo: userInfo = {
        email: cookie.get('email'),
        accessToken: cookie.get('accessToken'), // 액세스 토큰 저장
        refreshToken: cookie.get('refreshToken'), // 리프레쉬 토큰 저장
    }

    const handleImageBtnClick = (isThumbnail: boolean) => {
        // 이미지 업로드 버튼 클릭시 썸네일 버튼인지 내용 이미지 버튼인지 확인
        const fileInputRef = isThumbnail ? thumnailImgInputRef : contentImgInputRef

        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>, isThumbnail: boolean) => {
        // 파일 열기 했을 때
        // 파일 가져오기
        const file = event.target.files?.[0]

        if (file) {
            const formData = new FormData()
            formData.append('file', file) // 폼 데이터에 저장
            await axios
                .post('/server/api/uploads/images', formData, {
                    headers: {
                        email: userInfo.email,
                        RefreshToken: userInfo.refreshToken,
                        AccessToken: userInfo.accessToken,
                    },
                })
                .then((response) => {
                    // 업로드 완료 후 처리할 작업
                    console.log('파일 업로드 성공:', response.data)

                    reissueAccToken(response.headers['accessToken']) // 액세스 토큰 만료되면 재발급하는 함수

                    if (isThumbnail) {
                        setThumbnail(response.data)
                    } else {
                        // 내용에 이미지이면
                        const imageURL = `![](${response.data})` // 이미지 URL 마크다운 형식으로 변경
                        setContent((prevContent: string) => prevContent + imageURL) // 기존 내용에다가 이미지 삽입
                    }
                })
                .catch((error) => {
                    // 업로드 오류 처리
                    console.error('파일 업로드 오류:', error)
                })
        }
    }

    const handleaddPostBtn = async (isTempSave: boolean) => {
        // 게시 버튼 클릭시
        const preview = content.replace(/!\[\]\([^)]+\)|[!@#$%^&*()`~-]|[(\r\n|\n|\r)]/g, '') // 순수한 문자만 필터링해서 프리뷰로..

        console.log(category, title, userInfo.email, content, preview, tagList)
        // 게시 버튼 클릭
        try {
            const response = await axios.post(
                '/server/api/posts',
                {
                    boardId: category, // 카테고리 ID
                    writerMail: userInfo.email, // 글쓴이 이메일
                    title: title, // 제목
                    content: content, // 내용
                    thumbnail: thumbnail, // 썸네일 이미지
                    postUseState: hidePostIsChecked, // 숨김 여부
                    commentUseState: commentIsChecked, // 댓글 가능 여부
                    tempSaveState: isTempSave, // 임시 저장 여부
                    preview: preview, // 게시글 목록에 보일 내용 프리뷰
                    tags: tagList, // 태그
                },
                {
                    headers: {
                        email: userInfo.email,
                        RefreshToken: userInfo.refreshToken,
                        AccessToken: userInfo.accessToken,
                    },
                }
            )
            
            console.log(response)
            
            reissueAccToken(response.headers['accessToken']) // 액세스 토큰 만료되면 재발급하는 함수

        } catch (error: any) {
            console.log(error)
        }
    }

    const handleCancleBtn = () => {
        // 취소 버튼 클릭시
        // 취소 버튼 클릭
        if (confirm('정말로 취소하시겠습니까?') === true) {
            router.push('/')
        }
    }

    return (
        <>
            <Box sx={{ marginTop: 10, padding: 5 }}>
                {/* 카테고리 설정 요소 */}
                <SetCategory category={category} setCategory={setCategory} />

                {/* 썸네일 지정 요소 */}
                <EditThumbnail
                    inputRef={thumnailImgInputRef}
                    handleImageUpload={handleImageUpload}
                    handleImageBtnClick={handleImageBtnClick}
                />

                {/* 제목 입력 요소 */}
                <EditTitle setTitle={setTitle} />

                {/* 내용 입력 요소 (마크다운에디터) */}
                <EditContent
                    content={content}
                    setContent={setContent}
                    inputRef={contentImgInputRef}
                    handleImageUpload={handleImageUpload}
                    handleImageBtnClick={handleImageBtnClick}
                />

                {/* 태그 입력 요소 */}
                <EditTag tagList={tagList} setTagList={setTagList}/>

                {/* 댓글, 숨기기 체크 요소 */}
                <FormControlLabel
                    value="comment"
                    control={
                        <Switch
                            color="primary"
                            onChange={(e) => {
                                setCommentIsChecked(e.target.checked)
                            }}
                        />
                    }
                    label="댓글 가능"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="comment"
                    control={
                        <Switch
                            color="primary"
                            onChange={(e) => {
                                setHidePostIsChecked(e.target.checked)
                            }}
                        />
                    }
                    label="포스트 숨기기"
                    labelPlacement="start"
                />
                <br />

                {/* 버튼 요소 */}
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                        handleaddPostBtn(true)
                    }}>
                    임시 저장
                </Button>
                <Button size="small" variant="outlined" color="error" onClick={handleCancleBtn}>
                    취소
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                        handleaddPostBtn(false)
                    }}>
                    게시
                </Button>
            </Box>
        </>
    )
}
