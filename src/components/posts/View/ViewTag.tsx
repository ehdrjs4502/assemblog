import Button from '@mui/material/Button';

interface Props {
    tagList: string[]
}

export default function ViewTag({tagList}:Props) {
    return (
        <>
            {tagList?.map((tag) => 
            <Button key={tag} variant="outlined">{tag}</Button>)}
        </>
    )
}