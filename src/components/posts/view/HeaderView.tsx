import { useRouter } from 'next/router'

interface Props {
    data: {
        title: string
        writer: string
        date: string
        boradTitle: string
        categoryTitle: string
        thumbnail: string
        viewCount: number
    }
}

export default function ViewTitle({ data }: Props) {
    const router = useRouter()
    const date = new Date(data.date)
    const formattedDate = `${date.getFullYear()}. ${
        // yyyy. MM. dd. hh:mm 으로 데이터 포맷하기
        date.getMonth() + 1
    }. ${date.getDate()}. ${date.getHours()}:${date.getMinutes()}`

    const onClickCategory = (category: string, board: string) => {
        // 해당 카테고리 포스트 보러가기
        router.push({
            pathname: `/category/${category}/${board}`,
        })
    }

    return (
        <>
            <div className="header-box">
                <div className="thumbnail-box">
                    <img src={data.thumbnail} alt="헤더 이미지" />
                </div>
                <div className="box">
                    <div className="category-box" onClick={() => onClickCategory(data.categoryTitle, data.boradTitle)}>
                        <span>
                            {data.categoryTitle} / {data.boradTitle}
                        </span>
                    </div>
                    <div className="title-box">
                        <span>{data.title}</span>
                    </div>
                    <div className="post-info-box">
                        <span>작성자 : {data.writer}</span>
                        <span>작성일 : {formattedDate}</span>
                        <span>조회수 : {data.viewCount}</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .header-box {
                    width: 100%;
                    margin: 10px auto;
                    position: relative;
                    margin-bottom: 60px;
                    margin: 0;
                }

                .thumbnail-box {
                    width: 100%;
                    height: 500px;
                    background-color: gray;
                }

                .thumbnail-box img {
                    width: 100%;
                    height: 500px;
                    vertical-align: middle;
                    filter: brightness(65%);
                }

                .box {
                    position: absolute;
                    top: 55%;
                    left: 50%;
                    width: 100%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    font-weight: bold;
                }

                .category-box {
                    display: inline-block;
                    background-color: tomato;
                    padding: 10px;
                    border-radius: 15px;
                    color: whitesmoke;
                }

                .category-box:hover {
                    cursor: pointer;
                    background-color: rgb(255, 38, 0);
                }

                .title-box {
                    font-size: 50px;
                    margin-top: 40px;
                    margin-bottom: 50px;
                    color: whitesmoke;
                }

                .post-info-box span {
                    color: whitesmoke;
                    margin: 15px;
                }

                @media (max-width: 950px) {
                    .thumbnail-box {
                        width: 100%;
                        height: 350px;
                        background-color: gray;
                    }

                    .thumbnail-box img {
                        width: 100%;
                        height: 350px;
                        vertical-align: middle;
                        filter: brightness(65%);
                    }
                }
            `}</style>
        </>
    )
}
