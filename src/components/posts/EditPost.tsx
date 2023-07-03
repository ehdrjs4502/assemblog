import MDEditor, { commands } from '@uiw/react-md-editor'
import { useState, useRef, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function EditPost() {
    const [value, setValue] = useState<any>('내용 입력')

    const custumCommands = commands.getCommands().filter((e) => e.name !== 'image') // 기존 이미지 버튼 삭제

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleButtonClick = () => {
        // 인풋 파일 창 클릭
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        // 파일 가져오기
        const file = event.target.files?.[0]

        // 선택한 파일을 업로드 또는 처리하는 로직을 추가하세요.
        console.log('Selected file:', file)
    }

    return (
        <Box sx={{ marginTop: 10, padding: 5 }}>
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
            <Button size="small" variant="outlined" color="error">
                취소
            </Button>
            <Button size="small" variant="contained">
                게시
            </Button>
        </Box>
    )
}
