import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'

export default function ViewPost({ post }: any) {
    const markdown = `
## 안녕하세요
~~~js
console.log('It works!')
~~~
이렇게 코드를 작성할 수가 있다.
- qewqe

***
![](https://storage.googleapis.com/assemblog_bucket/images/default_thumbnail.png)
`
    return (
        <div>
            <div>
                <h2>{post.title}</h2>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    children={post.content} // 보여줄 내용
                    components={{
                        // 코드 블럭 하이라이팅 하기 위한 코드
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    {...props}
                                    children={String(children).replace(/\n$/, '')}
                                    style={materialLight}
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
                            return (
                                <img
                                    style={{ maxWidth: '50vw' }}
                                    src={props.src?.replace('../../../../public/', '/')}
                                    alt="MarkdownRenderer__Image"
                                />
                            )
                        },
                    }}
                />
            </div>
        </div>
    )
}
