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
    getCategories: () => void
    isView: boolean
}

export default function CategoryList({ list, isLogin, userInfo, getCategories, isView }: Props) {
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
                query: { id: id, title: childTitle },
            },
            `/category/${title}/${childTitle}`
        )
    }

    return (
        <>
            <List component="nav">
                {list.map(({ id, title, orderNum, boards, useState }) => {
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
                                                        getCategories={getCategories}
                                                    />
                                                    <AddBoardModal
                                                        categoyID={id}
                                                        categoryTitle={title}
                                                        userInfo={userInfo}
                                                        getCategories={getCategories}
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
                                    <List component="div">
                                        {boards.map(({ id: id, title: title, orderNum: orderNum }) => (
                                            <ListItem
                                                key={id}
                                                disablePadding
                                                secondaryAction={
                                                    <>
                                                        {isLogin && (
                                                            <SettingBoardModal
                                                                boardID={id}
                                                                boardTitle={title}
                                                                boardOrderNum={orderNum}
                                                                userInfo={userInfo}
                                                                getCategories={getCategories}
                                                            />
                                                        )}
                                                    </>
                                                }>
                                                <ListItemButton
                                                    onClick={() => onClickBoard(id, title, title)}
                                                    key={id}
                                                    sx={{ pl: 4 }}>
                                                    <ListItemText primary={title} />
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
