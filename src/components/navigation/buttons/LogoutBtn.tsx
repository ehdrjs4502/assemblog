import { IconButton, Tooltip } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/router'

export default function LogoutBtn() {
    const router = useRouter()
    const cookie = new Cookies()

    //로그아웃 버튼 눌렀을 때 함수
    const onClickLogoutBtn = () => {
        cookie.remove('email')
        cookie.remove('accessToken')
        cookie.remove('refreshToken')
        router.push('/login')
    }

    return (
        <Tooltip title="로그아웃" disableInteractive placement="bottom" arrow>
            <IconButton color="primary" onClick={() => onClickLogoutBtn()}>
                <Logout />
            </IconButton>
        </Tooltip>
    )
}
