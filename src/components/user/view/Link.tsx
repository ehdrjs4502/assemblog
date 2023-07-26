import { Avatar, Tooltip } from '@mui/material'
import { Reveal } from 'react-awesome-reveal'

interface Props {
    linkList: any
}

export default function Link({ linkList }: Props) {

    const imgStyle = {
        width: 50,
        height: 50,
        '&:hover': { cursor: 'pointer', filter: 'brightness(80%)' },
    }

    return (
        <>
            <div className="link-box">
                <Reveal cascade damping={0.5}>
                    {linkList?.map((link: any, idx: number) => (
                        <Tooltip key={idx} title={link.linkDescription} disableInteractive placement="top" arrow>
                            <a target="_blank" href={link.linkURL} rel="noreferrer">
                                <Avatar alt="Link Image" src={link.linkImageURL} sx={imgStyle} />
                            </a>
                        </Tooltip>
                    ))}
                </Reveal>
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
