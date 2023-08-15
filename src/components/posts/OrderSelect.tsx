import { MenuItem, Select } from '@mui/material'

export default function OrderSelect({ order, setOrder, router }: any) {
    const handleChange = (event: any) => {
        setOrder(event.target.value as string)
        router.push({ pathname: router.pathname, query: { ...router.query, page: 1 } })
    }

    return (
        <>
            <div className="box">
                <div className="order-box">
                    <Select sx={{ width: '100px' }} id="demo-simple-select" value={order} onChange={handleChange}>
                        <MenuItem value={'created_at'}>생성순</MenuItem>
                        <MenuItem value={'view'}>조회순</MenuItem>
                        <MenuItem value={'comment'}>댓글순</MenuItem>
                    </Select>
                </div>
            </div>

            <style jsx>{`
                .box {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
                .order-box {
                    width: 80%;
                    display: flex;
                    justify-content: flex-end;
                }
            `}</style>
        </>
    )
}
