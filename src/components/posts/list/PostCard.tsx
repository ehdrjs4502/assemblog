import Image from 'next/image'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Avatar, Button, CardActionArea, CardActions, CardHeader, Chip } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
    const date = new Date(post.createdAt) // 게시글 생성 날짜
    const [thumbnailURL, setThumbnailURL] = useState(post.thumbnail) // 썸네일 이미지 경로
    const defaultImg = '/img/bgimg.jpg' // 기본 이미지 경로
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

    const cardStyle = {
        color: 'whitesmoke',
        maxWidth: '360px',
        minWidth: '360px',
        height: '100%',
        borderRadius: 4,
        backgroundColor: 'rgb(35,35,35)',
        boxShadow: 10,
        transition: 'transform 0.3s ease',
        ':hover': { boxShadow: 20, backgroundColor: 'rgba(35,35,35, 0.9)', transform: 'translateY(-5px)' },
        '@media (max-width: 1200px)': {
            minWidth: '300px',
            maxWidth: '300px',
        },
    }

    return (
        <>
            <Card sx={cardStyle}>
                <CardActionArea onClick={() => onClickPost(post.postId)}>
                    <CardMedia sx={{ height: '160px' }}>
                        <div>
                            <Image
                                src={thumbnailURL}
                                alt="thumbnail"
                                layout="fill"
                                objectFit="cover"
                                onError={() => {
                                    setThumbnailURL(defaultImg)
                                }}
                            />
                        </div>
                    </CardMedia>
                </CardActionArea>
                <CardActions sx={{ marginTop: 1 }}>
                    <Button
                        sx={{
                            backgroundColor: '#3994ff',
                            color: 'whitesmoke',
                            textTransform: 'none',
                            ':hover': { backgroundColor: '#0040FF' },
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
                        <Typography
                            sx={{
                                // 내용 2줄이상일 때 자르기
                                textOverflow: 'ellipsis', // ... 추가
                                overflow: 'hidden',
                                wordBreak: 'break-word',
                                display: '-webkit-box',
                                WebkitLineClamp: 2, // 라인 수
                                WebkitBoxOrient: 'vertical',
                            }}
                            variant="body2">
                            {post.preview}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '15px' }}>
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
                            sx: {
                                fontSize: {
                                    xs: 14, // 화면이 작은 경우에 14px
                                    md: 16, // 화면이 중간 정도 크기인 경우에 16px
                                },
                            },
                        }}
                        subheader={<div style={{ color: 'white', fontSize: '12px' }}>{formattedDate}</div>}
                    />
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Typography
                            sx={{ marginRight: 2, fontSize: 12, textAlign: 'right', marginBottom: 2 }}
                            variant="body2">
                            조회수 {post.viewCount} · 댓글 {post.commentCount}
                        </Typography>
                    </div>
                </div>
            </Card>

            <style jsx>{``}</style>
        </>
    )
}
