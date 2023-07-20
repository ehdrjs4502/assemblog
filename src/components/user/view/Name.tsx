import { Typography } from "@mui/material"

interface Props {
    name: string
}

export default function Name({ name }: Props) {
    console.log(name)
    return (
        <>
            <Typography variant='h4'>{name}</Typography>
        </>
    )
}
