import reissueAccToken from '@/function/reissueAccToken'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useRef } from 'react'
import { Cookies } from 'react-cookie'

interface Props {
    bgImgUrl: string | null
    setBgImgUrl: (bgImgUrl: string) => void
}

export default function BgImage({ bgImgUrl, setBgImgUrl }: Props) {
    const inputRef = useRef<HTMLInputElement>(null) // 파일 인풋창 ref
    const cookie = new Cookies()

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

                setBgImgUrl(response.data)
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
            <button className="bgimg-btn" type="button" onClick={handleImageBtnClick}>
                <Image
                    src={bgImgUrl === null ? '/img/defaultBgImg.png' : bgImgUrl}
                    width={160}
                    height={160}
                    alt="배경 이미지"
                />
            </button>

            <style jsx>
                {`
                    .bgimg-btn {
                        border: 1px solid black;
                        background-color: transparent;
                    }
                    .bgimg-btn:hover {
                        cursor: pointer;
                        border: 1px solid blue;
                    }
                `}
            </style>
        </>
    )
}
