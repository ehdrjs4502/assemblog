import axios from "axios";
import { Button, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { useState, FormEvent, useRef } from "react";
import HeadTitle from "@/components/HeadTitle"

type inputData = {
    id: string,
    pw: string,
}

export default function login() {
    const title = 'Login';
    const [id, setID] = useState<string>('');
    const [pw, setPW] = useState<string>(''); 
    const [idCheck, setIDCheck] = useState<Boolean>(true);
    const [pwCheck, setPWCheck] = useState<Boolean>(true);

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const handleLogin = (e: FormEvent) => { // 로그인 버튼 클릭했을 때 함수
        e.preventDefault();
        if(id === '') {
            setIDCheck(false);
            idRef.current?.focus();
        } else if(pw === '') {
            setPWCheck(false);
            pwRef.current?.focus();
        } else {
            login({id, pw}); // 로그인 함수 호출
        }
    }

    const login = async (inputData: inputData) => { // 로그인 api 요청 함수
        console.log("인풋 데이타 : ",inputData)
        try {
            const response = await axios.post('', inputData); // 로그인 응답 값
        } catch (error) {
          console.error(error); // 요청 실패 또는 응답을 받지 못했을 때 에러 출력
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
                <TextField id="outlined-basic" label="ID" variant="outlined" type="text" size="small" error={!idCheck} helperText={idCheck ? "" : "아이디를 입력해주세요"} onChange={(e) => {setID(e.target.value); setIDCheck(true)}} inputRef={idRef}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" size="small" error={!pwCheck} helperText={pwCheck ? "" : "비밀번호를 입력해주세요"} onChange={(e) => {setPW(e.target.value); setPWCheck(true)}} inputRef={pwRef}/>
                <Button type="submit" variant="contained">로그인</Button>
                <Link href="/signup">
                    <span>회원가입 하러가기</span>
                </Link>
            </Stack>
        </div>
    )
}