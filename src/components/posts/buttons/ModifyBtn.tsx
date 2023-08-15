import { useRouter } from 'next/router'
import Button from '@mui/material/Button'

export default function ModifyBtn({ post }: any) {
    const router = useRouter()

    const onClickModifyBtn = () => {
        router.push({ pathname: '/post/edit', query: post }, `/post/edit`)
    }

    return (
        <Button variant="outlined" sx={{marginRight:'18px'}} onClick={() => onClickModifyBtn()}>
            수정
        </Button>
    )
}
