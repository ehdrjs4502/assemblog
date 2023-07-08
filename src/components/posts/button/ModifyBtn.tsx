import { useRouter } from "next/router"
import Button from '@mui/material/Button';

export default function ModifyBtn({post}: any) {
    const router = useRouter()

    return(
        <Button variant="outlined" onClick={() => router.push({pathname: '/post/edit', query: post}, `/post/edit`)}>수정</Button>
    )
}