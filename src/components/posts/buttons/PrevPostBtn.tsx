import { ArrowBackIosNew } from '@mui/icons-material'
import { useRouter } from 'next/dist/client/router'

export default function PrevPostBtn({ prevPost }: any) {
    const router = useRouter()
    const onClickPost = (postID: number) => {
        router.push({
            pathname: `/post/${postID}`,
        })
    }

    return (
        <>
            {prevPost === null ? (
                ''
            ) : (
                <button
                    className="prev-btn"
                    onClick={() => {
                        onClickPost(prevPost.postId)
                    }}>
                    <ArrowBackIosNew />
                    <div className="post-navigation">
                        <span className="label">이전 게시글</span>
                        <span className="title">{prevPost !== undefined && prevPost.title}</span>
                    </div>
                </button>
            )}

            <style jsx>{`
                .prev-btn {
                    width: 45%;
                    display: flex;
                    align-items: center;
                    background-color: gray;
                    position: relative;
                    padding: 20px 10px 20px 10px;
                    border-radius: 10px;
                    box-shadow: 5px 5px 2px rgb(213, 213, 213);
                    border: none;
                    color: white;
                    word-wrap: break-word;
                    transition: transform 0.3s ease;
                    background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)),
                        url(${prevPost?.thumbnail});
                    background-size: cover;
                    background-position: center;
                }

                .prev-btn div {
                    margin-left: 10px;
                }

                .prev-btn:hover {
                    cursor: pointer;
                    transform: scale(1.015);
                }

                .post-navigation {
                    display: flex;
                    flex-direction: column;
                }

                .label {
                    font-size: 12px;
                }

                .title {
                    font-size: 18px;
                    font-weight: bold;
                }

                @media (max-width: 950px) {
                    .prev-btn {
                        width: 40%;
                    }

                    .label {
                        font-size: 8px;
                    }

                    .title {
                        font-size: 12px;
                    }
                }
            `}</style>
        </>
    )
}
