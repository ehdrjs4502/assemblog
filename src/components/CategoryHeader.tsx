import React, { useState, useEffect, useRef, useCallback } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { Cookies } from 'react-cookie'
import AddCategoryModal from './AddCategoryModal'

interface Props {
    isLogin: boolean
    cookie: {
        email: string
        refToken: string
        accToken: string
    }
}

export default function CategoryHeader({ isLogin, cookie: cookie }: Props) {
    const [open, setOpen] = useState<boolean>(false) // 모달 상태
    const [title, setTitle] = useState<string>('') // 카테고리명
    const titleRef = useRef() // 카테고리명 인풋창
    const newCookie = new Cookies()

    return (
        <>
            <div className="category-header">
                <span>Category</span>
                {isLogin ? (
                    <div className="admin-settings">
                        <IconButton
                            onClick={() => {
                                setOpen(true)
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

            <AddCategoryModal
                onClose={() => {
                    setOpen(false)
                }}
                isOpen={open}
                cookie={cookie}
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

                    .modal-button-container {
                        margin-top: 20px;
                        float: right;
                    }
                `}
            </style>
        </>
    )
}
