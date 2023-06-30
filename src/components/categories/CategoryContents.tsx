import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AddCategoryModal from './modals/AddCategoryModal'
import CategoryList from './CategoryList'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface CategoryItem {
    id: string
    title: string
    orderNum: number
    useState: boolean
    boards: CategoryItem[]
}

interface Props {
    isLogin: boolean
    cookie: {
        email: string
        refToken: string
        accToken: string
    }
}

export default function CategoryContents({ isLogin, cookie: cookie }: Props) {
    const [addCategoryModalOpen, setAddCategoryModalOpen] = useState<boolean>(false) // 모달 상태
    const [list, setList] = useState<CategoryItem[]>([])
    const [onHide, setOnHide] = useState<boolean>(false);

    // const testList: CategoryItem = [
    //     {
    //         id: '1',
    //         title: 'test1',
    //         orderNum: 1,
    //         useState: false,
    //         boards: [
    //             {
    //                 id: 1,
    //                 title: 'board1',
    //                 orderNum: 1,
    //                 useState: true,
    //             },
    //         ],
    //     },

    //     {
    //         id: '2',
    //         title: 'test2',
    //         orderNum: 2,
    //         useState: true,
    //         boards: [
    //             {
    //                 id: 1,
    //                 title: 'board2',
    //                 orderNum: 1,
    //                 useState: true,
    //             },
    //         ],
    //     },

    //     {
    //         id: '3',
    //         title: 'test3',
    //         orderNum: 3,
    //         useState: true,
    //         boards: [],
    //     },

    //     {
    //         id: 4,
    //         title: 'test4',
    //         orderNum: 4,
    //         useState: false,
    //         boards: [],
    //     },
    // ]

    const getCategories = async () => {
        try {
            const responce = await axios.get('/categories', {
                headers: {
                    'ngrok-skip-browser-warning': '1234',
                },
            })
            setList(responce.data);
            console.log(responce);
        } catch (e) {
            alert(e);
        }

        // setList(testList);
    }

    console.log("숨김 : ",onHide)

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <>
            <div className="category-header">
                <span>Category</span>
                {isLogin ? (
                    <div className="admin-settings">
                        <IconButton onClick={() => setOnHide(!onHide)}>
                            {onHide ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setAddCategoryModalOpen(true)
                            }}
                            color="primary"
                            aria-label="menu"
                            sx={{
                                color: 'gray',
                                '&:hover': {
                                    color: 'black',
                                },
                            }}>
                            <AddIcon />
                        </IconButton>
                    </div>
                ) : (
                    ''
                )}
            </div>

            <CategoryList list={list} isLogin={isLogin} cookie={cookie} getCategories={getCategories} isView={true} />

            {onHide && (
                <>
                    <h4>숨겨진 카테고리</h4>
                    <CategoryList list={list} isLogin={isLogin} cookie={cookie} getCategories={getCategories} isView={false} />
                </>
            )}
            

            <AddCategoryModal
                onClose={() => {
                    setAddCategoryModalOpen(false)
                }}
                isOpen={addCategoryModalOpen}
                cookie={cookie}
                getCategories={getCategories}
            />

            <style jsx>
                {`
                    .category-header {
                        display: flex;
                        padding-left: 10px;
                    }

                    .category-header span {
                        justify-content: center;
                        align-items: center;
                        display: flex;
                        font-weight: bold;
                    }

                    .admin-settings {
                        margin-left: auto;
                        margin-right: 9px;
                    }
                `}
            </style>
        </>
    )
}
