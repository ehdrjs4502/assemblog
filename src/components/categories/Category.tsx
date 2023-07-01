import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import AddCategoryModal from './modals/AddCategoryModal'
import CategoryList from './CategoryList'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Cookies } from 'react-cookie'

interface CategoryItem {
    id: string
    title: string
    orderNum: number
    useState: boolean
    boards: CategoryItem[]
}

interface Props {
    list: CategoryItem[]
    getCategories: () => void
}

type userInfo = {
    email: string
    accessToken: string
    refreshToken: string
}

export default function Category({list, getCategories}: Props) {
    const [isLogin, setIsLogin] = useState<boolean>(false) // 로그인 되어있는지 확인
    const [addCategoryModalOpen, setAddCategoryModalOpen] = useState<boolean>(false) // 모달 상태
    const [onHide, setOnHide] = useState<boolean>(false); // 숨김 카테고리 상태
    const cookie = new Cookies()
    const userInfo: userInfo = {
        email: cookie.get('email'),
        accessToken: cookie.get('accessToken'), // 액세스 토큰 저장
        refreshToken: cookie.get('refreshToken') // 리프레쉬 토큰 저장
    }

    useEffect(() => {
        if (userInfo.refreshToken !== undefined) {
            // 리프레쉬 토큰이 있으면
            setIsLogin(true) // 로그인 되어있으니 true로 바꾸기
        }
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

                    .admin-settings {
                        margin-left: auto;
                        margin-right: 9px;
                    }
                `}
            </style>
        </>
    )
}
