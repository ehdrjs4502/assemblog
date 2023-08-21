import { useState, useRef, ChangeEvent, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Cookies } from 'react-cookie'
import { FormControlLabel, Switch } from '@mui/material'
import EditCategory from './EditCategory'
import EditTitle from './EditTitle'
import EditThumbnail from './EditThumbnail'
import EditContent from './EditContent'
import reissueAccToken from '@/function/reissueAccToken'
import EditTag from './EditTag'

export default function EditPost() {
    const [category, setCategory] = useState<string>('') // 선택한 카테고리
    const [thumbnail, setThumbnail] = useState<string>(
        'https://storage.googleapis.com/assemblog_bucket/images/default_thumbnail.png'
    ) // 썸네일 URL 설정
    const [title, setTitle] = useState<string>('') // 제목
    const [content, setContent] = useState<any>('') // 내용
    const [tagList, setTagList] = useState<any>([]) // 태그 리스트
    const [commentIsChecked, setCommentIsChecked] = useState<boolean>(false) // 댓글 달기 여부
    const [postUseIsChecked, setPostUseIsChecked] = useState<boolean>(true) // 포스트 게시 여부
    const contentImgInputRef = useRef<HTMLInputElement>(null) // 파일 인풋창 ref
    const thumnailImgInputRef = useRef<HTMLInputElement>(null) // 썸네일 인풋창 ref
    const cookie = new Cookies()
    const router = useRouter()

    useEffect(() => {
        if (router.query.postId !== undefined) {
            setCategory(router.query.cateogry as string)
            setTitle(router.query.title as string)
            setContent(router.query.content as string)
            setThumbnail(router.query.thumbnail as string)
            if (router.query.tagList !== undefined) {
                setTagList(Array.isArray(router.query.tagList) ? router.query.tagList : [router.query.tagList])
            }
        }
    }, [])

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
            let isSuccess = false
            const formData = new FormData()
            formData.append('file', file) // 폼 데이터에 저장
            try {
                const response = await axios.post('/server/api/uploads/images', formData, {
                    headers: {
                        Authorization: `Bearer ${cookie.get('accessToken')}`,
                    },
                })

                if (isThumbnail) {
                    setThumbnail(response.data)
                } else {
                    // 내용에 이미지이면
                    const imageURL = `![](${response.data})` // 이미지 URL 마크다운 형식으로 변경
                    setContent((prevContent: string) => prevContent + imageURL) // 기존 내용에다가 이미지 삽입
                }
                isSuccess = true
            } catch (error: any) {
                if (error.response.status === 401) {
                    await reissueAccToken()
                    !isSuccess && handleImageUpload(event, isThumbnail)
                }
            }
        }
    }

    const handleaddPostBtn = async (isTempSave: boolean) => {
        let isSuccess = false
        // 게시 버튼 클릭시
        const preview = content
            .replace(/!\[\]\([^)]+\)|[!@#$%^&*()`~-]|[(\r\n|\n|\r)]|<\/?[^>]+(>|$)/g, '')
            .substr(0, 100) // 순수한 문자만 필터링해서 프리뷰로..

        let postData: any = {
            boardId: category, // 카테고리 ID
            writerMail: cookie.get('email'), // 글쓴이 이메일
            title: title, // 제목
            content: content, // 내용
            thumbnail: thumbnail, // 썸네일 이미지
            postUseState: postUseIsChecked, // 숨김 여부
            commentUseState: commentIsChecked, // 댓글 가능 여부
            tempSaveState: isTempSave, // 임시 저장 여부
            preview: preview, // 게시글 목록에 보일 내용 프리뷰
            tags: tagList, // 태그
        }

        if (!category) {
            return alert('카테고리를 선택해주세요')
        }

        if (!title.trim()) {
            return alert('제목을 작성해주세요')
        }

        if (!content.trim()) {
            return alert('내용 작성해주세요')
        }

        // 게시 버튼 클릭
        try {
            const headers = {
                Authorization: `Bearer ${cookie.get('accessToken')}`,
            }
            // 새로운 글 작성인지 수정인지 확인 undefined면 새로운 글 작성
            if (router.query.postId === undefined) {
                const response = await axios.post('/server/api/posts', postData, {
                    headers,
                })

                if (response.status === 200) {
                    alert('글 작성 완료')
                    router.push('/')
                } else {
                    alert('글 작성 실패..')
                }
            } else {
                postData['id'] = router.query.postId
                const response = await axios.patch('/server/api/posts', postData, {
                    headers,
                })

                if (response.status === 200) {
                    alert('글 수정 완료')
                    router.push('/')
                } else {
                    alert('글 작성 실패..')
                }
            }
            isSuccess = true
        } catch (error: any) {
            if (error.response.status === 401) {
                await reissueAccToken()
                !isSuccess && handleaddPostBtn(isTempSave)
            }
        }
    }

    const handleCancleBtn = () => {
        // 취소 버튼 클릭시
        if (confirm('정말로 취소하시겠습니까?') === true) {
            router.push('/')
        }
    }

    return (
        <>
            <Box sx={{ marginTop: 10, padding: 5 }}>
                {/* 카테고리 설정 요소 */}
                <EditCategory category={category} setCategory={setCategory} />

                {/* 썸네일 지정 요소 */}
                <EditThumbnail
                    thumbnail={thumbnail}
                    inputRef={thumnailImgInputRef}
                    handleImageUpload={handleImageUpload}
                    handleImageBtnClick={handleImageBtnClick}
                />

                {/* 제목 입력 요소 */}
                <EditTitle setTitle={setTitle} title={title} />

                {/* 내용 입력 요소 (마크다운에디터) */}
                <EditContent
                    content={content}
                    setContent={setContent}
                    inputRef={contentImgInputRef}
                    handleImageUpload={handleImageUpload}
                    handleImageBtnClick={handleImageBtnClick}
                />

                {/* 태그 입력 요소 */}
                <EditTag tagList={tagList} setTagList={setTagList} />

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
                            defaultChecked
                            color="primary"
                            onChange={(e) => {
                                setPostUseIsChecked(e.target.checked)
                            }}
                        />
                    }
                    label="게시 여부"
                    labelPlacement="start"
                />
                {/* 버튼 요소 */}
                <div className="btn-box">
                    <Button
                        size="small"
                        variant="outlined"
                        sx={{ marginRight: '18px' }}
                        onClick={() => {
                            handleaddPostBtn(true)
                        }}>
                        임시 저장
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        sx={{ marginRight: '18px' }}
                        color="error"
                        onClick={handleCancleBtn}>
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
                </div>
            </Box>

            <style jsx>{`
                .btn-box {
                    display: flex;
                    justify-content: flex-end;
                }
            `}</style>
        </>
    )
}
