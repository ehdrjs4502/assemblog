import { useEffect, useState } from 'react'
import NextPostBtn from '../buttons/NextPostBtn'
import PrevPostBtn from '../buttons/PrevPostBtn'
import axios from 'axios'

interface Props {
    title: string
    postId: number
}

export default function PrevNextPostView({ title, postId }: Props) {
    const [postList, setPostList] = useState([])
    const [prevPost, setPrevPost] = useState<any | null>()
    const [nextPost, setNextPost] = useState<any | null>()

    const getPostList = async () => {
        try {
            const response = await axios.get(`/server/lists/posts?boardTitle=${title}`, {
                headers: {
                    'ngrok-skip-browser-warning': '123',
                },
            })
            setPostList(response.data.postList)
        } catch (error) {
            console.log(error)
        }
    }

    // 주어진 postId를 기준으로 자기 자신을 제외하고 위 아래의 게시물들을 찾는 함수
    const findPrevNextPost = (postIdToFind: number) => {
        const index = postList.findIndex((post: any) => post.postId === postIdToFind)

        // 인덱스가 -1이라면 해당 postId를 가진 게시물이 배열에 존재하지 않습니다.
        if (index === -1) {
            return []
        }

        // 인덱스를 기준으로 위에 있는 게시물과 아래에 있는 게시물을 찾습니다.
        const next = index > 0 ? postList[index - 1] : null
        const prev = index < postList.length - 1 ? postList[index + 1] : null

        return [next, prev]
    }

    useEffect(() => {
        getPostList()
    }, [])

    useEffect(() => {
        if (postList.length > 0) {
            const [next, prev]: any = findPrevNextPost(postId)
            setNextPost(next)
            setPrevPost(prev)
        }
    }, [postId, postList])

    //이전글, 다음글에 맞는 postId, title, thumbnail 보내주기
    return (
        <>
            <div className="box">
                <PrevPostBtn prevPost={prevPost} />
                <NextPostBtn nextPost={nextPost} />
            </div>

            <style jsx>{`
                .box {
                    margin-top: 30px;
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                }
            `}</style>
        </>
    )
}
