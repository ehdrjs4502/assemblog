import Image from 'next/image'
interface Props {
    bgImgURL: string
}

export default function BackgroundImg({ bgImgURL }: Props) {
    return (
        <>
            <div className="background-image">
                <Image src={bgImgURL} alt="bgImg" layout="fill" objectFit={'cover'} priority={true} />
            </div>
            <style jsx>{`
                .background-image {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    filter: brightness(30%);
                    background-color: rgb(255, 255, 255);
                    z-index: -1;
                }

                .background-image img {
                    width: 100%;
                    height: 100%;
                    background-image: inherit;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                }
            `}</style>
        </>
    )
}
