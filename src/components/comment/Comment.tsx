import { Box, Chip, IconButton, Tooltip } from '@mui/material'
import { Person, Favorite, FavoriteBorder } from '@mui/icons-material'
import DelCommentModal from './modals/DelCommentModal'
import EditReplyModal from './modals/EditReplyModal'
import axios from 'axios'
import { getComment } from '@/function/getComment'
import { Cookies } from 'react-cookie'
import reissueAccToken from '@/function/reissueAccToken'

type comment = {
    id: number
    nickname: string
    content: string
    createdAt: string
    depth: number
    likeState: boolean
    parentCommentId: number
}

interface Props {
    comment: comment
    postId: number
    setCommentList: (comment: comment[]) => void
    isWriter: boolean
}

export default function Comment({ comment, postId, setCommentList, isWriter }: Props) {
    const cookie = new Cookies()

    const onClickLikeBtn = async (commentId: number) => {
        let isSuccess = false
        try {
            const response = await axios.patch(`/server/api/comments/likes/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`,
                },
            })

            console.log(response)
            const comments = await getComment(postId)
            setCommentList(comments)
            isSuccess = true
        } catch (error: any) {
            await reissueAccToken()
            !isSuccess && onClickLikeBtn(commentId)
        }
    }

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'lightpink',
                    width: 'fit-content',
                    marginBottom: '30px',
                    marginTop: '30px',
                    padding: '20px 20px 5px 20px',
                    borderRadius: 4,
                }}>
                <Chip
                    icon={<Person color="primary" />}
                    label={comment.nickname}
                    sx={{ borderRadius: 2, backgroundColor: 'tomato', color: 'white' }}
                />
                <p style={{ wordBreak: 'break-all' }}>{comment.content}</p>
                <span className="date">{comment.createdAt}</span>
                <DelCommentModal id={comment.id} postId={postId} setCommentList={setCommentList} />
                <EditReplyModal
                    postId={postId}
                    parentId={comment.id}
                    depth={comment.depth}
                    setCommentList={setCommentList}
                />
                {isWriter ? (
                    <Tooltip title="좋아요" disableInteractive placement="top" arrow>
                        <IconButton onClick={() => onClickLikeBtn(comment.id)} sx={{ color: 'red' }}>
                            {comment.likeState ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                    </Tooltip>
                ) : (
                    comment.likeState && (
                        <Tooltip title="글쓴이가 해당 댓글을 좋아합니다." disableInteractive placement="top" arrow>
                            <IconButton sx={{ color: 'red' }}>
                                <Favorite />
                            </IconButton>
                        </Tooltip>
                    )
                )}
            </Box>
        </>
    )
}
