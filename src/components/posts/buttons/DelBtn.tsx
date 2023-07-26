import reissueAccToken from '@/function/reissueAccToken'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Cookies } from 'react-cookie'

interface Props {
    id: number
}

export default function DelBtn({ id }: Props) {
    const router = useRouter()
    const cookie = new Cookies()

    const onClickDelBtn = async () => {
        let isSuccess = false
        try {
            const response = await axios.delete(`/server/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`,
                },
            })

            console.log(response)

            if (response.status === 200) {
                alert('글 삭제 완료')
                router.push('/')
            } else {
                alert('글 삭제 실패..')
            }

            isSuccess = true
        } catch (error: any) {
            if (error.response.status === 401) {
                await reissueAccToken()
                !isSuccess && onClickDelBtn()
            }
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
