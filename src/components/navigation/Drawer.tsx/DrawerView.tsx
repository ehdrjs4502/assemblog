import { Drawer } from '@mui/material'
import DrawerHeader from './DrawerHeader'
import CategoryView from '@/components/category/CategoryView'
import TagView from '@/components/category/TagView'
import GuestBookView from '@/components/category/GuestBookView'

interface Props {
    isDrawerOpen: boolean
    setIsDrawerOpen: (isOpen: boolean) => void
    isLogin: boolean
    categoryList: CategoryItem[]
    setCategoryList: (item: CategoryItem[]) => void
}

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

export default function DrawerView({ isDrawerOpen, setIsDrawerOpen, isLogin, categoryList, setCategoryList }: Props) {
    const lineStyle = {
        width: '100%',
        border: 0,
        backgroundColor: 'lightgray',
        height: '0.5px',
    }

    return (
        <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            PaperProps={{ sx: { width: '250px', '::-webkit-scrollbar': { display: 'none' } } }}>
            <DrawerHeader />
            <hr style={lineStyle} />
            <CategoryView isLogin={isLogin} categoryList={categoryList} setCategoryList={setCategoryList} />
            <hr style={lineStyle} />
            <TagView />
            <hr style={lineStyle} />
            <GuestBookView />
            <hr style={lineStyle} />
        </Drawer>
    )
}
