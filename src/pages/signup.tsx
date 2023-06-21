import axios from "axios";
import Link from "next/link";
import { useState, FormEvent, useRef } from "react";
import Button from "@mui/material/Button";
import { Stack, TextField } from "@mui/material";


export default function signup() {
    const [id, setID] = useState<String>(''); // id
    const [pw, setPW] = useState<String>(''); 
    const [email, setEmail] = useState<String>('');
    const [nickName, setNickName] = useState<String>('');
    const [idCheck, setIDCheck] = useState(true);
    const [emailCheck, setEmailCheck] = useState(true);
    const [nickNameCheck, setNickNameCheck] = useState(true);
    const [pwCheck, setPWCheck] = useState(true);

    const emailRef = useRef<HTMLInputElement>(null);
    const nickNameRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => { // 회원가입 버튼 클릭 했을 때
        e.preventDefault();

        /** 인풋창에 값 썻는지 확인 */
        if(email === '') { // 이메일 인풋창에 값이 없으면
            setEmailCheck(false);
            emailRef.current?.focus(); // 이메일 인풋창에 포커싱
        } else if(nickName === '') {
            setNickNameCheck(false);
            nickNameRef.current?.focus();
        } else if(pw === '') {
            setPWCheck(false);
            pwRef.current?.focus();
        }

        console.log(email, emailCheck);

        axios.post("", {
            id: id,
            pw: pw,
            email: email,
            nickName: nickName,
        }).then((res) => {
            console.log(res);
        }).catch((e) => {
            console.error(e);
        })
    };

    return (
        <div>
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
                    <TextField id="outlined-basic" label="Email" variant="outlined" type="email" size="small" error={!emailCheck} helperText={emailCheck ? "" : "이메일을 입력해주세요"} onChange={(e) => {setEmail(e.target.value); setEmailCheck(true)}} inputRef={emailRef}/>
                    <TextField id="outlined-basic" label="NickName" variant="outlined" type="text" size="small" error={!nickNameCheck} helperText={nickNameCheck ? "" : "아이디를 입력해주세요"} onChange={(e) => {setNickName(e.target.value); setNickNameCheck(true)}} inputRef={nickNameRef}/>
                    <TextField id="outlined-basic" label="ID" variant="outlined" type="text" size="small" error={!idCheck} helperText={idCheck ? "" : "중복된 아이디입니다. 다른 ID를 사용해주세요"} onChange={(e) => {setID(e.target.value)}}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password" size="small" error={!pwCheck} helperText={pwCheck ? "" : "비밀번호를 입력해주세요"} onChange={(e) => {setPW(e.target.value)}} inputRef={pwRef}/>
                    <Button type="submit" variant="contained">회원가입</Button>

                <Link href="/login">
                    <span>로그인 페이지로 돌아가기</span>
                </Link>
            </Stack>
        </div>
    )
}