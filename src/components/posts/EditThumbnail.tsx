import { ChangeEvent } from "react"

interface Props {
    inputRef: React.RefObject<HTMLInputElement>,
    handleImageUpload: (e: ChangeEvent<HTMLInputElement>, isThumbnail: boolean) => void,
    handleImageBtnClick: (isThumbnail: boolean) => void,
}

export default function EditThumbnail({inputRef, handleImageUpload, handleImageBtnClick}: Props) {
    return (
        <div>
            <input type="file" style={{ display: 'none' }} ref={inputRef} onChange={(e) => handleImageUpload(e, true)} />
            <button type="button" onClick={() => handleImageBtnClick(true)}>
                썸네일 지정
            </button>
        </div>
    )
}