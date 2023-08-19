import { IconButton, Tooltip } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import axios from 'axios'
import reissueAccToken from '@/function/reissueAccToken'
import { getComment } from '@/function/getComment'
import { Cookies } from 'react-cookie'

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
    likeState: boolean
    setCommentList: (comment: comment[]) => void
}

export default function LikeBtn({ postId, commentId, likeState, setCommentList }: Props) {
    const cookie = new Cookies()

    //글 작성자가 댓글 좋아요 누를 때
    const onClickLikeBtn = async (commentId: number) => {
        let isSuccess = false
        try {
            const response = await axios.patch(`/server/api/comments/likes/${commentId}`, null, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`,
                },
            })
            const comments = await getComment(postId!)
            setCommentList(comments)
            isSuccess = true
        } catch (error: any) {
            if (error.response.status === 401) {
                await reissueAccToken()
                !isSuccess && onClickLikeBtn(commentId)
            }
        }
    }

    return (
        <Tooltip title="좋아요" disableInteractive placement="top" arrow>
            <IconButton onClick={() => onClickLikeBtn(commentId)} sx={{ color: 'red' }}>
                {likeState ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
        </Tooltip>
    )
}
