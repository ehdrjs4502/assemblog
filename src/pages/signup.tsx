import axios from 'axios'
import Link from 'next/link'
import { useState, FormEvent, useRef } from 'react'
import Button from '@mui/material/Button'
import { Stack, TextField } from '@mui/material'
import HeadTitle from '@/components/HeadTitle'
import router from 'next/router'

type inputData = {
    email: String
    password: String
    username: String
}

export default function signup() {
    const title = 'SignUp'
    const [pw, setPW] = useState<String>('')
    const [email, setEmail] = useState<String>('')
    const [username, setUsername] = useState<String>('')
    const [emailCheck, setEmailCheck] = useState<Boolean>(true)
    const [usernameCheck, setUsernameCheck] = useState<Boolean>(true)
    const [pwCheck, setPWCheck] = useState<Boolean>(true)

    const emailRef = useRef<HTMLInputElement>(null)
    const userNameRef = useRef<HTMLInputElement>(null)
    const pwRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: FormEvent) => {
        // 회원가입 버튼 클릭 했을 때 함수
        e.preventDefault()

        /** 인풋창에 값 썻는지 확인 */
        if (email === '') {
            // 이메일 인풋창에 값이 없으면
            setEmailCheck(false)
            emailRef.current?.focus() // 이메일 인풋창에 포커싱
        } else if (username === '') {
            // 닉네임 인풋창에 값이 없으면
            setUsernameCheck(false)
            userNameRef.current?.focus() // 닉네임 인풋창에 포커싱
        } else if (pw === '') {
            // 위와 동일
            setPWCheck(false)
            pwRef.current?.focus()
        } else {
            const inputData = { email: email, password: pw, username: username } // 인풋 값 저장
            register(inputData) // 회원가입 요청 함수 호출
        }
    }

    const register = async (inputData: inputData) => {
        // 회원가입 api 요청 함수
        try {
            const response = await axios.post('/server/users/signup', inputData) // 회원가입 응답 값
            if (response.status === 200) {
                alert('회원가입 성공!')
                router.push('/login')
            }
        } catch (error: any) {
            alert(error.response.data) // 인풋창 헬퍼 텍스트로 나오게끔 바꿔야함!!
        }
        ;[]
    }

    return (
        <div>
            <HeadTitle title={title} />
            <h2>회원가입 페이지</h2>
            <Stack
                component="form"
                sx={{
                    width: '25ch',
                }}
                spacing={2}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    size="small"
                    error={!emailCheck}
                    helperText={emailCheck ? '' : '이메일을 입력해주세요'}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setEmailCheck(true)
                    }}
                    inputRef={emailRef}
                />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    size="small"
                    error={!pwCheck}
                    helperText={pwCheck ? '' : '비밀번호를 입력해주세요'}
                    onChange={(e) => {
                        setPW(e.target.value)
                        setPWCheck(true)
                    }}
                    inputRef={pwRef}
                />
                <TextField
                    id="outlined-basic"
                    label="User Name"
                    variant="outlined"
                    type="text"
                    size="small"
                    error={!usernameCheck}
                    helperText={usernameCheck ? '' : '유저 네임을 입력해주세요'}
                    onChange={(e) => {
                        setUsername(e.target.value)
                        setUsernameCheck(true)
                    }}
                    inputRef={userNameRef}
                />
                <Button type="submit" variant="contained">
                    회원가입
                </Button>
                <Link href="/login">
                    <span>로그인 페이지로 돌아가기</span>
                </Link>
            </Stack>
        </div>
    )
}
