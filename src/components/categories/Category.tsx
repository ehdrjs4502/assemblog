import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import AddCategoryModal from './modals/AddCategoryModal'
import CategoryList from './CategoryList'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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
    getCategories: () => void
    isLogin: boolean
    userInfo: {
        email: string
        accessToken: string
        refreshToken: string
    }
}

export default function Category({list, getCategories, isLogin, userInfo}: Props) {
    const [addCategoryModalOpen, setAddCategoryModalOpen] = useState<boolean>(false); // 모달 상태
    const [onHide, setOnHide] = useState<boolean>(false); // 숨김 카테고리 상태
    const router = useRouter();
   

    return (
        <>
            <div className="category-header">
                <span onClick={() => router.push('/category')}>Category</span>
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

            <CategoryList list={list} isLogin={isLogin} userInfo={userInfo} getCategories={getCategories} isView={true} />

            {onHide && (
                <>
                    <h4>숨겨진 카테고리</h4>
                    <CategoryList list={list} isLogin={isLogin} userInfo={userInfo} getCategories={getCategories} isView={false} />
                </>
            )}
            

            <AddCategoryModal
                onClose={() => {
                    setAddCategoryModalOpen(false)
                }}
                isOpen={addCategoryModalOpen}
                userInfo={userInfo}
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
