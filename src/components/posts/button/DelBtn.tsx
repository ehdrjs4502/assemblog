import Button from '@mui/material/Button'
import axios from 'axios'
import { useRouter } from 'next/router'

interface Props {
    id: number
    userInfo: {
        email: string
        accessToken: string
        refreshToken: string
    }
}

export default function DelBtn({ id,userInfo }: Props) {
    const router = useRouter()

    const onClickDelBtn = async () => {
        console.log(id)
        try {
            const response = await axios.delete(`/server/api/posts/${id}`, {
                headers: {
                    email: userInfo.email,
                    RefreshToken: userInfo.refreshToken,
                    AccessToken: userInfo.accessToken,
                },
            })

            console.log(response)

            if (response.status === 200) {
                alert('글 삭제 완료')
                router.push('/')
            } else {
                alert('글 삭제 실패..')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Button
            variant="outlined"
            color="error"
            onClick={() => {
                if (confirm('정말로 삭제하시겠습니까?') == true) {
                    onClickDelBtn()
                }
            }}>
            삭제
        </Button>
    )
}
