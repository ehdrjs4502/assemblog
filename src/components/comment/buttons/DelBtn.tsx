import { IconButton, Tooltip } from '@mui/material'
import { Delete } from '@mui/icons-material'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { getComment } from '@/function/getComment'
import reissueAccToken from '@/function/reissueAccToken'

type comment = {
    id: number
    nickname: string
    content: string
    createdAt: string
    deleted: boolean
    likeState: boolean
    parentCommentId: number
    writer: boolean
}


interface Props {
    postId?: number
    commentId: number
    setCommentList: (comment: comment[]) => void
}

export default function DelBtn({ postId, commentId, setCommentList }: Props) {
    const cookie = new Cookies()
    //글 작성자가 댓글 삭제할 때
    const onClickDelBtn = async (commentId: number) => {
        let isSuccess = false
        try {
            const response = await axios.delete(`/server/comments?id=${commentId}&password=0`, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`,
                },
            })

            console.log(response)
            const comments = await getComment(postId!)
            setCommentList(comments)
            isSuccess = true
        } catch (error: any) {
            console.log(error)
            if (error.response.status === 401) {
                await reissueAccToken()
                !isSuccess && onClickDelBtn(commentId)
            }
        }
    }

    return (
        <Tooltip title="댓글 삭제" disableInteractive placement="top" arrow>
            <IconButton
                onClick={() => {
                    if (confirm('정말로 삭제하시겠습니까?') == true) {
                        onClickDelBtn(commentId)
                    }
                }}
                sx={{ color: 'red' }}>
                <Delete />
            </IconButton>
        </Tooltip>
    )
}
