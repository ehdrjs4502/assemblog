import { IconButton, Tooltip } from '@mui/material'
import { Delete } from '@mui/icons-material'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { getComment } from '@/function/getComment'
import reissueAccToken from '@/function/reissueAccToken'
import { getGuestBook } from '@/function/getGuestBook'

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
    isPostComment: boolean
}

export default function DelBtn({ postId, commentId, setCommentList, isPostComment }: Props) {
    const cookie = new Cookies()
    //글 작성자가 댓글 삭제할 때
    const onClickDelBtn = async (commentId: number) => {
        const endpoint = isPostComment ? 'comments' : 'guestbooks' // 엔드 포인트 설정
        let isSuccess = false
        try {
            const response = await axios.delete(`/server/${endpoint}?id=${commentId}&password=0`, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`,
                },
            })


            //성공하면
            if (isPostComment) {
                const comments = await getComment(postId as number)
                setCommentList!(comments)
            } else {
                const comments = await getGuestBook()
                setCommentList!(comments)
            }

            isSuccess = true
        } catch (error: any) {
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
