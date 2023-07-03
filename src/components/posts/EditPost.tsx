import MDEditor, { commands } from '@uiw/react-md-editor'
import { useState, useRef, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios'
import { useRouter } from 'next/router'

export default function EditPost() {
    const [value, setValue] = useState<any>('내용 입력')
    const [category, setCategory] = useState<string>('');
    const router = useRouter();

    const handleCategory = (event: SelectChangeEvent) => { // 카테고리 선택 
      setCategory(event.target.value);
    };
  
    const custumCommands = commands.getCommands().filter((e) => e.name !== 'image'); // 기존 이미지 버튼 삭제

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        // 인풋 파일 창 클릭
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        // 파일 가져오기
        const file = event.target.files?.[0];

        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            for (let value of formData.values()) {
                console.log("값 : ",value);
            }
            
            console.log("파일 : ", file);

             // 파일을 전송할 엔드포인트 URL
            const uploadUrl = 'http://example.com/upload';

            // Axios를 사용하여 파일을 업로드
            // axios.post(uploadUrl, formData)
            //     .then(response => {
            //         // 업로드 완료 후 처리할 작업
            //         console.log('파일 업로드 성공:', response.data);
            //     })
            //     .catch(error => {
            //         // 업로드 오류 처리
            //         console.error('파일 업로드 오류:', error);
            //     });
        }

    }

    const handleCancle = () => {
        if(confirm("정말로 취소하시겠습니까?") === true) {
            router.push('/');
        }
    }

    return (
        <Box sx={{ marginTop: 10, padding: 5 }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">카테고리</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={category}
                onChange={handleCategory}
                label="카테고리"
                >
                <MenuItem value={10}>자바</MenuItem>
                <MenuItem value={20}>HTML</MenuItem>
                <MenuItem value={30}>자바스크립트</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="standard-basic"
                variant="standard"
                placeholder="제목을 입력하세요"
                sx={{ width: '100%' }}
                inputProps={{
                    style: {
                        height: '35px',
                        fontSize: '20px',
                    },
                }}
            />
            <MDEditor
                value={value}
                onChange={setValue}
                height={500}
                commands={[
                    ...custumCommands,
                    commands.group([], {
                        name: 'image',
                        groupName: 'image',
                        icon: (
                            <svg viewBox="0 0 16 16" width="12px" height="12px">
                                <path
                                    d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
                                    fill="currentColor"
                                />
                            </svg>
                        ),
                        children: (handle: any) => {
                            return (
                                <div style={{ width: 120, padding: 10 }}>
                                    <div>Image Upload</div>
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                    <button type="button" onClick={handleButtonClick}>
                                        이미지 선택
                                    </button>
                                </div>
                            )
                        },
                        buttonProps: { 'aria-label': 'Insert title' },
                    }),
                ]}
            />
            <TextField
                id="standard-basic"
                variant="standard"
                placeholder="태그 입력"
                sx={{ width: '100%' }}
            />
            <Button size="small" variant="outlined" color="error" onClick={handleCancle}>
                취소
            </Button>
            <Button size="small" variant="contained">
                게시
            </Button>
        </Box>
    )
}
