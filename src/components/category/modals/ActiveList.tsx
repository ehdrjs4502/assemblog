import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import DelBtn from './buttons/DelBtn'
import SettingModal from './ModifyModal'
import { List, ListItem, ListItemText, Tooltip } from '@mui/material'
// import axios from 'axios'
import reissueAccToken from '@/function/reissueAccToken'
import { Cookies } from 'react-cookie'
import { getCategoryList } from '@/function/getCategory'

interface Props {
    list: any[]
    setCategoryList: ([]: any) => void
    isCategory: boolean
}

export default function ActiveList({ list, setCategoryList, isCategory }: Props) {
    const [activeList, setActiveList] = useState<any>([])
    const cookie = new Cookies()

    useEffect(() => {
        setActiveList(list.filter((item) => item.useState === true)) // 숨기지 않은 카테고리 가져오기
    }, [list])

    // 바뀐 리스트 설정
    // const changeList = async () => {
    //     const endpoint = isCategory ? 'categories' : 'boards'
    //     let isSuccess = false
    //     try {
    //         const response = await axios.patch(`/server/api/${endpoint}`, activeList, {
    //             headers: {
    //                 Authorization: `Bearer ${cookie.get('accessToken')}`,
    //             },
    //         })

    //         const list = await getCategoryList() // 카테고리 가져오는 함수
    //         setCategoryList(list)
    //         isSuccess = true
    //     } catch (error: any) {
    //         if (error.response.status === 401) {
    //             await reissueAccToken()
    //             !isSuccess && changeList()
    //         }
    //     }
    // }

    //드래그로 리스트 바꿨을 때
    const handleChange = (result: any) => {
        if (!result.destination) return
        const items = [...activeList]
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        for (let i = 0; i < items.length; i++) {
            items[i].orderNum = i + 1
        }
        setActiveList(items)
        // changeList()
    }

    return (
        <>
            <span>{isCategory ? '사용중인 카테고리 목록' : '사용중인 게시판 목록'}</span>
            {activeList?.length === 0 && (
                <div>
                    <ListItem>
                        <ListItemText primary="없당" />
                    </ListItem>
                </div>
            )}
            <DragDropContext onDragEnd={handleChange}>
                <Droppable droppableId="cardlists">
                    {(provided) => (
                        <List
                            className="cardlists"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={{ marginBottom: '20px' }}>
                            {activeList?.map((item: any, idx: number) => (
                                <Draggable draggableId={`test-${item.id}`} index={idx} key={`test-${item.id}`}>
                                    {(provided, snapshot) => {
                                        return (
                                            <ListItem
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}>
                                                <Tooltip
                                                    title="드래그로 순서를 정할 수 있어요"
                                                    disableInteractive
                                                    placement="left"
                                                    arrow>
                                                    <ListItemText primary={`${idx + 1}. ${item.title}`} />
                                                </Tooltip>
                                                <DelBtn
                                                    itemID={item.id}
                                                    setCategoryList={setCategoryList}
                                                    isCategory={isCategory}
                                                />
                                                <SettingModal
                                                    itemID={item.id}
                                                    itemTitle={item.title}
                                                    itemOrderNum={item.orderNum}
                                                    setCategoryList={setCategoryList}
                                                    isCategory={isCategory}
                                                />
                                            </ListItem>
                                        )
                                    }}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>

            <style jsx>
                {`
                    span {
                        margin-top: 30px;
                        font-weight: bold;
                    }
                `}
            </style>
        </>
    )
}
