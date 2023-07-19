import { useEffect, useState } from 'react'
import ModifyModal from './ModifyModal'
import DelBtn from './buttons/DelBtn'
import { List, ListItem, ListItemText } from '@mui/material'

interface Props {
    list: any
    setCategoryList: ([]: any) => void
    isCategory: boolean
}

export default function HideList({ list, setCategoryList, isCategory }: Props) {
    const [hideList, setHideList] = useState<any>()

    useEffect(() => {
        setHideList(list.filter((item: any) => item.useState === false)) // 숨겨진 카테고리 또는 게시판 가져오기
    }, [])

    return (
        <>
            <span>{isCategory ? '숨겨진 카테고리 목록' : '숨겨진 게시판 목록'}</span>
            {hideList?.length === 0 && (
                <div>
                    <ListItem>
                        <ListItemText primary="없당" />
                    </ListItem>
                </div>
            )}
            <List>
                {hideList?.map((item: any, idx: number) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={`${idx + 1}. ${item.title}`} />
                        <DelBtn itemID={item.id} setCategoryList={setCategoryList} isCategory={isCategory} />
                        <ModifyModal
                            itemID={item.id}
                            itemTitle={item.title}
                            itemOrderNum={item.orderNum}
                            setCategoryList={setCategoryList}
                            isCategory={isCategory}
                        />
                    </ListItem>
                ))}
            </List>

            <style jsx>
                {`
                    span {
                        margin-top: 30px;
                        font-weight: bold;
                    }
                `}
            </style>
        </>
    )
}
