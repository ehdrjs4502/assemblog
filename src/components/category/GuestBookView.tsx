import { useRouter } from 'next/router'
import { MenuBook } from '@mui/icons-material'

export default function GuestBookView() {
    const router = useRouter()
    const onClickBtn = () => {
        router.push('/guestbook')
    }
    return (
        <>
            <div className="tag-header">
                <div className="tag-title" onClick={() => onClickBtn()}>
                    <MenuBook sx={{ width: '18px', marginRight: 1 }} />
                    <span>방명록</span>
                </div>
            </div>

            <style jsx>{`
                .tag-header {
                    display: flex;
                    padding-left: 10px;
                    margin-top: 30px;
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
