import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'

export default function ViewPost({ content }: any) {
    return (
        <>
            <div className="box">
                <div className="content-box">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        children={content} // 보여줄 내용
                        components={{
                            // 코드 블럭 하이라이팅 하기 위한 코드
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        {...props}
                                        children={className+'\n\n'+String(children).replace(/\n$/, '')}
                                        style={materialLight}
                                        customStyle={{borderRadius:'10px', margin:'10px',}}
                                        language={match[1]}
                                        PreTag="div"
                                    />
                                ) : (
                                    <code {...props} className={className}>
                                        {children}
                                    </code>
                                )
                            },
                            img({ node, ...props }) {
                                // 이미지 크기 조절
                                return (
                                    <img
                                        style={{
                                            maxWidth: '100%',
                                            margin:'auto',
                                            display:'block',
                                        }}
                                        src={props.src?.replace('../../../../public/', '/')}
                                        alt="MarkdownRenderer__Image"
                                    />
                                )
                            },
                        }}
                    />
                </div>
            </div>

            <style jsx>
                {`
                    .box {
                        width: 100%;
                        /* 자식 요소(.child)를 중앙 정렬하기 */
                        display: flex;
                        justify-content: center;
                    }

                    .content-box {
                        width: 60%;
                        {/* background-color: red; */}
                    }
                `}
            </style>
        </>
    )
}
