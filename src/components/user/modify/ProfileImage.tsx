import reissueAccToken from '@/function/reissueAccToken'
import { Avatar, Tooltip } from '@mui/material'
import axios from 'axios'
import { ChangeEvent, useRef } from 'react'
import { Cookies } from 'react-cookie'

interface Props {
    profileImage: string | null
    setProfileImage: (profileImage: string) => void
}

export default function ProfileImage({ profileImage, setProfileImage }: Props) {
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

                setProfileImage(response.data)
                isSuccess = true
            } catch (error: any) {
                if (error.response.status === 401) {
                    await reissueAccToken()
                    !isSuccess && handleImageUpload(event)
                }
            }
        }
    }

    return (
        <>
            <input type="file" style={{ display: 'none' }} ref={inputRef} onChange={(e) => handleImageUpload(e)} />
            <Tooltip title="프로필 이미지 변경" disableInteractive placement="top" arrow>
                <Avatar
                    alt="Profile Image"
                    src={profileImage !== null ? profileImage : ''}
                    onClick={handleImageBtnClick}
                    sx={{
                        width: 100,
                        height: 100,
                        '&:hover': { cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.4)' },
                    }}
                />
            </Tooltip>
        </>
    )
}
