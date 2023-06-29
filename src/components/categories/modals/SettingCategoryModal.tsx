import { Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import { Cookies } from 'react-cookie'
import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
    onClose: () => void
    isOpen: boolean
    categoryID: string
    categoryTitle: string
    categoryOrderNum: number
    cookie: {
        email: string
        refToken: string
        accToken: string
    }
    getCategories: () => void
}

export default function SettingCategoryModal({ onClose, isOpen, categoryID, categoryTitle, categoryOrderNum, cookie: cookie, getCategories }: Props) {
    const [title, setTitle] = useState<string>(''); // 카테고리명
    const titleRef = useRef(); // 카테고리명 인풋창
    const newCookie = new Cookies();
    const [isChecked, setIsChecked] = useState<boolean>(true);

    useEffect(() => { // 모달창 열렸을 때 초기값 설정
        setTitle(categoryTitle);
        setIsChecked(true);
    },[isOpen]);
    

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

    //카테고리 수정하는 함수
    const modifyCategory = async () => {
        console.log(title, categoryID, isChecked);
        try {
            const responce = await axios.patch(
                `/api/categories`,
                {
                    id: categoryID,
                    title: title,
                    useState: isChecked,
                    orderNum: categoryOrderNum,
                },
                {
                    headers: {
                        email: cookie['email'],
                        RefreshToken: cookie['refToken'],
                        AccessToken: cookie['accToken'],
                    },
                }
            )

            if (responce.headers['accesstoken'] !== undefined) {
                // 액세스 토큰 만료되면 재발급
                newCookie.set('accessToken', responce.headers['accesstoken'], {
                    path: '/',
                    secure: true,
                })
            }

            console.log(responce);

            getCategories();
            onClose();

        } catch (error: any) {
            alert(error.response.data);
        }
    }

    //카테고리 삭제하는 함수
    const delCategory = async () => {
        try {
            const responce = await axios.delete(
                `/api/categories/${categoryID}`,
                {
                    headers: {
                        email: cookie['email'],
                        RefreshToken: cookie['refToken'],
                        AccessToken: cookie['accToken'],
                    },
                }
            )

            if (responce.headers['accesstoken'] !== undefined) {
                // 액세스 토큰 만료되면 재발급
                newCookie.set('accessToken', responce.headers['accesstoken'], {
                    path: '/',
                    secure: true,
                })
            }

            getCategories();

        } catch (error: any) {
            alert(error);
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
                    <Typography sx={{ marginBottom: 3, fontSize: 20 }}>카테고리 설정</Typography>
                    <TextField
                        label="카테고리명"
                        id="standard-size-small"
                        size="small"
                        variant="standard"
                        defaultValue={categoryTitle}
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
                                }}
                            />
                        }
                        label="카테고리 숨기기"
                        labelPlacement="start"
                    />
                    <div className="modal-button-container">
                        <Button
                            onClick={() => {
                                if(confirm("정말로 삭제하시겠습니까?") == true) {
                                    delCategory();
                                    onClose();
                                }
                            }}
                            sx={{ marginRight: 2 }}
                            color="error"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            size="small">
                            삭제
                        </Button>
                        <Button sx={{ marginRight: 2 }} onClick={() => onClose()} variant="outlined" size="small">
                            취소
                        </Button>
                        <Button
                            onClick={() => {
                                modifyCategory();
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
