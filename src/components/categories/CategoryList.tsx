import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import AddBoardModal from './modals/AddBoardModal'
import SettingCategoryModal from './modals/SettingCategoryModal'
import { useRouter } from 'next/router'

type CategoryItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
    boards: BoardItem[]
}

type BoardItem = {
    id: number;
    title: string;
    orderNum: number;
    useState: boolean;
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
    const [addBoardModalOpen, setAddBoardModalOpen] = useState(false) // 게시판 생성 모달 상태
    const [settingCategoryModalOpen, setSettingCategoryModalOpen] = useState(false) // 카테고리 설정 모달 상태
    const [categoyID, setCategoryID] = useState<number>(0)
    const [categoyTitle, setCategoryTitle] = useState<string>('')
    const [categoryOrderNum, setCategoryOrderNum] = useState<number>(0)

    const router = useRouter()

    const onNestedClick = (id: number) => {
        // 하위 카테고라 열기
        setOpen((prevOpen) => ({
            ...prevOpen,
            [id]: !prevOpen[id],
        }))
    }

    const onClick = (id: number, title: string, childTitle: string) => {
        // 해당 카테고리 포스트 보러가기
        if (childTitle === '') {
            router.push(
                {
                    pathname: `/category/${title}`,
                    query: { id: id, title: title },
                },
                `/category/${title}`
            )
        } else {
            router.push(
                {
                    pathname: `/category/${title}/${childTitle}`,
                    query: { id: id, title: childTitle },
                },
                `/category/${title}/${childTitle}`
            )
        }
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
                                                    <IconButton
                                                        onClick={() => {
                                                            setSettingCategoryModalOpen(true)
                                                            setCategoryID(id)
                                                            setCategoryTitle(title)
                                                            setCategoryOrderNum(orderNum)
                                                        }}
                                                        color="primary"
                                                        aria-label="menu"
                                                        sx={{
                                                            color: 'gray',
                                                            '&:hover': { color: 'black' },
                                                        }}>
                                                        <SettingsIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => {
                                                            setAddBoardModalOpen(true)
                                                            setCategoryID(id)
                                                            setCategoryTitle(title)
                                                        }}
                                                        color="primary"
                                                        aria-label="menu"
                                                        sx={{
                                                            color: 'gray',
                                                            '&:hover': { color: 'black' },
                                                        }}>
                                                        <AddIcon />
                                                    </IconButton>
                                                </div>
                                            )}
                                        </>
                                    }>
                                    <ListItemButton
                                        key={id}
                                        sx={{ pl: 4 }}
                                        onClick={
                                            boards.length !== 0 ? () => onNestedClick(id) : () => onClick(id, title, '')
                                        }>
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
                                        {boards.map(({ id: childID, title: childTitle }) => (
                                            <ListItem
                                                key={childID}
                                                disablePadding
                                                secondaryAction={
                                                    <>
                                                        {isLogin ? (
                                                            <IconButton
                                                                onClick={() => alert(childTitle + ' 설정')}
                                                                color="primary"
                                                                aria-label="menu"
                                                                sx={{
                                                                    color: 'gray',
                                                                    '&:hover': {
                                                                        color: 'black',
                                                                    },
                                                                }}>
                                                                <SettingsIcon />
                                                            </IconButton>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </>
                                                }>
                                                <ListItemButton
                                                    onClick={() => onClick(childID, title, childTitle)}
                                                    key={childID}
                                                    sx={{ pl: 4 }}>
                                                    <ListItemText primary={childTitle} />
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

            <SettingCategoryModal
                onClose={() => setSettingCategoryModalOpen(false)}
                isOpen={settingCategoryModalOpen}
                categoryID={categoyID}
                categoryTitle={categoyTitle}
                categoryOrderNum={categoryOrderNum}
                userInfo={userInfo}
                getCategories={getCategories}
            />

            <AddBoardModal
                onClose={() => setAddBoardModalOpen(false)}
                isOpen={addBoardModalOpen}
                categoyID={categoyID}
                categoryTitle={categoyTitle}
                userInfo={userInfo}
                getCategories={getCategories}
            />

            <style jsx>{`
                .admin-settings {
                    margin-left: auto;
                    margin-right: 18px;
                }
            `}</style>
        </>
    )
}
