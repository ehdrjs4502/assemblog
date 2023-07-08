import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import { useRouter } from 'next/router'

interface Props {
    data: {
        postId: number
        title: string
        thumbnail: string
        categoryTitle: string
        boardTitle: string
        preview: string
        writer: string
        date: string
        commentCount: number
        createAt: Date
        updateAt: Date
        likeCount: number
        viewCount: number
    }
}

export default function PostCard({ data }: Props) {
    const router = useRouter()
    const date = new Date(data.date)
    const formattedDate = `${date.getFullYear()}. ${
        // yyyy. MM. dd. hh:mm 으로 데이터 포맷하기
        date.getMonth() + 1
    }. ${date.getDate()}. ${date.getHours()}:${date.getMinutes()}`

    const onClickCategory = (category: string, board: string) => {
        // 해당 카테고리 포스트 보러가기
        router.push({
            pathname: `/category/${category}/${board}`,
        })
    }

    const onClickPost = (postID: number) => {
        router.push({
            pathname: `/post/${postID}`,
        })
    }
    return (
        <Card
            sx={{
                color: 'whitesmoke',
                maxWidth: 330,
                height: 360,
                borderRadius: 4,
                backgroundColor: 'rgb(35,35,35)',
                transition: 'transform 0.3s ease',
                ':hover': { boxShadow: 10, backgroundColor: 'rgba(35,35,35, 0.9)', transform: 'translateY(-5px)' },
            }}>
            <CardActionArea onClick={() => onClickPost(data.postId)}>
                <CardMedia component="img" height="140" image={data.thumbnail} alt="썸네일 이미지" />
            </CardActionArea>
            <CardActions sx={{ marginTop: 1 }}>
                <Button
                    sx={{
                        backgroundColor: 'tomato',
                        color: 'whitesmoke',
                        textTransform: 'none',
                        ':hover': { backgroundColor: 'red' },
                    }}
                    size="small"
                    color="primary"
                    onClick={() => onClickCategory(data.categoryTitle, data.boardTitle)}>
                    {data.categoryTitle} / {data.boardTitle}
                </Button>
            </CardActions>
            <CardActionArea onClick={() => onClickPost(data.postId)}>
                <CardContent sx={{ height: 90 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.title}
                    </Typography>
                    <Typography variant="body2">{data.preview}</Typography>
                </CardContent>
            </CardActionArea>
            <Typography sx={{ marginLeft: 2, fontSize: 12 }} variant="body2">
               {data.writer} {formattedDate} 조회수 : {data.viewCount}
            </Typography>
        </Card>
    )
}
