import { Pagination } from '@mui/material'
import { ChangeEvent } from 'react'

export default function PaginationView({ totalPage, page, setPage, router }: any) {
    //페이지 이동하는 함수
    const handleChange = (e: ChangeEvent<unknown>, value: number) => {
        router.push({ pathname: router.pathname, query: { ...router.query, page: value } })
        setPage(value)
    }   

    return (
        <>
            <div className="pagination">
                <Pagination count={totalPage} page={page} onChange={handleChange} />
            </div>

            <style jsx>{`
                .pagination {
                    display: flex;
                    margin-top: 12px;
                    margin-bottom: 12px;
                    justify-content: center;
                }
            `}</style>
        </>
    )
}
