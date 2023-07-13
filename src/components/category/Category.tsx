import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import AddCategoryModal from './modals/AddCategoryModal'
import CategoryList from './CategoryList'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { getCategoryList } from '@/function/getCategory'

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
    isLogin: boolean
    userInfo: {
        email: string
        accessToken: string
        refreshToken: string
    }
}

export default function Category({ isLogin, userInfo }: Props) {
    const [categoryList, setCategoryList] = useState<CategoryItem[]>([])
    const [onHide, setOnHide] = useState<boolean>(false) // 숨김 카테고리 상태
    const router = useRouter()

    useEffect(() => {
        // 카테고리 리스트 가져오기
        const fetchCategoryList = async () => {
            const list = await getCategoryList() // 카테고리 가져오는 함수
            setCategoryList(list)
        }

        fetchCategoryList()

        // const testList: CategoryItem[] = [
        //     {
        //         id: 1,
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
        //         id: 2,
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
        //         id: 3,
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

        // setCategoryList(testList)
    }, [])

    return (
        <>
            <div className="category-header">
                <span onClick={() => router.push('/category')}>Category</span>
                {isLogin ? (
                    <div className="admin-settings">
                        <IconButton onClick={() => setOnHide(!onHide)}>
                            {onHide ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        <AddCategoryModal
                            userInfo={userInfo}
                            setCategoryList={setCategoryList}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>

            <CategoryList
                list={categoryList}
                isLogin={isLogin}
                userInfo={userInfo}
                setCategoryList={setCategoryList}
                isView={true}
            />

            {onHide && (
                <>
                    <h4>숨겨진 카테고리</h4>
                    <CategoryList
                        list={categoryList}
                        isLogin={isLogin}
                        userInfo={userInfo}
                        setCategoryList={setCategoryList}
                        isView={false}
                    />
                </>
            )}

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

                    .category-header span:hover {
                        cursor: pointer;
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
