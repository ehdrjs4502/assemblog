import SingleComment from './SingleComment'

export default function ReplyComment({
    commentList,
    postId,
    setCommentList,
    isWriter,
    userInfo,
    parentCommentId,
}: any) {

    // 부모 id 찾아서 맞는 애들만 가져오기
    const replyCommentList: any = commentList.filter((comment: any) => comment.parentCommentId === parentCommentId)
    console.log("대댓글 : ", replyCommentList)
    return (
        <>
            {replyCommentList.map(({ id, nickname, content, createdAt, depth, likeState, parentCommentId }: any) => (
                <div key={id} style={{marginLeft:'45px'}}>
                    <SingleComment
                        comment={{ id, nickname, content, createdAt, depth, likeState, parentCommentId }}
                        postId={postId}
                        setCommentList={setCommentList}
                        isWriter={isWriter}
                        userInfo={userInfo}
                    />
                    <ReplyComment
                        commentList={commentList}
                        postId={postId}
                        setCommentList={setCommentList}
                        isWriter={isWriter}
                        userInfo={userInfo}
                        parentCommentId={id}
                    />
                </div>
            ))}
        </>
    )
}
