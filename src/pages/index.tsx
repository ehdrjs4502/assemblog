import HeadTitle from '@/components/HeadTitle'
import UserIntroView from '@/components/user/UserIntroView'
import Navigation from '@/components/navigation/Navigation'
import ContentView from '@/components/content/ContentView'
import { useRef } from 'react'
import axios from 'axios'
import ShowMoreBtn from '@/components/ShowMoreBtn'

type post = {
    postId: number
    title: string
    thumbnail: string
    categoryTitle: string
    boardTitle: string
    preview: string
    username: string
    commentCount: number
    createdAt: Date
    updatedAt: Date
    likeCount: number
    viewCount: number
    profileImage: string
}

type link = {
    id: number
    userId: number
    linkDescription: string
    linkImageURL: string
    linkURL: string
}

type userIntro = {
    username: string
    email: string
    links: [link]
    backgroundImageURL: string
    introduction: string
    profileImageURL: string
}

interface Props {
    latestPostList: post[]
    popularPostList: post[]
    userIntroList: userIntro[]
}

export default function Home({ latestPostList, popularPostList, userIntroList }: Props) {
    const title = 'Main'
    const contentRef = useRef(null)
    const latestTitle = '최신 글'
    const latestLabel = '최근에 올라온 게시글들을 확인해보세요!'
    const popularTitle = '인기 글'
    const popularLabel = '가장 인기 있는 게시글들을 확인해보세요!'

    console.log('최신글 목록 : ', latestPostList)

    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <UserIntroView userIntroList={userIntroList} />
            <div ref={contentRef}>
                <ContentView postList={latestPostList} contentTitle={latestTitle} contentLabel={latestLabel} />
                <ContentView postList={popularPostList} contentTitle={popularTitle} contentLabel={popularLabel} />
                {latestPostList?.length > 0 && <ShowMoreBtn />}
            </div>
        </div>
    )
}

// ssg 방식
// export async function getStaticProps() {
//     const API_URL = process.env.API

//     // //최신 게시글 목록 가져오기 (최대 6개 가져옴)
//     const latestPostRes: any = await axios.get(`${API_URL}lists/posts?pageSize=6`)

//     console.log('데이터 바뀜', latestPostRes)

//     //인기 게시글 목록 가져오기 (최대 3개 가져옴)
//     const popularPostRes: any = await axios.get(`${API_URL}lists/posts?order=view&pageSize=3`)

//     //유저 소개 정보 가져오기
//     const userIntroRes: any = await axios.get(`${API_URL}lists/user-introductions`)

//     const latestPostList = latestPostRes.data.postList || null
//     const popularPostList = popularPostRes.data.postList || null
//     const userIntroList = userIntroRes.data || null

//     return {
//         props: { latestPostList, popularPostList, userIntroList },
//         revalidate: 10,
//     }
// }

// ssr 방식
export const getServerSideProps = async () => {
    const API_URL = process.env.API

    // //최신 게시글 목록 가져오기 (최대 6개 가져옴)
    const latestPostRes: any = await axios.get(`${API_URL}lists/posts?pageSize=6`)

    console.log('데이터 바뀜', latestPostRes)

    //인기 게시글 목록 가져오기 (최대 3개 가져옴)
    const popularPostRes: any = await axios.get(`${API_URL}lists/posts?order=view&pageSize=3`)

    //유저 소개 정보 가져오기
    const userIntroRes: any = await axios.get(`${API_URL}lists/user-introductions`)

    const latestPostList = latestPostRes.data.postList || null
    const popularPostList = popularPostRes.data.postList || null
    const userIntroList = userIntroRes.data || null

    return {
        props: { latestPostList, popularPostList, userIntroList }
    }
}
