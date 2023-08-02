import EditComment from './EditComment'
import CommentList from './CommentList'
import { useEffect, useState } from 'react'
import { getComment } from '@/function/getComment'
import { getGuestBook } from '@/function/getGuestBook'

interface Props {
    postId?: number
    isWriter?: boolean
    isPostComment: boolean
}

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

export default function CommentView({ postId, isWriter, isPostComment }: Props) {
    const [commentList, setCommentList] = useState<comment[]>([]) // 댓글 목록

    useEffect(() => {
        //     console.log('isPostComment : ', isPostComment)

        //     if (isPostComment) {
        //         // 댓글 가져오기
        //         const fetchComments = async () => {
        //             const comments = await getComment(postId!)
        //             setCommentList(comments)
        //         }

        //         fetchComments()
        //     } else {
        //         // 방명록 가져오기
        //         const fetchComments = async () => {
        //             const comments = await getGuestBook()
        //             setCommentList(comments)
        //         }

        //         fetchComments()
        //     }

        const testCommentList: comment[] = [
            {
                id: 1,
                nickname: '개똥',
                content: '잘 보고 갑니다~',
                parentCommentId: 0,
                createdAt: '2023-07-2',
                likeState: false,
                deleted: false,
                writer: false,
            },

            {
                id: 2,
                nickname: '길동',
                content: '좋아용',
                parentCommentId: 0,
                createdAt: '2023-07-2',
                likeState: true,
                deleted: false,
                writer: true,
            },
        ]

        setCommentList(testCommentList)
    }, [])

    return (
        <>
            <EditComment
                postId={postId}
                setCommentList={setCommentList}
                isWriter={isWriter}
                isPostComment={isPostComment}
            />
            <CommentList
                commentList={commentList}
                postId={postId}
                setCommentList={setCommentList}
                isWriter={isWriter}
                isPostComment={isPostComment}
            />
        </>
    )
}
