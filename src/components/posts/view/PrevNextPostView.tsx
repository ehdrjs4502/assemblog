import NextPostBtn from '../buttons/NextPostBtn'
import PrevPostBtn from '../buttons/PrevPostBtn'

export default function PrevNextPostView() {
    //이전글, 다음글에 맞는 postId, title, thumbnail 보내주기
    return (
        <>
            <div className="box">
                <PrevPostBtn />
                <NextPostBtn />
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
