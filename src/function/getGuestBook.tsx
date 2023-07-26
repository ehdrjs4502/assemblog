import axios from 'axios'

// api 요청해서 댓글 리스트 불러오는 함수
export const getGuestBook = async () => {
    try {
        const response = await axios.get(`/server/lists/guestbooks`, {
            headers: {
                'ngrok-skip-browser-warning': '1234',
            },
        })
        console.log(response)
        return response.data // 방명록 리스트를 리턴
    } catch (error) {
        console.log(error)
        return []
    }
}

export default { getComment: getGuestBook }
