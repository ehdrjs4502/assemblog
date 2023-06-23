import axios from "axios";
import { Button, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { useState, FormEvent } from "react";

export default function login() {
    const [id, setID] = useState<String>(''); // id
    const [pw, setPW] = useState<String>(''); 

    const handleLogin = (e: FormEvent) => { // 로그인 버튼 클릭했을 때
        e.preventDefault();
        console.log(id, pw);
        axios.post("", {
            id: id,
            pw: pw,
        }).then((res) => {
            
        });
    }

    return (
        <div>
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
                <TextField id="outlined-basic" label="ID" variant="outlined" type="text" size="small" onChange={(e) => {setID(e.target.value)}}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" size="small" onChange={(e) => {setPW(e.target.value)}}/>
                <Button type="submit" variant="contained">로그인</Button>
                <Link href="/signup">
                    <span>회원가입 하러가기</span>
                </Link>
            </Stack>
        </div>
    )
}