import { Typography } from '@mui/material'
import { Fade } from 'react-awesome-reveal'

interface Props {
    introduction: string
}

export default function Introduction({ introduction }: Props) {
    return (
        <>
            <Typography variant="h5">
                <Fade cascade damping={0.1}>
                    {introduction}
                </Fade>
            </Typography>
        </>
    )
}
