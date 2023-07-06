import { ChangeEvent } from 'react'
import Image from 'next/image'

interface Props {
    thumbnail: string
    inputRef: React.RefObject<HTMLInputElement>
    handleImageUpload: (e: ChangeEvent<HTMLInputElement>, isThumbnail: boolean) => void
    handleImageBtnClick: (isThumbnail: boolean) => void
}

export default function EditThumbnail({ thumbnail, inputRef, handleImageUpload, handleImageBtnClick }: Props) {
    return (
        <div>
            <input
                type="file"
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={(e) => handleImageUpload(e, true)}
            />
            <button className='thumbnail-btn' type="button" onClick={() => handleImageBtnClick(true)}>
                <Image src={thumbnail} width={150} height={150} alt="썸네일 이미지" />
            </button>

            <style jsx>{`
                .thumbnail-btn {
                    background-color: transparent;
                    border: 1px solid black;
                }    
                
                .thumbnail-btn:hover {
                    cursor: pointer;
                    border: 1px solid rgb(43, 0, 255);
                }
            `}</style>
        </div>
    )
}
