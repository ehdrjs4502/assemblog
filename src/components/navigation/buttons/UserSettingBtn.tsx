import { IconButton, Tooltip } from '@mui/material'
import { ManageAccounts } from '@mui/icons-material'
import { useRouter } from 'next/router'

export default function UserSettingBtn() {
    const router = useRouter()

    return (
        <Tooltip title="유저 수정" disableInteractive placement="bottom" arrow>
            <IconButton color="primary" onClick={() => router.push('/userinfo')}>
                <ManageAccounts />
            </IconButton>
        </Tooltip>
    )
}
