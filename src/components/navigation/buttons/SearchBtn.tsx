import { Search, Clear } from '@mui/icons-material'
import { IconButton, TextField, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

interface Props {
    isScrollPastContentTop: boolean
}

export default function SearchBtn({ isScrollPastContentTop }: Props) {
    const [search, setSearch] = useState<string>('') // 카테고리명
    const [isTextFieldVisible, setTextFieldVisible] = useState<boolean>(false) // 텍스트 필드의 가시성 상태를 관리
    const searchRef = useRef<HTMLInputElement>(null) // 검색 인풋창
    const router = useRouter()

    const handleSearch = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setTextFieldVisible(false)
            router.push(`/search/${search}`)
        }
    }

    // 아이콘 버튼을 클릭하여 텍스트 필드를 나타내거나 숨김
    const toggleTextField = () => {
        setTextFieldVisible((prev) => !prev)
    }

    useEffect(() => {
        // 텍스트 필드가 나타난 후에 포커스를 줌
        if (isTextFieldVisible) {
            searchRef.current?.focus()
        }
    }, [isTextFieldVisible])

    return (
        <>
            <div className={`search-box ${isTextFieldVisible ? 'visible' : 'hidden'}`}>
                {isTextFieldVisible && (
                    <TextField
                        id="standard-size-small"
                        size="small"
                        variant="standard"
                        placeholder="Search..."
                        fullWidth
                        sx={{ m: 1, input: { color: isScrollPastContentTop ? 'black' : 'white' } }}
                        inputRef={searchRef}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        onKeyPress={handleSearch}
                    />
                )}
            </div>
            <Tooltip title="검색" disableInteractive placement="bottom" arrow>
                <IconButton aria-label="search" color="primary" onClick={toggleTextField}>
                    {isTextFieldVisible ? <Clear /> : <Search />}
                </IconButton>
            </Tooltip>

            <style jsx>{`
                .search-box {
                    display: flex;
                    align-items: center;
                    transition: all 3s ease-in-out;
                }
            `}</style>
        </>
    )
}
