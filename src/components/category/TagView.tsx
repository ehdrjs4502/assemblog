import { useRouter } from 'next/router'
import { LocalOffer } from '@mui/icons-material'

export default function TagView() {
    const router = useRouter()
    const onClickBtn = () => {
        router.push('/tag')
    }
    return (
        <>
            <div className="tag-header">
                <div className="tag-title" onClick={() => onClickBtn()}>
                    <LocalOffer sx={{ width: '18px', marginRight: 1 }} />
                    <span>태그 저장소</span>
                </div>
            </div>

            <style jsx>{`
                .tag-header {
                    display: flex;
                    padding-left: 10px;
                    margin-top: 15px;
                    margin-bottom: 15px;
                }
                .tag-title {
                    align-items: center;
                    display: flex;
                    font-weight: bold;
                }

                .tag-title:hover {
                    cursor: pointer;
                    color: rgb(21, 0, 255);
                }
            `}</style>
        </>
    )
}
