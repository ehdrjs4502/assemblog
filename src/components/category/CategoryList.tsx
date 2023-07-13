import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useState } from 'react'
import AddBoardModal from './modals/AddBoardModal'
import SettingCategoryModal from './modals/SettingCategoryModal'
import { useRouter } from 'next/router'
import SettingBoardModal from './modals/SettingBoardModal'

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
    userInfo: {
        email: string
        accessToken: string
        refreshToken: string
    }
    setCategoryList: ([]: any) => void
    isView: boolean
}

export default function CategoryList({ list, isLogin, userInfo, setCategoryList, isView }: Props) {
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
                query: { id: id },
            },
            `/category/${title}/${childTitle}`
        )
    }

    return (
        <>
            <List component="nav">
                {list.length !== 0 &&
                    list.map(({ id, title, orderNum, boards, useState }) => {
                        const isOpen = open[id] || false
                        return (
                            <div key={id}>
                                {useState === isView && (
                                    <ListItem
                                        key={id}
                                        disablePadding
                                        secondaryAction={
                                            <>
                                                {isLogin && (
                                                    <div className="admin-settings">
                                                        <SettingCategoryModal
                                                            categoryID={id}
                                                            categoryTitle={title}
                                                            categoryOrderNum={orderNum}
                                                            userInfo={userInfo}
                                                            setCategoryList={setCategoryList}
                                                        />
                                                        <AddBoardModal
                                                            categoyID={id}
                                                            categoryTitle={title}
                                                            userInfo={userInfo}
                                                            setCategoryList={setCategoryList}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        }>
                                        <ListItemButton key={id} sx={{ pl: 4 }} onClick={() => onNestedClick(id)}>
                                            <ListItemText primary={title} />
                                            {boards.length === 0 ? (
                                                ''
                                            ) : isOpen ? (
                                                <ExpandLess sx={{ marginRight: -4 }} />
                                            ) : (
                                                <ExpandMore sx={{ marginRight: -4 }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                )}
                                {boards.length !== 0 && (
                                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                        <List component="div" sx={{marginLeft:2}}>
                                            {boards.map(({ id: id, title: boardTitle, orderNum: orderNum }) => (
                                                <ListItem
                                                    key={id}
                                                    disablePadding
                                                    secondaryAction={
                                                        <>
                                                            {isLogin && (
                                                                <SettingBoardModal
                                                                    boardID={id}
                                                                    boardTitle={boardTitle}
                                                                    boardOrderNum={orderNum}
                                                                    userInfo={userInfo}
                                                                    setCategoryList={setCategoryList}
                                                                />
                                                            )}
                                                        </>
                                                    }>
                                                    <ListItemButton
                                                        onClick={() => onClickBoard(id, title, boardTitle)}
                                                        key={id}
                                                        sx={{ pl: 4 }}>
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
                    margin-left: auto;
                    margin-right: 18px;
                }
            `}</style>
        </>
    )
}
