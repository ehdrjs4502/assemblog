import { Box, Chip } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import DelCommentModal from './modals/DelCommentModal'
import EditReplyModal from './modals/EditReplyModal'

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
    commentList: comment[]
    postId: number
    setCommentList: (comment: comment[]) => void
}

export default function CommentList({ commentList, postId, setCommentList }: Props) {
    return (
        <>
            <h4>달린 댓글</h4>
            {commentList.map((comment) => (
                <div key={comment.id}>
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
                            icon={<PersonIcon color="primary" />}
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
                    </Box>
                    <hr />
                </div>
            ))}

            <style jsx>
                {`
                    .date {
                        font-size: 12px;
                    }

                    hr {
                        border-top: dashed 1.5px rgb(163, 163, 163);
                    }
                `}
            </style>
        </>
    )
}
