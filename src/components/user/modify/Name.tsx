import { AccountCircle } from '@mui/icons-material'
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'

interface Props {
    name: string
    setName: (nickname: string) => void
}

export default function Name({ name, setName }: Props) {

    return (
        <>
            <OutlinedInput
                size="small"
                type="text"
                placeholder='유저 네임'
                startAdornment={
                    <InputAdornment position="start">
                        <IconButton aria-label="toggle password visibility" edge="start">
                            <AccountCircle />
                        </IconButton>
                    </InputAdornment>
                }
                value={name || ''}
                onChange={(e) => {
                    setName(e.target.value)
                }}
                sx={{ width: '290px', marginTop: '20px' }}
            />
        </>
    )
}
