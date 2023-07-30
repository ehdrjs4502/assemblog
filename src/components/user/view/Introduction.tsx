import { Typography } from '@mui/material'
import { Typewriter } from 'react-simple-typewriter'

interface Props {
    introduction: string
}

export default function Introduction({ introduction }: Props) {
    return (
        <>
            <div className="introduction-box">
                <Typography
                    variant="h5"
                    sx={{
                        marginTop: 6,
                        marginBottom: 8,
                        fontSize: '28px',
                    }}>
                    <Typewriter words={[introduction]} />
                </Typography>
            </div>

            <style jsx>{`
                .introduction-box {
                    width: 450px;
                    min-height: 200px;
                    word-break: keep-all;
                }
            `}</style>
        </>
    )
}
