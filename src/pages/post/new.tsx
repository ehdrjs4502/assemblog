import Navigation from "@/components/Navigation";
import HeadTitle from "@/components/HeadTitle";

export default function newPost() {
    return (
        <>
            <HeadTitle title="Create Post" />
            <Navigation contentRef={''}/>
            <h4>새 글 작성 페이지 (마크다운 에디터 라이브러리 사용 예정)</h4>
        </>

    )
}