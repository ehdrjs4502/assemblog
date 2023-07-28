import { Typography } from '@mui/material'
import { Fade } from 'react-awesome-reveal'

interface Props {
    introduction: string
}

export default function Introduction({ introduction }: Props) {
    return (
        <div>
            <Typography
                variant="h5"
                sx={{
                    marginTop: 6,
                    marginBottom: 8,
                    fontSize: '28px',
                }}>
                <Fade cascade damping={0.08}>
                    {introduction}
                </Fade>
            </Typography>
        </div>
    )
}
