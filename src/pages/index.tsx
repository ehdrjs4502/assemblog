import HeadTitle from '@/components/HeadTitle'
import Introduction from '@/components/Introduction'
import Navigation from '@/components/Navigation'
import Content from '@/components/Content'
import { useRef } from 'react'

export default function Home() {
    const title = 'Main'
    const contentRef = useRef(null)
    return (
        <div>
            <HeadTitle title={title} />
            <Navigation contentRef={contentRef} />
            <Introduction />
            <div ref={contentRef}>
                <Content />
            </div>
        </div>
    )
}
