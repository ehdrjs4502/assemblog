import Tag from '@/components/tag/Tag'

export default function TagList({ tagList }: any) {
    return (
        <>
            <div className='container'>
                <div className="tag-box">
                    {tagList.tags.map((tag: string, idx: number) => (
                        <Tag key={idx} tag={tag} />
                    ))}
                </div>
            </div>

            <style jsx>
                {`
                    .container {
                        display: flex;
                        justify-content: center;
                    }
                    .tag-box {
                        display: grid;
                        grid-template-columns: repeat(6, 1fr);
                        grid-gap: 10px;
                        width: 80%;
                    }

                    @media (max-width: 1080px) {
                        .tag-box {
                            grid-template-columns: repeat(3, 1fr);
                        }
                    }

                    @media (max-width: 700px) {
                        .tag-box {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
                `}
            </style>
        </>
    )
}
