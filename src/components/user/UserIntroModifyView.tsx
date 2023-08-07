import Introduction from '@/components/user/modify/Introduction'
import { useEffect, useState } from 'react'
import Link from '@/components/user/modify/Link'
import reissueAccToken from '@/function/reissueAccToken'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { Cookies } from 'react-cookie'
import BgImage from './modify/BgImage'

interface Props {
    value: number
    index: number
}

export default function UserIntroModifyView({ value, index }: Props) {
    const [introduction, setIntroduction] = useState<string>('') // 소개글
    const [bgImgUrl, setBgImgUrl] = useState<string>('') // 배경 이미지
    const [linkList, setLinkList] = useState() // 링크 목록

    const cookie = new Cookies()
    const router = useRouter()

    //유저 소개글 가져오기
    const getUserIntro = async () => {
        let isSuccess = false
        const email = cookie.get('email')
        try {
            const response = await axios.get(`/server/lists/user-introductions?email=${email}`, {
                headers: {
                    'ngrok-skip-browser-warning': '1234',
                },
            })
            console.log(response.data[0])
            setIntroduction(response.data[0].introduction)
            setLinkList(response.data[0].links)
            setBgImgUrl(response.data[0].backgroundImageURL)
            isSuccess = true
        } catch (error) {
            await reissueAccToken()
        }
    }

    //수정 버튼 누를 시
    const onClickModifyBtn = async () => {
        let isSuccess = false
        const email = cookie.get('email')
        console.log('소개글 : ', introduction, ' 배경 : ', bgImgUrl, ' 링크 : ', linkList)
        try {
            const response = await axios.patch(
                '/server/api/user-introductions',
                {
                    email: email,
                    introduction: introduction ?? '',
                    backgroundImageURL: bgImgUrl ?? '',
                    links: linkList ?? [{}],
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookie.get('accessToken')}`,
                    },
                }
            )
            console.log(response)
            isSuccess = true
            router.push('/')
        } catch (error) {
            // await reissueAccToken()
        }
    }

    useEffect(() => {
        getUserIntro()
    }, [])

    return (
        <>
            {value === index && (
                <div className="userinfo-box">
                    <h4>유저 소개 수정</h4>
                    <Introduction introduction={introduction} setIntroduction={setIntroduction} />
                    <Link linkList={linkList} setLinkList={setLinkList} />
                    <BgImage bgImgUrl={bgImgUrl} setBgImgUrl={setBgImgUrl} />
                    <div className="modal-button-container">
                        <Button
                            sx={{ marginRight: 2 }}
                            onClick={() => router.push('/')}
                            variant="outlined"
                            color="error"
                            size="small">
                            취소
                        </Button>
                        <Button onClick={onClickModifyBtn} variant="contained" size="small">
                            수정
                        </Button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .userinfo-box {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }

                .modal-button-container {
                    margin-top: 50px;
                }
            `}</style>
        </>
    )
}
