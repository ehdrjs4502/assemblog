import { Typography } from "@mui/material"

interface Props {
    name: string
}

export default function Name({ name }: Props) {
    return (
        <>
            <Typography variant='h4'>{name}</Typography>
        </>
    )
}
