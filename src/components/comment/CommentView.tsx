import EditComment from './EditComment'
import CommentList from './CommentList'
import { useEffect, useState } from 'react'
import { getComment } from '@/function/getComment'

interface Props {
    postId: number
    isWriter: boolean
    writerMail: string
}

type comment = {
    id: number
    nickname: string
    content: string
    createdAt: string
    deleted: boolean
    depth: number
    likeState: boolean
    parentCommentId: number
}

export default function CommentView({ postId, isWriter, writerMail }: Props) {
    const [commentList, setCommentList] = useState<comment[]>([]) // 댓글 목록

    useEffect(() => {
        // 댓글 가져오기
        const fetchComments = async () => {
            const comments = await getComment(postId)
            setCommentList(comments)
        }
        fetchComments()

        // const testCommentList: comment[] = [
        //     {
        //         id: 0,
        //         nickname: '개똥',
        //         content: '잘 보고 갑니다~',
        //         parentCommentId: 0,
        //         depth: 0,
        //         createdAt: '2023-07-2',
        //         likeState: false,
        //     },

        //     {
        //         id: 1,
        //         nickname: '길동',
        //         content: '좋아용',
        //         parentCommentId: 0,
        //         depth: 0,
        //         createdAt: '2023-07-2',
        //         likeState: true,
        //     },
        // ]

        // setCommentList(testCommentList)
    }, [])

    return (
        <>
            <EditComment postId={postId} setCommentList={setCommentList} isWriter={isWriter} />
            <CommentList
                commentList={commentList}
                postId={postId}
                setCommentList={setCommentList}
                isWriter={isWriter}
                writerMail={writerMail}
            />
        </>
    )
}
