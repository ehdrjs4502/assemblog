import { Typography } from "@mui/material"

interface Props {
    email: string
}

export default function Email({ email }: Props) {
    console.log(email)
    return (
        <>
            <Typography variant='body1'>{email}</Typography>
        </>
    )
}
