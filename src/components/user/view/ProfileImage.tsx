import { Avatar } from '@mui/material'

export default function ProfileImage({imgUrl}:any) {
    return (
        <>
            <Avatar
                alt="Profile Image"
                src={imgUrl}
                sx={{
                    width: 90,
                    height: 90,
                    marginTop: 5,
                    marginBottom: 2,
                }}
            />
        </>
    )
}
