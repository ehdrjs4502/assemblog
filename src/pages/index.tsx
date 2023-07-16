import HeadTitle from '@/components/HeadTitle'
import Introduction from '@/components/Introduction'
import Navigation from '@/components/Navigation'
import Content from '@/components/Content'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ReactDragList from 'react-drag-list'

export default function Home({ postList }: any) {
    const title = 'Main'
    const contentRef = useRef(null)
    const contentTitle = '최신글'
    console.log(postList)
    const [itemList, setItemList] = useState<any>()

    useEffect(() => {
        const list = [
            {
                name: '테스트1',
            },
            {
                name: '테스트2',
            },
            {
                name: '테스트3',
            },
            {
                name: '테스트4',
            },
        ]
        setItemList(list)
    }, [])

    const dragList = (record: any, index: any) => (
        <div key={index}>
            <h3>{record.name}</h3>
        </div>
    )

    const handleUpdate = (evt: any, updated: any) => {
        // console.log(evt); // tslint:disable-line
        // console.log(updated); // tslint:disable-line
        setItemList([...updated])
    }

    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <Introduction />
            <div ref={contentRef}>
                <Content postList={postList} contentTitle={contentTitle} />
            </div>
            
            {itemList && itemList.length > 0 && ( // itemList이 존재하고 길이가 0보다 큰 경우에만 ReactDragList 렌더링
                <ReactDragList
                    dataSource={itemList}
                    rowKey="name"
                    row={dragList}
                    handles={false}
                    className="simple-drag"
                    rowClassName="simple-drag-row"
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    )
}

// 게시글 목록 ssg 방식으로 가져오기
export async function getStaticProps() {
    const API_URL = process.env.API
    const res: any = await axios.get(`${API_URL}lists/posts`, {
        headers: {
            'ngrok-skip-browser-warning': '1234',
        },
    })

    const postList = res.data.postList || null

    return {
        props: { postList },
        revalidate: 120,
    }
}
