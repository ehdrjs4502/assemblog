import axios from "axios";
import { Button, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { useState, FormEvent, useRef } from "react";
import HeadTitle from "@/components/HeadTitle"
import router from "next/router";
import { Cookies } from "react-cookie";

type inputData = {
    email: string,
    password: string,
}

export default function login() {
    const title = 'Login';
    const [email, setEmail] = useState<string>('');
    const [pw, setPW] = useState<string>(''); 
    const [emailCheck, setEmailCheck] = useState<Boolean>(true);
    const [pwCheck, setPWCheck] = useState<Boolean>(true);

    const cookie = new Cookies(); // 로그인 refreshToken 담을 겁니당

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const handleLogin = (e: FormEvent) => { // 로그인 버튼 클릭했을 때 함수
        e.preventDefault();
        if(email === '') { // 이메일 인풋 비어있으면
            setEmailCheck(false);
            idRef.current?.focus();
        } else if(pw === '') { // 패스워드 인풋 비어있으면
            setPWCheck(false);
            pwRef.current?.focus();
        } else {
            const inputData = {email: email, password: pw};
            login(inputData); // 로그인 함수 호출
        }
    }

    const login = async (inputData: inputData) => { // 로그인 api 요청 함수
        try {
            const response = await axios.post('/users/login', inputData); // 로그인 응답 값
            if(response.status === 200) { // 로그인이 성공하면
                const accessToken = response.headers.accesstoken; // jwt 액세스 토큰
                const refreshToken = response.headers.refreshtoken; // jwt 리프레쉬 토큰
                cookie.set("refreshToken", refreshToken, {
                    path: "/", // 모든 경로에서 쿠키 사용하겠다는 뜻
                    secure: true,
                })
                cookie.set("accessToken", accessToken, {
                    path: "/", // 모든 경로에서 쿠키 사용하겠다는 뜻
                    secure: true,
                })
                cookie.set("email", response.data, {
                    path: "/",
                    secure: true,
                })
                router.push({
                    pathname: '/', 
                },'/');
            }
        } catch (error: any) {
            alert(error.response.data);
        }
    };

    return (
        <div>
            <HeadTitle title={title}/>
            <h2>로그인 페이지</h2>
            <Stack
                component="form"
                sx={{
                    width: '25ch',
                }}
                spacing={2}
                noValidate
                autoComplete="off"
                onSubmit={handleLogin}>
                <TextField id="outlined-basic" label="Email" variant="outlined" type="text" size="small" error={!emailCheck} helperText={emailCheck ? "" : "아이디를 입력해주세요"} onChange={(e) => {setEmail(e.target.value); setEmailCheck(true)}} inputRef={idRef}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" size="small" error={!pwCheck} helperText={pwCheck ? "" : "비밀번호를 입력해주세요"} onChange={(e) => {setPW(e.target.value); setPWCheck(true)}} inputRef={pwRef}/>
                <Button type="submit" variant="contained">로그인</Button>
                <Link href="/signup">
                    <span>회원가입 하러가기</span>
                </Link>
                <Link href="/">
                    <span>메인화면으로 이동</span>
                </Link>
            </Stack>
        </div>
    )
}