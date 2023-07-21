import { Visibility, VisibilityOff, Key } from '@mui/icons-material'
import { Box, IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { MouseEvent, useState } from 'react'

interface Props {
    pw: string
    setPW: (pw: string) => void
}

export default function OldPw({ pw, setPW }: Props) {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    return (
        <>
            <Box component='form'>
                <OutlinedInput
                    size="small"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="off"
                    placeholder='기존 비밀번호 입력'
                    startAdornment={
                        <InputAdornment position="start">
                            <IconButton aria-label="toggle password visibility" edge="start">
                                <Key />
                            </IconButton>
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    defaultValue={pw}
                    onChange={(e) => {
                        setPW(e.target.value)
                    }}
                    sx={{ width: '290px', marginTop: '20px' }}
                />
            </Box>
        </>
    )
}
