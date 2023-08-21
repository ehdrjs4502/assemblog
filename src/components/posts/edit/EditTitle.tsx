import TextField from '@mui/material/TextField'

interface Props {
    title: string
    setTitle: (title: string) => void
}

export default function EditTitle({setTitle, title}: Props) {
    return (
        <>
            <TextField
                id="standard-basic"
                variant="standard"
                value={title}
                placeholder="제목을 입력하세요"
                sx={{ width: '100%' }}
                inputProps={{
                    style: {
                        height: '35px',
                        fontSize: '20px',
                    },
                }}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
            />
        </>
    )
}
