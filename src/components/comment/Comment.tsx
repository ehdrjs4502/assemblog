import { Box, Chip, IconButton } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import DeleteIcon from '@mui/icons-material/Delete'

interface Comment {
    id: number
    nickname: string
    content: string
    createdAt: string
}

interface Props {
    commentList: Comment[]
}

export default function Comment({ commentList }: Props) {
    return (
        <>
            <h4>달린 댓글</h4>
            {commentList.map((comment) => (
                <Box
                    key={comment.id}
                    sx={{
                        backgroundColor: 'lightpink',
                        width: 'fit-content',
                        marginBottom: '50px',
                        padding: '20px 20px 5px 20px',
                        borderRadius: 4,
                    }}>
                    <Chip
                        icon={<PersonIcon color="primary" />}
                        label={comment.nickname}
                        sx={{ borderRadius: 2, backgroundColor: 'tomato', color: 'white' }}
                    />
                    <p style={{ wordBreak: 'break-all' }}>{comment.content}</p>
                    <span className="date">{comment.createdAt}</span>
                    <IconButton size="small" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}

            <style jsx>
                {`
                    .date {
                        font-size: 12px;
                    }
                `}
            </style>
        </>
    )
}
