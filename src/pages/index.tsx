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
    username:string 
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

// 게시글 목록 ssg 방식으로 가져오기
export async function getStaticProps() {
    const API_URL = process.env.API

    //최신 게시글 목록 가져오기 (최대 6개 가져옴)
    const latestPostRes: any = await axios.get(`${API_URL}lists/posts?pageSize=6`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    //인기 게시글 목록 가져오기 (최대 3개 가져옴)
    const popularPostRes: any = await axios.get(`${API_URL}lists/posts?order=view&pageSize=3`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    //유저 소개 정보 가져오기
    const userIntroRes: any = await axios.get(`${API_URL}lists/user-introductions`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    console.log(userIntroRes)

    const latestPostList = latestPostRes.data.postList || null
    const popularPostList = popularPostRes.data.postList || null
    const userIntroList = userIntroRes.data || null

    //     const postList = [{}]

    //     const userIntroList = [
    //         {
    //             username: 'ehdrjs',
    //             email: 'ehdrjs@gmail.com',
    //             introduction: `hello 안녕하세요 글을 길게 쓰면 div 넘어갈거같은데요?
    // 하이요 글을 더 길게 쓰면 어떻게 될까요 글 엄청 길게 쓰자`,
    //             profileImageURL: 'profile.png',
    //             backgroundImageURL:
    //                 'https://cdn.discordapp.com/attachments/1136307485398007878/1136307555824582796/indo.png',
    //             links: [
    //                 {
    //                     id: 1,
    //                     linkDescription: '깃허브',
    //                     linkUrl: 'www.github.com',
    //                     linkImageUrl: 'github.png',
    //                 },
    //                 {
    //                     id: 2,
    //                     linkDescription: '인스타그램',
    //                     linkUrl: 'www.instagram.com',
    //                     linkImageUrl: 'instagram.png',
    //                 },
    //                 {
    //                     id: 3,
    //                     linkDescription: '페이스북',
    //                     linkUrl: 'www.facebook.com',
    //                     linkImageUrl: 'facebook.png',
    //                 },
    //             ],
    //         },
    //         {
    //             username: 'test',
    //             email: 'test@gmail.com',
    //             introduction: '안녕하세용',
    //             profileImageURL: 'profile.png',
    //             backgroundImageURL:
    //                 'https://cdn.discordapp.com/attachments/1136307485398007878/11363075558245896/indo.png',
    //             links: [
    //                 {
    //                     id: 1,
    //                     linkDescription: '깃허브',
    //                     linkUrl: 'www.github.com',
    //                     linkImageUrl: 'github.png',
    //                 },
    //                 {
    //                     id: 2,
    //                     linkDescription: '인스타그램',
    //                     linkUrl: 'www.instagram.com',
    //                     linkImageUrl: 'instagram.png',
    //                 },
    //                 {
    //                     id: 3,
    //                     linkDescription: '페이스북',
    //                     linkUrl: 'www.facebook.com',
    //                     linkImageUrl: 'facebook.png',
    //                 },
    //             ],
    //         },
    //     ]

    return {
        props: { latestPostList, popularPostList, userIntroList },
        revalidate: 30,
    }
}
