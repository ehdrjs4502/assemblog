import { useRef, useState, ChangeEvent, KeyboardEvent } from 'react'

interface Props {
    tagList: string[]
    setTagList: (tagList: string[]) => void
}

export default function EditTag({ tagList, setTagList }: Props) {
    const [tagItem, setTagItem] = useState<string>('')
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleClick = () => { // 태그 박스 눌렀을 때 태그 입력할 수 있도록
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => { // 태그 입력시 
        if (e.target instanceof HTMLInputElement && e.target.value.length !== 0 && e.key === 'Enter') {
            addTagItem()
        }
    }

    const addTagItem = () => { // 태그 생성
        if(tagList.length >= 20) {
            alert('태그는 최대 20개까지 생성 가능합니다.')
        } else {
            const updatedTagList: string[] = [...tagList, tagItem]
            setTagList(updatedTagList)
            setTagItem('')
        }
        
    }

    const deleteTagItem = (e: React.MouseEvent<HTMLButtonElement>) => { // 태그 삭제
        if (e.currentTarget.parentElement) {
            const deleteTagItem = e.currentTarget.parentElement.firstChild?.textContent
            if (deleteTagItem) {
                const filteredTagList = tagList.filter((tagItem) => tagItem !== deleteTagItem)
                setTagList(filteredTagList)
            }
        }
    }
    return (
        <>
            <div className="box" onClick={handleClick}>
                <div className="tag-box">
                    {tagList.map((tagItem: any, index: any) => {
                        return (
                            <div className="tag-item" key={index}>
                                <span className="text">{tagItem}</span>
                                <button className="del-btn" onClick={deleteTagItem}>
                                    X
                                </button>
                            </div>
                        )
                    })}
                    <input
                        ref={inputRef}
                        placeholder="태그 추가"
                        className="tag-input"
                        type="text"
                        tabIndex={2}
                        onChange={(e: any) => setTagItem(e.target.value)}
                        value={tagItem}
                        onKeyPress={onKeyPress}
                    />
                </div>
            </div>

            <style jsx>{`
                .box {
                }

                .tag-box {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    min-height: 50px;
                    margin-top: 10px;
                    padding: 0 10px;
                    border: 1px solid rgba(0, 0, 0, 0.3);
                    border-radius: 10px;

                    &:focus-within {
                        border-color: rgb(71, 132, 255);
                    }
                }

                .tag-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin: 5px;
                    padding: 5px;
                    background-color: rgb(65, 87, 252);
                    border-radius: 5px;
                    color: white;
                    font-size: 13px;
                }

                .del-btn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 15px;
                    height: 15px;
                    margin-left: 5px;
                    border: 0;
                    background-color: transparent;
                    color: red;
                }

                .del-btn:hover {
                    cursor: pointer;
                }

                .tag-input {
                    display: inline-flex;
                    min-width: 100px;
                    background: transparent;
                    border: none;
                    outline: none;
                    cursor: text;
                }
            `}</style>
        </>
    )
}
