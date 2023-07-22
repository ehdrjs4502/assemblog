import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export default function ShowMoreBtn() {
    const router = useRouter()
    const style = {
        textDecoration: 'none',
        color: 'white',
        backgroundColor: '#2E64FE',
        padding: '12px 20px 12px 20px',
        borderRadius: '16px',
        '&:hover' : {
            backgroundColor:'#0101DF',
        }
    }

    const onClickBtn = () => {
        router.push('/category')
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
            <Button onClick={onClickBtn} sx={style}>
                Show more +
            </Button>
        </div>
    )
}
