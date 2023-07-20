import { Avatar } from '@mui/material'

export default function ProfileImage({imgUrl}:any) {
    return (
        <>
            <Avatar
                alt="Profile Image"
                src={imgUrl}
                sx={{
                    width: 100,
                    height: 100,
                }}
            />
        </>
    )
}
