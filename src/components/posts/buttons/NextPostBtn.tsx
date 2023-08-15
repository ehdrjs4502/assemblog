import { ArrowForwardIos } from '@mui/icons-material'
import { useRouter } from 'next/dist/client/router'

export default function NextPostBtn({ nextPost }: any) {
    const router = useRouter()
    const onClickPost = (postID: number) => {
        router.push({
            pathname: `/post/${postID}`,
        })
    }

    return (
        <>
            {nextPost === null ? (
                ''
            ) : (
                <button
                    className="next-btn"
                    onClick={() => {
                        onClickPost(nextPost.postId)
                    }}>
                    <div className="post-navigation">
                        <span className="label">다음 게시글</span>
                        <span className="title">{nextPost !== undefined && nextPost.title}</span>
                    </div>
                    <ArrowForwardIos />
                </button>
            )}

            <style jsx>{`
                .next-btn {
                    width: 45%;
                    display: flex;
                    align-items: center;
                    background-color: gray;
                    position: relative;
                    padding: 20px 10px 20px 10px;
                    border: none;
                    color: white;
                    border-radius: 10px;
                    box-shadow: -5px 5px 2px rgb(213, 213, 213);
                    text-align: end;
                    margin-left: auto;
                    justify-content: flex-end;
                    word-wrap: break-word;
                    transition: transform 0.3s ease;
                    background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)),
                        url(${nextPost?.thumbnail});
                    background-size: cover;
                    background-position: center;
                }

                .next-btn div {
                    align-items: flex-end;
                    margin-right: 10px;
                }

                .next-btn:hover {
                    cursor: pointer;
                    transform: scale(1.015);
                }

                .post-navigation {
                    display: flex;
                    flex-direction: column;
                }

                .label {
                    font-size: 12px;
                    margin-bottom: 5px;
                }

                .title {
                    font-size: 18px;
                    font-weight: bold;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                @media (max-width: 950px) {
                    .next-btn {
                        width: 40%;
                    }

                    .label {
                        font-size: 8px;
                    }

                    .title {
                        font-size: 10px;
                        display: inline-block;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        width: 75px;
                    }
                }
            `}</style>
        </>
    )
}
