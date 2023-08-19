import Tag from '@/components/tag/Tag'

type tag = {
    id: number,
    name: string
}

interface Props { 
    tagList: [tag]
}

export default function TagList({ tagList }: Props) {
    return (
        <>
            <div className='container'>
                <div className="tag-box">
                    {tagList.map((tag: tag) => (
                        <Tag key={tag.id} tag={tag.name} />
                    ))}
                </div>
            </div>

            <style jsx>
                {`
                    .container {
                        display: flex;
                        justify-content: center;
                        margin-bottom: 100px;
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
