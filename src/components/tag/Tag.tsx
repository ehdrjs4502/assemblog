import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export default function Tag({ tag }: any) {
    const router = useRouter()

    const onClickBtn = (tag: string) => {
        router.push({pathname: `/tag/${tag}`})
    }

    return (
        <>
            <Button variant="outlined" onClick={() => onClickBtn(tag)} sx={{height:'50px'}}>{tag}</Button>
        </>
    )
}
