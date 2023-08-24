import HeadTitle from '@/components/HeadTitle'
import Navigation from '@/components/navigation/Navigation'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import TagList from '@/components/tag/TagList'
import TagHeader from '@/components/tag/TagHeader'

type tag = {
    id: number
    name: string
}

interface Props {
    tagList: [tag]
}

export default function Tag({ tagList }: Props) {
    const title = '태그 목록'
    const contentRef = useRef(null)

    useEffect(() => {

    },[])

    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <TagHeader />
            <div ref={contentRef}>
                <TagList tagList={tagList} />
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const API_URL = process.env.API

    // 태그 목록 불러오기
    const res: any = await axios.get(`${API_URL}lists/tags`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    const tagList = res.data

    return {
        props: { tagList },
        revalidate: 10,
    }
}
