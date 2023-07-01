import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRef, useState } from 'react'
import { Cookies } from 'react-cookie'
import * as reissuance from "../../../function/reissuance";

interface Props {
    onClose: () => void
    isOpen: boolean
    userInfo: {
        email: string
        accessToken: string
        refreshToken: string
    }
    getCategories: () => void
}

export default function AddCategoryModal({ onClose, isOpen, userInfo, getCategories }: Props) {
    const [title, setTitle] = useState<string>('') // 카테고리명
    const titleRef = useRef() // 카테고리명 인풋창
    const newCookie = new Cookies()
    const style = {
        // 모달 창 스타일
        position: 'absolute' as 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '10px',
        p: 4,
    }

    const addCategory = async () => {
        try {
            const responce = await axios.post(
                '/api/categories',
                {
                    title: title,
                },
                {
                    headers: {
                        email: userInfo.email,
                        RefreshToken: userInfo.refreshToken,
                        AccessToken: userInfo.accessToken,
                    },
                }
            )

            reissuance.accToken(responce.headers['accesstoken']);

            getCategories();
            onClose();

        } catch (error: any) {
            alert(error.response.data);
        }
    }

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography sx={{ marginBottom: 3, fontSize: 20 }}>카테고리 추가</Typography>
                    <TextField
                        label="카테고리명"
                        id="standard-size-small"
                        size="small"
                        variant="standard"
                        fullWidth
                        sx={{ m: 1 }}
                        inputRef={titleRef}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                    <div className="modal-button-container">
                        <Button sx={{ marginRight: 2 }} onClick={() => onClose()} variant="outlined" size="small">
                            취소
                        </Button>
                        <Button
                            onClick={() => {
                                addCategory()
                            }}
                            variant="contained"
                            size="small">
                            추가
                        </Button>
                    </div>
                </Box>
            </Modal>

            <style jsx>
                {`
                    .modal-button-container {
                        margin-top: 20px;
                        float: right;
                    }
                `}
            </style>
        </>
    )
}
