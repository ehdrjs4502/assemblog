import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useState } from 'react'
import AddBoardModal from './modals/AddBoardModal'
import { useRouter } from 'next/router'
import SettingListModal from './modals/SettingListModal'

type CategoryItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
    boards: BoardItem[]
}

type BoardItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
}

interface Props {
    list: CategoryItem[]
    isLogin: boolean
    setCategoryList: ([]: any) => void
}

export default function CategoryList({ list, isLogin, setCategoryList }: Props) {
    const [open, setOpen] = useState<{ [key: number]: boolean }>({}) // 상세 카테고리 열기

    const router = useRouter()

    const onNestedClick = (id: number) => {
        // 하위 카테고리 열기
        setOpen((prevOpen) => ({
            ...prevOpen,
            [id]: !prevOpen[id],
        }))
    }

    const onClickBoard = (id: number, title: string, childTitle: string) => {
        // 해당 카테고리 포스트 보러가기
        router.push(
            {
                pathname: `/category/${title}/${childTitle}`,
            },
            `/category/${title}/${childTitle}`,
            { shallow: true }
        )
    }

    return (
        <>
            <List component="nav">
                {list.length !== 0 &&
                    list
                        .filter((item) => item.useState) // useState가 true인 카테고리만 불러옴
                        .map(({ id, title, boards, useState }) => {
                            const isOpen = open[id] || false
                            return (
                                <div key={id}>
                                    <ListItem
                                        key={id}
                                        disablePadding
                                        secondaryAction={
                                            // 게시판 설정, 추가 버튼
                                            <>
                                                {isLogin && (
                                                    <div className="admin-settings">
                                                        <SettingListModal
                                                            list={boards}
                                                            setCategoryList={setCategoryList}
                                                            isCategory={false}
                                                        />
                                                        <AddBoardModal
                                                            categoyID={id}
                                                            categoryTitle={title}
                                                            setCategoryList={setCategoryList}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        }>
                                        <ListItemButton
                                            key={id}
                                            sx={{ pl: 4, '&:hover': { color: 'tomato' } }}
                                            onClick={() => onNestedClick(id)}>
                                            <ListItemText primary={title} />
                                            {boards?.length === 0 ? (
                                                ''
                                            ) : isOpen ? (
                                                <ExpandLess sx={{ marginRight: -4 }} />
                                            ) : (
                                                <ExpandMore sx={{ marginRight: -4 }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                    {boards?.length !== 0 && (
                                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                            <List component="div" sx={{ marginLeft: 2 }}>
                                                {boards
                                                    ?.filter((item) => item.useState) // useState가 true인 게시판만 가져옴
                                                    .map(({ id: id, title: boardTitle }) => (
                                                        <ListItem key={id} disablePadding>
                                                            <ListItemButton
                                                                onClick={() => onClickBoard(id, title, boardTitle)}
                                                                key={id}
                                                                sx={{ pl: 4, '&:hover': { color: 'tomato' } }}>
                                                                <ListItemText primary={boardTitle} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    ))}
                                            </List>
                                        </Collapse>
                                    )}
                                </div>
                            )
                        })}
            </List>
            <style jsx>{`
                .admin-settings {
                    display: flex;
                    margin-left: auto;
                    margin-right: 18px;
                }
            `}</style>
        </>
    )
}
