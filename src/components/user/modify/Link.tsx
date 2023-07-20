import LinkModal from './modal/LinkModal'

interface Props {
    linkList: [{}]
    setLinkList: (linkList: [{}]) => void
}

export default function Link({ linkList, setLinkList }: Props) {
    const imgStyle = {
        width: 50,
        height: 50,
        '&:hover': { cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.4)' },
    }

    return (
        <>
            <h4>링크 수정</h4>
            <div className="link-box">
                <LinkModal linkId="1" />
                <LinkModal linkId="2" />
                <LinkModal linkId="3" />
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
