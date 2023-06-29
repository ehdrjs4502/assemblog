import { Cookies } from "react-cookie"

export function accToken(accToken: string) {
    const newCookie = new Cookies();

    if (accToken !== undefined) {
        // 액세스 토큰 만료되면 재발급
        newCookie.set('accessToken', accToken, {
            path: '/',
            secure: true,
        })
    }
}