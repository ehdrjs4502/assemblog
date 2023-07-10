import axios from 'axios'

// api 요청해서 댓글 리스트 불러오는 함수
export const getComment = async (postId: number) => {
    try {
        const response = await axios.get(`/server/lists/comments?postId=${postId}`, {
            headers: {
                'ngrok-skip-browser-warning': '1234',
            },
        })
        return response.data.commentList // 카테고리 리스트를 리턴
    } catch (error) {
        console.log(error)
        return []
    }
}

export default { getComment }
