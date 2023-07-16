import ReplyComment from './ReplyComment'
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
}

export default function CommentList({ commentList, postId, setCommentList, isWriter }: Props) {
    console.log(commentList)

    // 부모id가 0인 댓글들 즉 답글이 아닌 것들만 가져오기
    const singleCommentList = commentList?.filter((comment) => comment.parentCommentId === 0) 
    return (
        <>
            <h4>달린 댓글</h4>
            {singleCommentList?.map(({ id, nickname, content, createdAt, depth, likeState, parentCommentId, deleted }) => (
                <div key={id}>
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
                    <hr />
                </div>
            ))}

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
