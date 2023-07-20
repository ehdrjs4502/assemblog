import { Mail } from '@mui/icons-material'
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'

interface Props {
    email: string
    setEmail: (email: string) => void
}

export default function Email({ email, setEmail }: Props) {
    return (
        <>
            <OutlinedInput
                size="small"
                type="text"
                startAdornment={
                    <InputAdornment position="start">
                        <IconButton aria-label="toggle password visibility" edge="start">
                            <Mail />
                        </IconButton>
                    </InputAdornment>
                }
                defaultValue={email}
                sx={{ width: '290px', marginTop: '20px' }}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />
        </>
    )
}
