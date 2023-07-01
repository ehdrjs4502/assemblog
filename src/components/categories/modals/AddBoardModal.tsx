import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useRef, useState } from "react"
import { Cookies } from "react-cookie"

interface Props {
    onClose: () => void,
    isOpen: boolean,
    categoyID: string,
    categoryTitle: string,
    userInfo: {
        email: string
        accessToken: string
        refreshToken: string
    },

    getCategories: () => void
}

export default function AddBoardModal({ onClose, isOpen, categoyID, categoryTitle, userInfo, getCategories }:Props) {
    const [title, setTitle] = useState<string>('') // 게시판명
    const titleRef = useRef() // 게시판명 인풋창
    const newCookie = new Cookies();

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

    const addBoard = async () => {
        console.log(categoyID, title);
        try {
            const responce = await axios.post(
                'api/boards',
                {
                    parentId: categoyID,
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

            if (responce.headers['accesstoken'] !== undefined) {
                // 액세스 토큰 만료되면 재발급
                newCookie.set('accessToken', responce.headers['accesstoken'], {
                    path: '/',
                    secure: true,
                })

            }

            console.log(responce);

            if (responce.data === 'Duplicate category title') {
                alert('이미 추가된 게시판입니다.')
            } else {
                getCategories();
                onClose();
            }
        } catch (error: any) {
            alert(error.response.data.message)
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
                    <Typography sx={{ marginBottom: 3, fontSize: 20 }}>{categoryTitle} 게시판 추가</Typography>
                    <TextField
                        label="게시판명"
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
                        <Button
                            sx={{ marginRight: 2 }}
                            onClick={() => onClose()}
                            variant="outlined"
                            size="small">
                            취소
                        </Button>
                        <Button onClick={() => {addBoard()}} variant="contained" size="small">
                            추가
                        </Button>
                    </div>
                </Box>
            </Modal>

            <style jsx>{`
                .modal-button-container {
                    margin-top: 20px;
                    float: right;
                }
            `}</style>
        </>
    )
}