import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Modal,
    TextField,
    Typography,
    IconButton,
    Tooltip,
} from '@mui/material'
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import reissueAccToken from '@/function/reissueAccToken'
import { EditNote, Delete } from '@mui/icons-material'
import { getCategoryList } from '@/function/getCategory'
import { Cookies } from 'react-cookie'

interface Props {
    itemID: number
    itemTitle: string
    itemOrderNum: number
    setCategoryList: ([]: any) => void
    isCategory: boolean
}

export default function SettingCategoryModal({ itemID, itemTitle, itemOrderNum, setCategoryList, isCategory }: Props) {
    const [title, setTitle] = useState<string>('') // 카테고리명
    const titleRef = useRef() // 카테고리명 인풋창
    const [isChecked, setIsChecked] = useState<boolean>(true) // 숨기기 여부
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const cookie = new Cookies()

    useEffect(() => {
        // 모달창 열렸을 때 초기값 설정
        setTitle(itemTitle)
        setIsChecked(true)
    }, [open])

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

    //카테고리, 게시판 수정하는 함수
    const onClickModifyBtn = async () => {
        let isSuccess = false
        const endpoint = isCategory ? 'categories' : 'boards'
        console.log(isChecked, title, itemID, endpoint)
        try {
            const response = await axios.patch(
                `/server/api/${endpoint}`,
                [
                    {
                        id: itemID,
                        title: title,
                        useState: isChecked,
                        orderNum: itemOrderNum,
                    },
                ],
                {
                    headers: {
                        Authorization: `Bearer ${cookie.get('accessToken')}`,
                    },
                }
            )
            console.log(response)

            const list = await getCategoryList() // 카테고리 가져오는 함수
            setCategoryList(list)
            handleClose()
            isSuccess = true
        } catch (error: any) {
            console.log(error)
            if (error.response.status === 401) {
                await reissueAccToken()
                !isSuccess && onClickModifyBtn()
            }
        }
    }

    return (
        <>
            <Tooltip title="수정" disableInteractive placement="top" arrow>
                <IconButton onClick={handleOpen} sx={{ color: 'blue' }}>
                    <EditNote />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography sx={{ marginBottom: 3, fontSize: 20 }}>
                        {isCategory ? '카테고리 수정' : '게시판 수정'}
                    </Typography>
                    <TextField
                        label={isCategory ? '카테고리 이름' : '게시판 이름'}
                        id="standard-size-small"
                        size="small"
                        variant="standard"
                        defaultValue={itemTitle}
                        fullWidth
                        sx={{ m: 1 }}
                        inputRef={titleRef}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                    <FormControlLabel
                        sx={{ marginLeft: 1, marginTop: 3 }}
                        value="start"
                        control={
                            <Checkbox
                                onChange={(e) => {
                                    setIsChecked(!e.target.checked)
                                    console.log(isChecked)
                                }}
                            />
                        }
                        label={isCategory ? '카테고리 숨기기' : '게시판 숨기기'}
                        labelPlacement="start"
                    />
                    <div className="modal-button-container">
                        <Button sx={{ marginRight: 2 }} onClick={() => handleClose()} variant="outlined" size="small">
                            취소
                        </Button>
                        <Button
                            onClick={() => {
                                onClickModifyBtn()
                            }}
                            variant="contained"
                            size="small">
                            완료
                        </Button>
                    </div>
                </Box>
            </Modal>

            <style jsx>
                {`
                    .modal-button-container {
                        margin-top: 120px;
                        float: right;
                    }
                `}
            </style>
        </>
    )
}
