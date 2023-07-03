import Navigation from '@/components/Navigation'
import HeadTitle from '@/components/HeadTitle'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'

const NoSsrWysiwyg = dynamic(() => import('../../components/posts/EditPost'), { ssr: false })

export default function newPost() {
    

    return (
        <>
            <HeadTitle title="Create Post" />
            <Navigation contentRef={''} />
            <NoSsrWysiwyg></NoSsrWysiwyg>
        </>
    )
}
