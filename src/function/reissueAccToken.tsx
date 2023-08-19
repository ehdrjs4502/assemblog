import axios from 'axios'
import { Cookies } from 'react-cookie'

const reissueAccToken = async () => {
    const cookie = new Cookies()
    const response = await axios.get('/server/refresh', {
        headers: {
            'ngrok-skip-browser-warning': '1234',
            Authorization: `Bearer ${cookie.get('refreshToken')}`,
        },
    })

    cookie.set('accessToken', response.data.access_token, {
        path: '/',
        secure: true,
    })

    cookie.set('refreshToken', response.data.refresh_token, {
        path: '/',
        secure: true,
    })
}

export default reissueAccToken
