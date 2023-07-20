import { Box, Button, Modal, IconButton, Tooltip } from '@mui/material'
import { Settings } from '@mui/icons-material'
import HideList from './HideList'
import { useState } from 'react'
import ActiveList from './ActiveList'

interface Props {
    list: any
    setCategoryList: ([]: any) => void
    isCategory: boolean
}

export default function SettingCateogryListModal({ list, setCategoryList, isCategory }: Props) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const style: any = {
        position: 'fixed',
        top: -100,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const modalContentStyle = {
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '10px',
        p: 4,
    }
    
    return (
        <>
            <div>
                <IconButton
                    onClick={handleOpen}
                    sx={{
                        color: 'gray',
                        '&:hover': {
                            color: 'tomato',
                        },
                    }}>
                    <Settings />
                </IconButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <div style={style}>
                        <Box sx={modalContentStyle}>
                            <h3>{isCategory ? '카테고리 목록 설정' : '게시판 목록 설정'}</h3>
                            <ActiveList list={list} setCategoryList={setCategoryList} isCategory={isCategory} />
                            <HideList list={list} setCategoryList={setCategoryList} isCategory={isCategory} />
                            <div className="btn-box">
                                <Button onClick={() => handleClose()} variant="outlined" size="small">
                                    닫기
                                </Button>
                            </div>
                        </Box>
                    </div>
                </Modal>
            </div>
            <style jsx>
                {`
                    .modal-button-container {
                        margin-top: 120px;
                        float: right;
                    }

                    h3 {
                        margin-bottom: 30px;
                    }

                    .btn-box {
                        position: 'absolute';
                        float: right;
                        margin-top: 10px;
                        margin-right: 15px;
                    }
                `}
            </style>
        </>
    )
}
