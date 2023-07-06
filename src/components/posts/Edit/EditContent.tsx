import MDEditor, { commands } from '@uiw/react-md-editor'
import { ChangeEvent } from 'react'

interface Props {
    content: any,
    setContent: (content: any) => void,
    inputRef: React.RefObject<HTMLInputElement>,
    handleImageUpload: (e: ChangeEvent<HTMLInputElement>, isThumbnail: boolean) => void,
    handleImageBtnClick: (isThumbnail: boolean) => void,
}


export default function EditContent({content, setContent, inputRef, handleImageUpload, handleImageBtnClick}: Props) {
    const custumCommands = commands.getCommands().filter((e) => e.name !== 'image') // 기존 이미지 버튼 삭제
    const imageToolbar = {
        // 이미지 툴바 생성
        name: 'image',
        groupName: 'image',
        // 아이콘 모양
        icon: (
            <svg viewBox="0 0 16 16" width="12px" height="12px">
                <path
                    d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
                    fill="currentColor"
                />
            </svg>
        ),
        children: (handle: any) => {
            // 클릭시 나올 요소
            return (
                <div style={{ width: 120, padding: 10 }}>
                    <input type="file" style={{ display: 'none' }} ref={inputRef} onChange={(e) => handleImageUpload(e, false)} />
                    <button type="button" onClick={() => handleImageBtnClick(false)}>
                        이미지 선택
                    </button>
                </div>
            )
        },
        buttonProps: { 'aria-label': 'Insert title' },
    }

    return (
        <MDEditor
            value={content}
            onChange={setContent}
            height={500}
            textareaProps={{
                placeholder: '내용을 입력하세요',
            }}
            commands={[
                // 툴바 설정
                ...custumCommands,
                commands.group([], imageToolbar),
            ]}
        />
    )
}