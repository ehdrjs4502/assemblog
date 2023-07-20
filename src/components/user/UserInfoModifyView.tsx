import { Button } from '@mui/material'
import Email from './modify/Email'
import Nickname from './modify/Name'
import Password from './modify/Password'
import { useState } from 'react'
import { useRouter } from 'next/router'
import ProfileImage from './modify/ProfileImage'

interface Props {
    value: number
    index: number
}

export default function UserInfoModifyView({ value, index }: Props) {
    const [profileImage, setProfileImage] = useState<string>('') // 프로필 이미지
    const [name, setName] = useState<string>('') // 닉네임
    const [email, setEmail] = useState<string>('') // 이메일
    const [pw, setPW] = useState<string>('') // 비밀번호
    const router = useRouter()
    return (
        <>
            {value === index && (
                <div className="userinfo-box">
                    <h4>유저 정보 수정</h4>
                    <ProfileImage profileImage={profileImage} setProfileImage={setProfileImage} />
                    <Nickname name={name} setName={setName} />
                    <Email email={email} setEmail={setEmail} />
                    <Password pw={pw} setPW={setPW} />
                    <div className="modal-button-container">
                        <Button
                            sx={{ marginRight: 2 }}
                            onClick={() => router.push('/')}
                            variant="outlined"
                            color="error"
                            size="small">
                            취소
                        </Button>
                        <Button onClick={() => {}} variant="contained" size="small">
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
