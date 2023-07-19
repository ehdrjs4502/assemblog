import HeadTitle from '@/components/HeadTitle'
import Navigation from '@/components/Navigation'
import { useRef } from 'react'
import axios from 'axios'
import TagList from '@/components/tag/TagList'

type tag = {
    id: number,
    name: string
}

interface Props { 
    tagList: [tag]
}


export default function Tag({ tagList }: Props) {
    const title = '태그 목록'
    const contentRef = useRef(null)
    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <div>
                <h1>태그 목록</h1>
            </div>
            <div ref={contentRef}>
                <TagList tagList= {tagList}/>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const API_URL = process.env.API
    const res: any = await axios.get(`${API_URL}lists/tags`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    const tagList = res.data

    // console.log(res.data)

    // const tagList = {tags : [
    //     "태그",
    //     "뿅",
    //     "자바",
    //     "자바스크립트",
    //     "클라우드",
    //     "Next.js",
    //     "React.js"
    // ]}

    return {
        props: { tagList },
        revalidate: 120,
    }
}
