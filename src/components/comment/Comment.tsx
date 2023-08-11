import { Box, Chip, IconButton, Tooltip } from '@mui/material'
import { Person, Favorite, FavoriteBorder, Delete } from '@mui/icons-material'
import DelCommentModal from './modals/DelCommentModal'
import EditReplyModal from './modals/EditReplyModal'
import DelBtn from './buttons/DelBtn'
import LikeBtn from './buttons/LikeBtn'
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
    comment: comment
    postId?: number
    setCommentList: (comment: comment[]) => void
    isWriter?: boolean
    isPostComment: boolean
}

export default function Comment({ comment, postId, setCommentList, isWriter, isPostComment }: Props) {
    const cookie = new Cookies()
    const boxStyle = {
        backgroundColor: 'lightpink',
        width: 'fit-content',
        marginBottom: '30px',
        marginTop: '30px',
        padding: '20px 20px 5px 20px',
        borderRadius: 4,
        maxWidth: '380px',
        paddingBottom: '15px',
        '@media (max-width:950px)': {
            minWidth: '150px',
            maxWidth: '280px',
        },
    }

    const writerBoxStyle = {
        backgroundColor: 'lightblue',
        width: 'fit-content',
        marginBottom: '30px',
        marginTop: '30px',
        padding: '20px 20px 5px 20px',
        borderRadius: 4,
        maxWidth: '380px',
        paddingBottom: '15px',
        '@media (max-width:950px)': {
            minWidth: '150px',
            maxWidth: '280px',
        },
    }

    return (
        <>
            <div style={comment.writer ? { display: 'flex', justifyContent: 'end' } : undefined}>
                <Box sx={comment.writer ? writerBoxStyle : boxStyle}>
                    <Chip
                        icon={<Person color="primary" />}
                        label={comment.nickname}
                        sx={{
                            borderRadius: 2,
                            backgroundColor: comment.writer ? 'rgb(0,50,200)' : 'tomato',
                            color: 'white',
                        }}
                    />
                    <p style={{ wordBreak: 'break-word', fontSize: '16px', }}>
                        {comment.deleted ? '삭제된 댓글입니다.' : `${comment.content}`}
                    </p>
                    <span className="date">{comment.createdAt}</span>

                    {isPostComment ? (
                        !comment.writer && !isWriter ? (
                            // 일반 유저일때 댓글 삭제
                            <DelCommentModal
                                id={comment.id}
                                postId={postId}
                                setCommentList={setCommentList}
                                isPostComment={isPostComment}
                            />
                        ) : isWriter && !comment.writer ? (
                            // 글 작성자이면서 일반 유저 댓글 삭제
                            <DelBtn
                                postId={postId}
                                commentId={comment.id}
                                setCommentList={setCommentList}
                                isPostComment={isPostComment}
                            />
                        ) : (
                            isWriter &&
                            comment.writer && (
                                // 글 작성자이면서 자신의 댓글 삭제
                                <DelBtn
                                    postId={postId}
                                    commentId={comment.id}
                                    setCommentList={setCommentList}
                                    isPostComment={isPostComment}
                                />
                            )
                        )
                    ) : !comment.writer && !cookie.get('email') ? (
                        // 일반 유저일때 방명록 삭제
                        <DelCommentModal
                            id={comment.id}
                            postId={postId}
                            setCommentList={setCommentList}
                            isPostComment={isPostComment}
                        />
                    ) : !comment.writer && cookie.get('email') ? (
                        // 관리자면서 일반 유저 방명록 삭제
                        <DelBtn
                            postId={postId}
                            commentId={comment.id}
                            setCommentList={setCommentList}
                            isPostComment={isPostComment}
                        />
                    ) : (
                        comment.writer &&
                        cookie.get('email') && (
                            // 관리자면서 관리자 방명록 삭제
                            <DelBtn
                                postId={postId}
                                commentId={comment.id}
                                setCommentList={setCommentList}
                                isPostComment={isPostComment}
                            />
                        )
                    )}

                    {comment.parentCommentId === 0 && (
                        // 대댓글 작성
                        <EditReplyModal
                            postId={postId}
                            parentId={comment.id}
                            setCommentList={setCommentList}
                            isPostComment={isPostComment}
                            isWriter={isWriter}
                        />
                    )}

                    {isWriter && !comment.writer ? (
                        // 글 작성자 전용 좋아요 버튼
                        <LikeBtn
                            postId={postId}
                            commentId={comment.id}
                            likeState={comment.likeState}
                            setCommentList={setCommentList}
                        />
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
            </div>
        </>
    )
}
