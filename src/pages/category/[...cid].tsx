import Navigation from "@/components/Navigation"
import { useRouter } from "next/router"

export default function Category() {
    const router = useRouter();
    console.log(router.query);
    return (
        <>
            <Navigation contentRef={''}/>
            <h4>카테고리에 해당하는 포스트 보여줄 예정</h4>
        </>
    )
}