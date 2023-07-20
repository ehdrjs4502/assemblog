import { Visibility, VisibilityOff, Key } from '@mui/icons-material'
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { MouseEvent, useState } from 'react'

interface Props {
    pw: string
    setPW: (pw: string) => void
}

export default function Password({ pw, setPW }: Props) {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    return (
        <>
            <OutlinedInput
                size="small"
                type={showPassword ? 'text' : 'password'}
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
        </>
    )
}
