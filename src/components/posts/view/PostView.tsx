import Image from 'next/image'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'

export default function ViewPost({ content }: any) {
    return (
        <>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // 코드 블럭 하이라이팅 하기 위한 코드
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                style={materialLight}
                                customStyle={{ borderRadius: '10px', margin: '10px' }}
                                language={match[1]}
                                PreTag="div">
                                {className + '\n\n' + String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        )
                    },

                    img({ node, ...props }) {
                        // 이미지 크기 조절
                        return (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: '60%', display: 'block' }}>
                                    <Image
                                        src={
                                            props.src?.replace('../../../../public/', '/') === undefined
                                                ? ''
                                                : props.src.replace('../../../../public/', '/')
                                        }
                                        layout="responsive" // 부모 요소의 가로 너비 100%를 차지하도록 이미지가 렌더링 렌더링될 때 항상 이미지의 비율이 일정하게 유지
                                        width={150}
                                        height={150}
                                        alt="MarkdownRenderer__Image"></Image>
                                </div>
                            </div>
                        )
                    },

                    p: ({ node, ...props }) => {
                        // <img />를 렌더링 하는 경우에 <p>내부에서 렌더링 되지 않도록 하기 위함
                        if (typeof props.children[0] === 'object') {
                            const element: any = props.children[0]
                            return element.type.name === 'img' ? { ...element } : <p {...props} />
                        }
                        return <p {...props} className="whitespace-pre-line" />
                    },
                }}>
                {content}
            </ReactMarkdown>
        </>
    )
}
