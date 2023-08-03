import { LocalOffer } from '@mui/icons-material'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

interface Props {
    tagList: string[]
}

export default function ViewTag({ tagList }: Props) {
    const router = useRouter()
    const onClcikBtn = (tag: string) => {
        router.push(`/tag/${tag}`)
    }

    return (
        <>
            {tagList?.map((tag) => (
                <Button key={tag} variant="outlined" onClick={() => onClcikBtn(tag)} sx={{marginRight:2}}>
                    <LocalOffer sx={{ width: '18px', marginRight: 1 }} />
                    {tag}
                </Button>
            ))}
        </>
    )
}
