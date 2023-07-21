import { Avatar, Tooltip } from '@mui/material'

interface Props {
    linkList: any
}

export default function Link({ linkList }: Props) {
    console.log(linkList)

    const imgStyle = {
        width: 50,
        height: 50,
        '&:hover': { cursor: 'pointer', filter: 'brightness(80%)' },
    }

    return (
        <>
            <div className="link-box">
                {linkList?.map((link: any) => (
                    <Tooltip title={link.linkDescription} disableInteractive placement="top" arrow>
                        <a target="_blank" href={link.linkURL} rel="noreferrer">
                            <Avatar alt="Link Image" src={link.linkImageURL} sx={imgStyle} />
                        </a>
                    </Tooltip>
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