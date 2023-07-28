import { Search } from '@mui/icons-material'
import { Box, IconButton, Modal, TextField, Tooltip, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function SearchModal() {
    const [search, setSearch] = useState<string>('') // 카테고리명
    const searchRef = useRef() // 검색 인풋창
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const router = useRouter()

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

    const handleSearch = (event: any) => {
        if (event.key === 'Enter') {
            router.push(`/search/${search}`)
            handleClose()
        }
    }

    return (
        <>
            <Tooltip title="검색" disableInteractive placement="bottom" arrow>
                <IconButton aria-label="search" color="primary" onClick={handleOpen}>
                    <Search />
                </IconButton>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography sx={{ marginBottom: 3, fontSize: 20 }}>게시글 검색</Typography>
                    <TextField
                        id="standard-size-small"
                        size="small"
                        variant="standard"
                        placeholder="제목 또는 내용을 입력해주세요"
                        fullWidth
                        sx={{ m: 1 }}
                        inputRef={searchRef}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        onKeyPress={handleSearch}
                    />
                </Box>
            </Modal>
        </>
    )
}
