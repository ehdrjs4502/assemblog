import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import AddCategoryModal from './modals/AddCategoryModal'
import CategoryList from './CategoryList'
import { Category } from '@mui/icons-material'
import { useRouter } from 'next/router'
import SettingCateogryListModal from './modals/SettingListModal'

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
    const router = useRouter()

    return (
        <>
            <div className="category-header">
                <div className="category-title" onClick={() => router.push('/category')}>
                    <Category sx={{ width: '18px', marginRight: 1 }} />
                    <span>카테고리</span>
                </div>
                {isLogin ? ( // 카테고리 설정, 추가 버튼
                    <div className="admin-settings">
                        <SettingCateogryListModal
                            list={categoryList}
                            setCategoryList={setCategoryList}
                            isCategory={true}
                        />
                        <AddCategoryModal setCategoryList={setCategoryList} />
                    </div>
                ) : (
                    ''
                )}
            </div>

            <CategoryList list={categoryList} isLogin={isLogin} setCategoryList={setCategoryList} />

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
