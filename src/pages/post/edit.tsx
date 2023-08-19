import Navigation from '@/components/navigation/Navigation'
import HeadTitle from '@/components/HeadTitle'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

//ssr 방식 작동 안돼서 csr 방식으로 사용
const EditPost = dynamic(() => import('../../components/posts/edit/EditPost'), { ssr: false })

export default function Edit() {
    const router = useRouter()

    return (
        <>
            <HeadTitle title="Edit Post" />
            <Navigation contentRef={''} />
            <EditPost />
        </>
    )
}
