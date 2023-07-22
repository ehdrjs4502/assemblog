import { Typography } from '@mui/material'
import { Fade } from 'react-awesome-reveal'

interface Props {
    introduction: string
}

export default function Introduction({ introduction }: Props) {
    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    marginTop: 6,
                    marginBottom: 8,
                    fontSize: '42px'
                }}>
                <Fade cascade damping={0.2}>
                    {introduction}
                </Fade>
            </Typography>
        </>
    )
}
