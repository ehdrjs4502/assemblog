import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import AddBoardModal from './modals/AddBoardModal'
import SettingCategoryModal from './modals/SettingCategoryModal'

interface CategoryItem {
    id: string
    title: string
    orderNum: number
    useState: boolean
    boards: CategoryItem[]
}


interface Props {
    list: CategoryItem[]
    isLogin: boolean
    cookie: {
        email: string
        refToken: string
        accToken: string
    }
    getCategories: () => void
}


export default function CategoryList({ list, isLogin, cookie, getCategories}: Props) {
    const [open, setOpen] = useState<{ [key: string]: boolean }>({}) // 상세 카테고리 열기
    const [addBoardModalOpen, setAddBoardModalOpen] = useState(false) // 게시판 생성 모달 상태
    const [settingCategoryModalOpen, setSettingCategoryModalOpen] = useState(false) // 카테고리 설정 모달 상태
    const [categoyID, setCategoryID] = useState<string>('')
    const [categoyTitle, setCategoryTitle] = useState<string>('')
    const [categoryOrderNum, setCategoryOrderNum] = useState<number>(0)

    const handleClick = (id: string) => () => {
        setOpen((prevOpen) => ({
            ...prevOpen,
            [id]: !prevOpen[id],
        }))
    }

    return (
        <>
            <List component="nav">
                {list.map(({ id, title, orderNum, boards, useState }) => {
                    const isOpen = open[id] || false
                    return (
                        <div key={id}>
                            {useState && (
                                <ListItemButton onClick={handleClick(id)}>
                                    <ListItemText primary={title} />
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
                                    {boards.length === 0 ? '' : isOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
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
                                                    onClick={() => alert(childTitle)}
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
                cookie={cookie}
                getCategories={getCategories}
            />

            <AddBoardModal
                onClose={() => setAddBoardModalOpen(false)}
                isOpen={addBoardModalOpen}
                categoyID={categoyID}
                categoryTitle={categoyTitle}
                cookie={cookie}
                getCategories={getCategories}
            />
        </>
    )
}
