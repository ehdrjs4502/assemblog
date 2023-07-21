import { Button } from '@mui/material'
import Name from './modify/Name'
import OldPw from './modify/OldPw'
import NewPw from './modify/NewPw'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProfileImage from './modify/ProfileImage'
import reissueAccToken from '@/function/reissueAccToken'
import { Cookies } from 'react-cookie'
import axios from 'axios'

interface Props {
    value: number
    index: number
}

export default function UserInfoModifyView({ value, index }: Props) {
    const [profileImage, setProfileImage] = useState<string>('') // 프로필 이미지
    const [name, setName] = useState<string>('') // 닉네임
    const [oldPw, setOldPw] = useState<string>('') // 기존 비밀번호
    const [newPw, setNewPw] = useState<string>('') // 기존 비밀번호
    const cookie = new Cookies()
    const router = useRouter()

    //유저 정보 가져오기
    const getUserInfo = async () => {
        let isSuccess = false
        try {
            const response = await axios.get('/server/api/users', {
                params: {},
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`,
                    'ngrok-skip-browser-warning': '1234',
                },
            })
            console.log(response.data)
            setProfileImage(response.data.profileImageURL)
            setName(response.data.username)
            isSuccess = true
        } catch (error) {
            await reissueAccToken()
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const onClickModifyBtn = async () => {
        console.log(name, oldPw, newPw, profileImage)
        let isSuccess = false
        try {
            const email = cookie.get('email')
            const response = await axios.patch(
                '/server/api/users',
                {
                    email: email,
                    username: name,
                    oldPassword: oldPw,
                    newPassword: newPw,
                    profileImageUrl: profileImage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookie.get('accessToken')}`,
                        'ngrok-skip-browser-warning': '1234',
                    },
                }
            )
            console.log(response)
            isSuccess = true
            router.push('/')
        } catch (error: any) {
            console.log(error)
            alert(error.response.data)
        }
    }

    return (
        <>
            {value === index && (
                <div className="userinfo-box">
                    <h4>유저 정보 수정</h4>
                    <ProfileImage profileImage={profileImage} setProfileImage={setProfileImage} />
                    <Name name={name} setName={setName} />
                    <OldPw pw={oldPw} setPW={setOldPw} />
                    <NewPw pw={newPw} setPW={setNewPw} />
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
