import { Button } from '@mui/material'
import Name from './modify/Name'
import OldPw from './modify/OldPw'
import NewPw from './modify/NewPw'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Cookies } from 'react-cookie'
import axios from 'axios'
import reissueAccToken from '@/function/reissueAccToken'

interface Props {
    value: number
    index: number
}

export default function UserPWView({ value, index }: Props) {
    const [oldPw, setOldPw] = useState<string>('') // 기존 비밀번호
    const [newPw, setNewPw] = useState<string>('') // 기존 비밀번호
    const cookie = new Cookies()
    const router = useRouter()

    const onClickModifyBtn = async () => {
        let isSuccess = false

        if (oldPw === '') {
            alert('기존 비밀번호를 입력해주세요.')
            return
        }

        if (newPw === '') {
            alert('새로운 비밀번호를 입력해주세요.')
            return
        }

        if (oldPw === newPw) {
            alert('기존 비밀번호와 새로운 비밀번호가 같습니다.')
            return
        }

        try {
            const email = cookie.get('email')
            const response = await axios.patch(
                '/server/api/users',
                {
                    email: email,
                    oldPassword: oldPw,
                    newPassword: newPw,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookie.get('accessToken')}`,
                        'ngrok-skip-browser-warning': '1234',
                    },
                }
            )
            console.log('response: ', response)
            isSuccess = true
            
            //기존 비밀번호 틀리면
            if (response.data === 'Not match password') {
                alert('기존 비밀번호가 틀립니다')
                return
            }

            router.push('/')
        } catch (error: any) {
            if (error.response.status === 401) {
                await reissueAccToken()
                !isSuccess && onClickModifyBtn()
            }
        }
    }

    return (
        <>
            {value === index && (
                <div className="userinfo-box">
                    <h4>유저 비밀번호 수정</h4>
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
                    margin-bottom: 280px;
                }

                .modal-button-container {
                    margin-top: 50px;
                }
            `}</style>
        </>
    )
}
