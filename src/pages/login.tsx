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
    const [idCheck, setIDCheck] = useState<Boolean>(true);
    const [pwCheck, setPWCheck] = useState<Boolean>(true);

    const cookie = new Cookies(); // 로그인 refreshToken 담을 겁니당

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const handleLogin = (e: FormEvent) => { // 로그인 버튼 클릭했을 때 함수
        e.preventDefault();
        if(email === '') {
            setIDCheck(false);
            idRef.current?.focus();
        } else if(pw === '') {
            setPWCheck(false);
            pwRef.current?.focus();
        } else {
            const inputData = {email: email, password: pw};
            login(inputData); // 로그인 함수 호출
        }
    }

    const login = async (inputData: inputData) => { // 로그인 api 요청 함수
        console.log("인풋 데이타 : ",inputData)
        try {
            const response = await axios.post('/users/login', inputData); // 로그인 응답 값
            console.log(response);
            if(response.statusText === 'OK') { // 로그인이 성공하면
                const accessToken = response.headers;
                const refreshToken = response.headers;
                cookie.set("refreshToken", refreshToken, {
                    path: "/", // 모든 경로에서 쿠키 사용하겠다는 뜻
                    secure: true,
                })
                router.push("/");
            }
        } catch (error) {
          console.error(error); // 요청 실패 또는 응답을 받지 못했e을 때 에러 출력
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
                <TextField id="outlined-basic" label="Email" variant="outlined" type="text" size="small" error={!idCheck} helperText={idCheck ? "" : "아이디를 입력해주세요"} onChange={(e) => {setEmail(e.target.value); setIDCheck(true)}} inputRef={idRef}/>
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