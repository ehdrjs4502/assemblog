import { IconButton, Tooltip } from '@mui/material'
import { Clear } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { getCategoryList } from '@/function/getCategory'
import reissueAccToken from '@/function/reissueAccToken'

interface Props {
    itemID: number
    setCategoryList: ([]: any) => void
    isCategory: boolean
}

export default function DelBtn({ itemID, setCategoryList, isCategory }: Props) {
    const cookie = new Cookies()

    //카테고리, 게시판 삭제하는 함수
    const onClickDelBtn = async () => {
        console.log(itemID)
        const endpoint = isCategory ? 'categories' : 'boards';
        console.log(endpoint)
        let isSuccess = false
        try {
            const response = await axios.delete(`/server/api/${endpoint}/${itemID}`, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`,
                },
            })

            const list = await getCategoryList() // 카테고리 가져오는 함수
            setCategoryList(list)
            isSuccess = true
        } catch (error: any) {
            await reissueAccToken()
            !isSuccess && onClickDelBtn()
        }
    }

    return (
        <>
            <Tooltip title="삭제" disableInteractive placement="top" arrow>
                <IconButton
                    onClick={() => {
                        if (confirm('정말로 삭제하시겠습니까?') == true) {
                            onClickDelBtn()
                        }
                    }}
                    sx={{ color: 'red' }}>
                    <Clear />
                </IconButton>
            </Tooltip>
        </>
    )
}