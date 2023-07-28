import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export default function Tag({ tag }: any) {
    const router = useRouter()

    const onClickBtn = (tag: string) => {
        router.push({ pathname: `/tag/${tag}` })
    }

    return (
        <>
            <div className="tag-button">
                <Button
                    variant="outlined"
                    onClick={() => onClickBtn(tag)}
                    sx={{
                        width:'100%',
                        paddingTop:'16px',
                        paddingBottom:'16px',
                        backgroundColor: '#F2F2F2',
                        color: 'black',
                        fontSize: '15px',
                        border: 'none',
                        display: 'inline-block',
                        wordBreak: 'normal',
                        '&:hover' : {border:'none', backgroundColor:'#585858', color:'white'}
                    }}>
                    {tag}
                </Button>
            </div>

            <style jsx>
                {`
                    .tag-button {
                        margin: 10px;
                    }
                `}
            </style>
        </>
    )
}
