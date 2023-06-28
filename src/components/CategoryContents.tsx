import SettingsIcon from '@mui/icons-material/Settings'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material'
import { useRef, useState } from 'react'

interface CategoryItem {
    key: string
    label: string
    items: CategoryItem[]
}

interface Props {
    isLogin: Boolean
    cookie: {
        email: string
        refToken: string
        accToken: string
    }
}

export default function CategoryContents({ isLogin, cookie: cookie }: Props) {
    const [open, setOpen] = useState<{ [key: string]: boolean }>({}) // 상세 카테고리 열기
    const [modalStatus, setModalStatus] = useState(false) // 모달 상태
    const modalOpen = () => setModalStatus(true) // 모달 열기
    const modalClose = () => setModalStatus(false) // 모달 닫기
    const [title, setTitle] = useState<string>('') // 카테고리명
    const titleRef = useRef() // 카테고리명 인풋창

    const lists: CategoryItem[] = [
        {
            key: 'Test1',
            label: 'Test1',
            items: [
                {
                    key: 'Sub1',
                    label: 'Sub1',
                    items: [],
                },
                {
                    key: 'Sub2',
                    label: 'Sub2',
                    items: [],
                },
            ],
        },
        {
            key: 'Test2',
            label: 'Test2',
            items: [
                {
                    key: 'Sub3',
                    label: 'Sub3',
                    items: [],
                },
            ],
        },
        {
            key: 'Test3',
            label: 'Test3',
            items: [],
        },
    ]

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

    const handleClick = (key: string) => () => {
        setOpen((prevOpen) => ({
            ...prevOpen,
            [key]: !prevOpen[key],
        }))
    }

    return (
        <>
            <List component="nav">
                {lists.map(({ key, label, items }) => {
                    const isOpen = open[key] || false
                    return (
                        <div key={key}>
                            <ListItemButton onClick={handleClick(key)}>
                                <ListItemText primary={label} />
                                {isLogin && (
                                    <div className="admin-settings">
                                        <IconButton
                                            color="primary"
                                            aria-label="menu"
                                            sx={{
                                                color: 'gray',
                                                '&:hover': { color: 'black' },
                                            }}>
                                            <SettingsIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                modalOpen()
                                            }}
                                            color="primary"
                                            aria-label="menu"
                                            sx={{
                                                color: 'gray',
                                                '&:hover': { color: 'black' },
                                            }}>
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                )}
                                {items.length === 0 ? '' : isOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                <List component="div">
                                    {items.map(({ key: childKey, label: childLabel }) => (
                                        <ListItem
                                            key={childKey}
                                            disablePadding
                                            secondaryAction={
                                                <>
                                                    {isLogin ? (
                                                        <IconButton
                                                            onClick={() => alert(childLabel + ' 설정')}
                                                            color="primary"
                                                            aria-label="menu"
                                                            sx={{
                                                                color: 'gray',
                                                                '&:hover': {
                                                                    color: 'black',
                                                                },
                                                            }}>
                                                            <SettingsIcon />
                                                        </IconButton>
                                                    ) : (
                                                        ''
                                                    )}
                                                </>
                                            }>
                                            <ListItemButton
                                                onClick={() => alert(childLabel)}
                                                key={childKey}
                                                sx={{ pl: 4 }}>
                                                <ListItemText primary={childLabel} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </div>
                    )
                })}
            </List>

            <Modal
                open={modalStatus}
                onClose={modalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography sx={{ marginBottom: 3 }}>게시판 추가</Typography>
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
                            onClick={() => setModalStatus(false)}
                            variant="outlined"
                            size="small">
                            취소
                        </Button>
                        <Button onClick={() => {}} variant="contained" size="small">
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
