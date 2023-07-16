import Comment from './Comment'

type comment = {
    id: number
    nickname: string
    content: string
    createdAt: string
    depth: number
    deleted: boolean
    likeState: boolean
    parentCommentId: number
}

interface Props {
    commentList: comment[]
    postId: number
    setCommentList: (comment: comment[]) => void
    isWriter: boolean
    parentCommentId: number
}
export default function ReplyComment({ commentList, postId, setCommentList, isWriter, parentCommentId }: Props) {
    // 부모 id 찾아서 맞는 애들만 가져오기
    const replyCommentList: comment[] = commentList?.filter(
        (comment: any) => comment.parentCommentId === parentCommentId
    )
    console.log('대댓글 : ', replyCommentList)
    return (
        <>
            {replyCommentList?.map(
                ({ id, nickname, content, createdAt, depth, likeState, parentCommentId, deleted }: comment) => (
                    <div key={id} style={{ marginLeft: '45px' }}>
                        <Comment
                            comment={{ id, nickname, content, createdAt, depth, likeState, parentCommentId, deleted }}
                            postId={postId}
                            setCommentList={setCommentList}
                            isWriter={isWriter}
                        />
                        <ReplyComment
                            commentList={commentList}
                            postId={postId}
                            setCommentList={setCommentList}
                            isWriter={isWriter}
                            parentCommentId={id}
                        />
                    </div>
                )
            )}
        </>
    )
}
