import { Box, Button, Modal, IconButton } from '@mui/material'
import { Settings } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import reissueAccToken from '@/function/reissueAccToken'

type CategoryItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
    boards: BoardItem[]
}

type BoardItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
}

interface Props {
    list: CategoryItem[]
    setCategoryList: ([]: any) => void
}

export default function SettingCateogryListModal({ list, setCategoryList }: Props) {
    const [itemList, setItemList] = useState<any>()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const cookie = new Cookies()

    const style: any = {
        position: 'fixed',
        top: 0,
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

    const handleChange = (result: any) => {
        if (!result.destination) return
        const items = [...itemList]
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        for (let i = 0; i < items.length; i++) {
            items[i].orderNum = i + 1
        }
        setItemList(items)
    }

    useEffect(() => {
        list = list.filter((a) => a.useState === true) // 숨기지 않은 카테고리만 가져오기
        console.log(list)
        setItemList(list)
    }, [])

    // 저장 버튼 눌렀을 시
    const onClickModifyBtn = async () => {
        let isSuccess = false
        try {
            const response = await axios.patch('/server/api/categories', itemList, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`,
                },
            })

            console.log(response)
            setCategoryList(itemList)
            isSuccess = true
        } catch (error) {
            console.log(error)
            await reissueAccToken()
            // !isSuccess && onClickModifyBtn()
        }
    }

    return (
        <>
            <div>
                <IconButton onClick={handleOpen}>
                    <Settings />
                </IconButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <div style={style}>
                        <Box sx={modalContentStyle}>
                            <h4>카테고리 목록 설정</h4>
                            <DragDropContext onDragEnd={handleChange}>
                                <Droppable droppableId="cardlists">
                                    {(provided) => (
                                        <div className="cardlists" {...provided.droppableProps} ref={provided.innerRef}>
                                            {itemList.map((item: any, i: number) => (
                                                <Draggable
                                                    draggableId={`test-${item.id}`}
                                                    index={i}
                                                    key={`test-${item.id}`}>
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                ref={provided.innerRef}>
                                                                <span>{i + 1}. </span>
                                                                <span>{item.title}</span>
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <Button
                                sx={{ marginRight: 2 }}
                                onClick={() => handleClose()}
                                variant="outlined"
                                size="small">
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
                `}
            </style>
        </>
    )
}
