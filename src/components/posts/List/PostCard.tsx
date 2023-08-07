import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Avatar, Button, CardActionArea, CardActions, CardHeader, Chip } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axios from 'axios'

interface Props {
    post: {
        postId: number
        title: string
        thumbnail: string
        categoryTitle: string
        boardTitle: string
        preview: string
        username: string
        commentCount: number
        createdAt: Date
        updatedAt: Date
        likeCount: number
        viewCount: number
        profileImage: string
    }
}

export default function PostCard({ post }: Props) {
    const router = useRouter()
    const date = new Date(post.createdAt)
    const formattedDate = `${date.getFullYear()}. ${
        // yyyy. MM. dd. hh:mm 으로 데이터 포맷하기
        date.getMonth() + 1
    }. ${date.getDate()}`

    const onClickCategory = (category: string, board: string) => {
        // 해당 카테고리 포스트 보러가기
        router.push({
            pathname: `/category/${category}/${board}`,
        })
    }

    const onClickPost = (postID: number) => {
        //해당 포스트 보러가기
        router.push({
            pathname: `/post/${postID}`,
        })
    }

    return (
        <Card
            sx={{
                color: 'whitesmoke',
                maxWidth: '100%',
                minWidth: '350px',
                height: '100%',
                borderRadius: 4,
                backgroundColor: 'rgb(35,35,35)',
                boxShadow: 10,
                transition: 'transform 0.3s ease',
                ':hover': { boxShadow: 20, backgroundColor: 'rgba(35,35,35, 0.9)', transform: 'translateY(-5px)' },

                // 미디어 쿼리에 해당하는 스타일 작성
                '@media (max-width: 1200px)': {
                    minWidth: '300px',
                },
            }}>
            <CardActionArea onClick={() => onClickPost(post.postId)}>
                <CardMedia component="img" height="160" image={post.thumbnail} alt="썸네일 이미지" />
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
                    onClick={() => onClickCategory(post.categoryTitle, post.boardTitle)}>
                    {post.categoryTitle} / {post.boardTitle}
                </Button>
            </CardActions>
            <CardActionArea onClick={() => onClickPost(post.postId)}>
                <CardContent
                    sx={{
                        height: 90,
                        // 미디어 쿼리에 해당하는 스타일 작성
                        '@media (max-width: 1200px)': {
                            height: 60,
                        },
                    }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography variant="body2">{post.preview}</Typography>
                </CardContent>
            </CardActionArea>
            <div style={{ display: 'flex', width: '100%', justifyContent:'space-between', marginBottom:'15px'}}>
                <CardHeader
                    avatar={
                        <Avatar
                            alt={post.username}
                            src={post.profileImage}
                            sx={{ width: 38, height: 38, marginRight: '-5px' }}
                        />
                    }
                    title={post.username}
                    titleTypographyProps={{
                        fontSize: 16,
                        // 미디어 쿼리에 해당하는 스타일 작성
                        '@media (max-width: 1200px)': {
                            fontSize: 14,
                        },
                    }}
                    subheader={<div style={{ color: 'white', fontSize: '12px' }}>{formattedDate}</div>}
                />
                <div style={{display:'flex', alignItems:'flex-end'}}>
                    <Typography
                        sx={{ marginRight: 2, fontSize: 12, textAlign: 'right', marginBottom:2 }}
                        variant="body2">
                        조회수 {post.viewCount} · 댓글 {post.commentCount}
                    </Typography>
                </div>
            </div>
        </Card>
    )
}
