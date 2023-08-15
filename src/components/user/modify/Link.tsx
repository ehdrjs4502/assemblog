import LinkModal from './modal/LinkModal'

interface Props {
    linkList: any
    setLinkList: (linkList: any) => void
}

export default function Link({ linkList, setLinkList }: Props) {
    return (
        <>
            <h4>링크 수정</h4>
            <div className="link-box">
                {linkList?.map((link: any, idx: number) => (
                    <LinkModal key={idx} link={link} idx={idx} setLinkList={setLinkList} />
                ))}
            </div>
            <style jsx>
                {`
                    .link-box {
                        display: flex;
                        justify-content: space-around;
                        margin-top: 10px;
                        width: 300px;
                        margin-bottom: 30px;
                    }
                `}
            </style>
        </>
    )
}
