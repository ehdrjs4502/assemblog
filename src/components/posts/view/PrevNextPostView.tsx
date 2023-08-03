import NextPost from './NextPost'
import PrevPost from './PrevPost'

export default function PrevNextPostView() {
    //이전글, 다음글에 맞는 postId, title, thumbnail 보내주기
    return (
        <>
            <div className="box">
                <PrevPost />
                <NextPost />
            </div>

            <style jsx>{`
                .box {
                    margin-top: 30px;
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    color: white;
                }
            `}</style>
        </>
    )
}
