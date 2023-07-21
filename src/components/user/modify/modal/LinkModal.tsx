import reissueAccToken from '@/function/reissueAccToken'
import { Avatar, Box, Button, Modal, TextField, Tooltip } from '@mui/material'
import axios from 'axios'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Cookies } from 'react-cookie'

interface Props {
    link: any
    idx: number
    setLinkList: (link: any) => void
}

export default function LinkModal({ link, idx, setLinkList }: Props) {
    const [open, setOpen] = useState(false)
    const [linkDescription, setLinkDescription] = useState('')
    const [linkImgURL, setLinkImgURL] = useState('')
    const [linkURL, setLinkURL] = useState('')

    useEffect(() => {
        setLinkDescription(link.linkDescription)
        setLinkImgURL(link.linkImageURL)
        setLinkURL(link.linkURL)
    }, [])

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const cookie = new Cookies()
    const inputRef = useRef<HTMLInputElement>(null) // 파일 인풋창 ref

    const handleImageBtnClick = () => {
        // 이미지 업로드 버튼 클릭시 썸네일 버튼인지 내용 이미지 버튼인지 확인

        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
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

                setLinkImgURL(response.data)
                isSuccess = true
            } catch (error: any) {
                await reissueAccToken()
                !isSuccess && handleImageUpload(event)
            }
        }
    }

    // 확인 버튼 눌렀을 때 idx에 맞는 객체 값 수정
    const onClickOkBtn = () => {
        setLinkList((prevLinkList: any) => {
            const updatedLinkList = [...prevLinkList]
            updatedLinkList[idx] = {
                ...updatedLinkList[idx],
                linkDescription: linkDescription, // 링크 설명 변경
                linkImageURL: linkImgURL, // 링크 이미지 URL 변경
                linkURL: linkURL, // 링크 주소 변경
            }
            return updatedLinkList
        })
        handleClose() // 변경 완료 후 모달 닫기
    }

    const imgStyle = {
        width: 50,
        height: 50,
        '&:hover': { cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.4)' },
    }

    const modalStyle = {
        // 모달 창 스타일
        position: 'absolute' as 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
    }

    return (
        <>
            <input type="file" style={{ display: 'none' }} ref={inputRef} onChange={(e) => handleImageUpload(e)} />
            <Tooltip title={'링크' + idx + ' 변경'} disableInteractive placement="top" arrow>
                <Avatar alt="Link Image" src={linkImgURL} sx={imgStyle} onClick={handleOpen} />
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description">
                <Box sx={modalStyle}>
                    <span className="title">{'링크' + idx + ' 변경'}</span>
                    <Tooltip title="이미지 설정" disableInteractive placement="top" arrow>
                        <Avatar
                            alt="Link Image1"
                            src={linkImgURL}
                            sx={imgStyle}
                            onClick={() => handleImageBtnClick()}
                        />
                    </Tooltip>
                    <TextField
                        variant="standard"
                        label="링크 설명"
                        value={linkDescription}
                        sx={{ marginTop: '20px' }}
                        onChange={(e) => {
                            setLinkDescription(e.target.value)
                        }}
                    />
                    <TextField
                        variant="standard"
                        label="링크 주소"
                        value={linkURL}
                        sx={{ marginTop: '20px' }}
                        onChange={(e) => {
                            setLinkURL(e.target.value)
                        }}
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
                        <Button onClick={onClickOkBtn} variant="contained" size="small">
                            확인
                        </Button>
                    </div>
                </Box>
            </Modal>

            <style jsx>
                {`
                    .title {
                        font-weight: bold;
                        margin-bottom: 30px;
                    }

                    .modal-button-container {
                        margin-top: 30px;
                    }
                `}
            </style>
        </>
    )
}
