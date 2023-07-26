import GusetBookHeader from '@/components/GuestBookHeader'
import HeadTitle from '@/components/HeadTitle'
import Navigation from '@/components/Navigation'
import CommentList from '@/components/comment/CommentList'
import CommentView from '@/components/comment/CommentView'
import EditComment from '@/components/comment/EditComment'
import { useRef } from 'react'

export default function GuestBook() {
    const title = 'Main'
    const contentRef = useRef(null)
    const contentTitle = '최신 글'

    return (
        <>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <GusetBookHeader/>
            <div className="container">
                <div className="guestbook-box" ref={contentRef}>
                    <div className="guestbook-title">
                        <span>방명록</span>
                    </div>
                    <CommentView isPostComment={false} />
                </div>
            </div>
            <style jsx>{`
                .container {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
                .guestbook-box {
                    margin-top: 50px;
                    margin-bottom: 50px;
                    width: 60%;
                    flex-wrap: wrap;
                }

                .guestbook-title {
                    font-weight: bold;
                    font-size: 38px;
                    display: flex;
                    justify-content: center;
                }
            `}</style>
        </>
    )
}
