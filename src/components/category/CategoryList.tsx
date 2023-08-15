import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useState } from 'react'
import AddBoardModal from './modals/AddBoardModal'
import { useRouter } from 'next/router'
import SettingListModal from './modals/SettingListModal'

type CategoryItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
    boardCount: number
    boards: BoardItem[]
}

type BoardItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
    postCount: number
}

interface Props {
    list: CategoryItem[]
    isLogin: boolean
    setCategoryList: ([]: any) => void
}

export default function CategoryList({ list, isLogin, setCategoryList }: Props) {
    const [open, setOpen] = useState<{ [key: number]: boolean }>({}) // 상세 카테고리 열기

    const router = useRouter()

    const onNestedClick = (id: number) => {
        // 하위 카테고리 열기
        setOpen((prevOpen) => ({
            ...prevOpen,
            [id]: !prevOpen[id],
        }))
    }

    const onClickBoard = (id: number, title: string, childTitle: string) => {
        // 해당 카테고리 포스트 보러가기
        router.push(
            {
                pathname: `/category/${title}/${childTitle}`,
            },
            `/category/${title}/${childTitle}`,
            { shallow: true }
        )
    }

    return (
        <>
            {list.length !== 0 && (
                <List component="nav">
                    {list
                        .filter((item) => item.useState) // useState가 true인 카테고리만 불러옴
                        .map(({ id, title, boards, boardCount }) => {
                            const isOpen = open[id] || false
                            return (
                                <div key={id}>
                                    {/* 카테고리 목록*/}
                                    <div className="divWithAnimation">
                                        <ListItem
                                            key={id}
                                            disablePadding
                                            secondaryAction={
                                                // 게시판 설정, 추가 버튼
                                                <>
                                                    {isLogin && (
                                                        <div className="admin-settings">
                                                            <SettingListModal
                                                                list={boards}
                                                                setCategoryList={setCategoryList}
                                                                isCategory={false}
                                                            />
                                                            <AddBoardModal
                                                                categoyID={id}
                                                                categoryTitle={title}
                                                                setCategoryList={setCategoryList}
                                                            />
                                                        </div>
                                                    )}
                                                </>
                                            }>
                                            <ListItemButton
                                                key={id}
                                                sx={
                                                    isOpen // 카테고리 열면 배경색 추가
                                                        ? {
                                                              pl: 4,
                                                              backgroundColor: '#EFF2FB',
                                                              '&:hover': { color: 'rgb(21, 0, 255)' },
                                                          }
                                                        : { pl: 4, '&:hover': { color: 'rgb(21, 0, 255)' } }
                                                }
                                                onClick={() => onNestedClick(id)}>
                                                {/* 카테고리 제목 */}
                                                <ListItemText>
                                                    {title}
                                                    <div className="count-box">{'(' + boardCount + ')'}</div>
                                                </ListItemText>
                                                {boards?.length === 0 ? (
                                                    ''
                                                ) : isOpen ? (
                                                    <ExpandLess sx={{ marginRight: -4 }} />
                                                ) : (
                                                    <ExpandMore sx={{ marginRight: -4 }} />
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    </div>

                                    {/* 게시판 목록 */}
                                    {boards?.length !== 0 && (
                                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                            <List component="div" sx={{ marginLeft: 2 }}>
                                                {boards
                                                    ?.filter((item) => item.useState) // useState가 true인 게시판만 가져옴
                                                    .map(({ id: id, title: boardTitle, postCount }) => (
                                                        <ListItem key={id} disablePadding>
                                                            <ListItemButton
                                                                onClick={() => onClickBoard(id, title, boardTitle)}
                                                                key={id}
                                                                sx={{
                                                                    pl: 4,
                                                                    '&:hover': { color: 'rgb(21, 0, 255)' },
                                                                }}>
                                                                {/* 게시판 제목 */}
                                                                <ListItemText>
                                                                    {boardTitle}
                                                                    <div className="count-box">
                                                                        {'(' + postCount + ')'}
                                                                    </div>
                                                                </ListItemText>
                                                            </ListItemButton>
                                                        </ListItem>
                                                    ))}
                                            </List>
                                        </Collapse>
                                    )}
                                </div>
                            )
                        })}
                </List>
            )}

            <style jsx>{`
                .admin-settings {
                    display: flex;
                    margin-left: auto;
                    margin-right: 18px;
                }

                .count-box {
                    display: inline-block;
                    margin-left: 5px;
                    padding: 0px 5px 0px 5px;
                    font-size: 14px;
                    font-weight: 100;
                    color: blue;
                }

                /* .divWithAnimation 클래스는 hover시 애니메이션을 요소에 적용하는데 사용됩니다. */
                .divWithAnimation {
                    position: relative; /* 요소의 위치를 상대적으로 설정하여 ::before 가상 요소에 절대 위치를 설정합니다. */
                }

                .divWithAnimation:hover {
                    background-color: #eff2fb;
                }

                /* ::before 가상 요소를 사용하여 슬라이딩 애니메이션 효과를 생성합니다. */
                .divWithAnimation:hover::before {
                    content: ''; /* 가상 요소에 내용을 추가합니다. 여기서는 빈 문자열을 사용합니다. */
                    position: absolute; /* 가상 요소의 위치를 상위 요소 (.divWithAnimation)에 대해 절대 위치로 설정합니다. */
                    left: -100%; /* 가상 요소의 초기 위치를 상위 요소 왼쪽 경계 외부로 설정합니다. */
                    bottom: 0; /* 가상 요소를 상위 요소의 하단에 배치합니다. */
                    width: 100%; /* 가상 요소의 너비를 상위 요소의 너비와 같게 설정합니다. */
                    height: 2px; /* 수평 라인을 만들기 위해 가상 요소의 높이를 2px로 설정합니다. */
                    background-color: rgb(21, 0, 255); /* 가상 요소의 배경색을 설정합니다. */
                    animation: slideInAndOut 1s; /* 'slideInAndOut' 애니메이션을 1초 동안 가상 요소에 적용합니다. */
                }

                /* @keyframes 룰을 사용하여 애니메이션 동작을 정의합니다. */
                @keyframes slideInAndOut {
                    0% {
                        left: -100%; /* 애니메이션 시작 지점(0%)에서 가상 요소를 상위 요소 왼쪽 경계 외부로 위치시킵니다. */
                    }
                    100% {
                        left: 100%; /* 애니메이션 종료 지점(100%)에서 가상 요소를 상위 요소 오른쪽 경계 외부로 위치시킵니다. */
                    }
                }
            `}</style>
        </>
    )
}
