import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import AddCategoryModal from './modals/AddCategoryModal'
import CategoryList from './CategoryList'
import { VisibilityOff, Visibility, Category } from '@mui/icons-material'
import { useRouter } from 'next/router'
import SettingCateogryListModal from './modals/SettingCategoryListModal'

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
    categoryList: CategoryItem[]
    setCategoryList: ([]: any) => void
}

export default function CategoryView({ isLogin, categoryList, setCategoryList }: Props) {
    const [onHide, setOnHide] = useState<boolean>(false) // 숨김 카테고리 상태
    const router = useRouter()

    return (
        <>
            <div className="category-header">
                <div className='category-title' onClick={() => router.push('/category')}>
                    <Category sx={{width:'18px', marginRight:1}}/>
                    <span>카테고리</span>
                </div>
                {isLogin ? (
                    <div className="admin-settings">
                        <IconButton onClick={() => setOnHide(!onHide)}>
                            {onHide ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        <SettingCateogryListModal list={categoryList} setCategoryList={setCategoryList}/>
                        <AddCategoryModal setCategoryList={setCategoryList} />
                    </div>
                ) : (
                    ''
                )}
            </div>

            <CategoryList list={categoryList} isLogin={isLogin} setCategoryList={setCategoryList} isView={true} />

            {onHide && (
                <>
                    <h4>숨겨진 카테고리</h4>
                    <CategoryList
                        list={categoryList}
                        isLogin={isLogin}
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

                    .category-title {
                        justify-content: center;
                        align-items: center;
                        display: flex;
                        font-weight: bold;
                    }

                    .category-title:hover {
                        cursor: pointer;
                        color: tomato;
                    }

                    .admin-settings {
                        display: flex;
                        margin-left: auto;
                        margin-right: 9px;
                    }
                `}
            </style>
        </>
    )
}
