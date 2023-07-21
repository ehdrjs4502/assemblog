import { TextField } from '@mui/material'

interface Props {
    introduction: string
    setIntroduction: (introduction: string) => void
}

export default function Introduction({ introduction, setIntroduction }: Props) {
    return (
        <>
            <TextField
                id="outlined-multiline-static"
                label="소개글 수정"
                multiline
                rows={6}
                value={introduction}
                onChange={(e) => {
                    setIntroduction(e.target.value)
                }}
                sx={{ width: '290px', marginTop: '30px' }}
            />
        </>
    )
}
