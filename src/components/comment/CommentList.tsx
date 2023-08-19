import ReplyComment from './ReplyComment'
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
    isPostComment: boolean
}

export default function CommentList({ commentList, postId, setCommentList, isWriter, isPostComment }: Props) {

    // 부모id가 0인 댓글들 즉 답글이 아닌 것들만 가져오기
    const singleCommentList = commentList?.filter((comment) => comment.parentCommentId === 0)
    return (
        <>
            <h4>{isPostComment ? '달린 댓글' : '달린 방명록'}</h4>
            {singleCommentList?.map(
                ({ id, nickname, content, createdAt, likeState, parentCommentId, deleted, writer }) => (
                    <div key={id}>
                        <Comment
                            comment={{ id, nickname, content, createdAt, likeState, parentCommentId, deleted, writer }}
                            postId={postId!}
                            setCommentList={setCommentList}
                            isWriter={isWriter!}
                            isPostComment={isPostComment}
                        />
                        <ReplyComment
                            commentList={commentList}
                            postId={postId!}
                            setCommentList={setCommentList}
                            isWriter={isWriter!}
                            parentCommentId={id}
                            isPostComment={isPostComment}
                        />
                        <hr />
                    </div>
                )
            )}

            <style jsx>
                {`
                    .date {
                        font-size: 12px;
                    }

                    hr {
                        border-top: dotted 1.5px rgba(212, 212, 212, 0.3);
                    }
                `}
            </style>
        </>
    )
}
