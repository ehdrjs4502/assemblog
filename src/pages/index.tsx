import HeadTitle from '@/components/HeadTitle'
import UserIntroView from '@/components/user/UserIntroView'
import Navigation from '@/components/Navigation'
import Content from '@/components/Content'
import { useRef } from 'react'
import axios from 'axios'

export default function Home({ postList, usersIntro }: any) {
    const title = 'Main'
    const contentRef = useRef(null)
    const contentTitle = '최신글'

    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <UserIntroView usersIntro={usersIntro} />
            <div ref={contentRef}>
                <Content postList={postList} contentTitle={contentTitle} />
            </div>
        </div>
    )
}

// 게시글 목록 ssg 방식으로 가져오기
export async function getStaticProps() {
    const API_URL = process.env.API
    // const res: any = await axios.get(`${API_URL}lists/posts`, {
    //     headers: {
    //         'ngrok-skip-browser-warning': '1234',
    //     },
    // })

    // console.log(res)

    // const postList = res.data.postList || null

    const postList = [{}]

    const usersIntro = [
        {
            username: 'ehdrjs',
            email: 'ehdrjs@gmail.com',
            introduction: 'hello',
            profileImageURL: 'profile.png',
            links: [
                {
                    id: 1,
                    linkDescription: '깃허브',
                    linkUrl: 'www.github.com',
                    linkImageUrl: 'github.png',
                },
                {
                    id: 2,
                    linkDescription: '인스타그램',
                    linkUrl: 'www.instagram.com',
                    linkImageUrl: 'instagram.png',
                },
                {
                    id: 3,
                    linkDescription: '페이스북',
                    linkUrl: 'www.facebook.com',
                    linkImageUrl: 'facebook.png',
                },
            ],
        },
    ]

    return {
        props: { postList, usersIntro },
        revalidate: 120,
    }
}
