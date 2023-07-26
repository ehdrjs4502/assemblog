import Comment from './Comment'

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
    commentList: comment[]
    postId?: number
    setCommentList: (comment: comment[]) => void
    isWriter?: boolean
    parentCommentId: number
    writerMail?: string
    isPostComment: boolean
}

export default function ReplyComment({
    commentList,
    postId,
    setCommentList,
    isWriter,
    parentCommentId,
    writerMail,
    isPostComment,
}: Props) {
    // 부모 id 찾아서 맞는 애들만 가져오기
    const replyCommentList: comment[] = commentList?.filter(
        (comment: any) => comment.parentCommentId === parentCommentId
    )
    return (
        <>
            {replyCommentList?.map(
                ({ id, nickname, content, createdAt, likeState, parentCommentId, deleted, writer }: comment) => (
                    <div key={id} style={{ marginLeft: '45px' }}>
                        <Comment
                            comment={{ id, nickname, content, createdAt, likeState, parentCommentId, deleted, writer }}
                            postId={postId}
                            setCommentList={setCommentList}
                            isWriter={isWriter}
                            isPostComment={isPostComment}
                        />
                    </div>
                )
            )}
        </>
    )
}
