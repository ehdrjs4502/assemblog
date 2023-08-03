interface Props {
    bgImgURL: string
}

export default function BackgroundImg({ bgImgURL }: Props) {
    return (
        <>
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${bgImgURL})`,
                }}
            />
            <style jsx>{`
                .background-image::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: inherit;
                    background-repeat: no-repeat;
                    background-size: cover;
                    filter: brightness(15%);
                    z-index: -1; /* 가상 요소를 내용 뒤에 배치하도록 z-index를 설정합니다 */
                }
            `}</style>
        </>
    )
}
