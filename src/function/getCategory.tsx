import axios from 'axios'

// api 요청해서 카테고리 리스트 불러오는 함수
export const getCategoryList = async () => {
    try {
        const response = await axios.get('/server/categories', {
            headers: {
                'ngrok-skip-browser-warning': '1234',
            },
        })

        return response.data // 카테고리 리스트를 리턴
    } catch (error) {
        console.log(error)
        return []
    }
}

export default { getCategoryList }
