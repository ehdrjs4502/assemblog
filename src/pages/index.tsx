import HeadTitle from '@/components/HeadTitle'
import UserIntroView from '@/components/user/UserIntroView'
import Navigation from '@/components/navigation/Navigation'
import Content from '@/components/Content'
import { useRef } from 'react'
import axios from 'axios'
import ShowMoreBtn from '@/components/ShowMoreBtn'

export default function Home({ postList, userIntroList }: any) {
    const title = 'Main'
    const contentRef = useRef(null)
    const contentTitle = '최신 글'

    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <UserIntroView userIntroList={userIntroList} />
            <div ref={contentRef}>
                <Content postList={postList} contentTitle={contentTitle} />
                {postList.length >= 1 && <ShowMoreBtn />}
            </div>
        </div>
    )
}

// 게시글 목록 ssg 방식으로 가져오기
export async function getStaticProps() {
    const API_URL = process.env.API
    const postRes: any = await axios.get(`${API_URL}lists/posts`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    const userIntroRes: any = await axios.get(`${API_URL}lists/user-introductions`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    // console.log(userIntroRes)

    const postList = postRes.data.postList || null
    const userIntroList = userIntroRes.data || null

    // const postList = [{}]

    // const userIntroList = [
    //     {
    //         username: 'ehdrjs',
    //         email: 'ehdrjs@gmail.com',
    //         introduction: 'hello',
    //         profileImageURL: 'profile.png',
    //         links: [
    //             {
    //                 id: 1,
    //                 linkDescription: '깃허브',
    //                 linkUrl: 'www.github.com',
    //                 linkImageUrl: 'github.png',
    //             },
    //             {
    //                 id: 2,
    //                 linkDescription: '인스타그램',
    //                 linkUrl: 'www.instagram.com',
    //                 linkImageUrl: 'instagram.png',
    //             },
    //             {
    //                 id: 3,
    //                 linkDescription: '페이스북',
    //                 linkUrl: 'www.facebook.com',
    //                 linkImageUrl: 'facebook.png',
    //             },
    //         ],
    //     },
    //     {
    //         username: 'test',
    //         email: 'test@gmail.com',
    //         introduction: '안녕하세용',
    //         profileImageURL: 'profile.png',
    //         backgroundImageURL: 'bgImg.png',
    //         links: [
    //             {
    //                 id: 1,
    //                 linkDescription: '깃허브',
    //                 linkUrl: 'www.github.com',
    //                 linkImageUrl: 'github.png',
    //             },
    //             {
    //                 id: 2,
    //                 linkDescription: '인스타그램',
    //                 linkUrl: 'www.instagram.com',
    //                 linkImageUrl: 'instagram.png',
    //             },
    //             {
    //                 id: 3,
    //                 linkDescription: '페이스북',
    //                 linkUrl: 'www.facebook.com',
    //                 linkImageUrl: 'facebook.png',
    //             },
    //         ],
    //     },
    // ]

    return {
        props: { postList, userIntroList },
        revalidate: 30,
    }
}
