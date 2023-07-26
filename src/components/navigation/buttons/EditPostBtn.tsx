import { IconButton, Tooltip } from '@mui/material'
import { PostAdd } from '@mui/icons-material'
import { useRouter } from 'next/router'

export default function EditPostBtn() {
    const router = useRouter()

    return (
        <Tooltip title="글 작성" disableInteractive placement="bottom" arrow>
            <IconButton color="primary" onClick={() => router.push('/post/edit')}>
                <PostAdd />
            </IconButton>
        </Tooltip>
    )
}
