import React, { useState, useEffect } from 'react'
import CategoryContents from './CategoryContents'
import { Cookies } from 'react-cookie'

export default function Category() {
    const [isLogin, setIsLogin] = useState<boolean>(false) // 로그인 되어있는지 확인
    const cookie = new Cookies()
    const refreshToken = cookie.get('refreshToken') // 리프레쉬 토큰 저장
    const accessToken = cookie.get('accessToken') // 액세스 토큰 저장
    const email = cookie.get('email') // 액세스 토큰 저장

    useEffect(() => {
        if (refreshToken !== undefined) {
            // 리프레쉬 토큰이 있으면
            setIsLogin(true) // 로그인 되어있으니 true로 바꾸기
        }
    }, [])

    return (
        <>
            <CategoryContents
                isLogin={isLogin}
                cookie={{ email: email, refToken: refreshToken, accToken: accessToken }}
            />
        </>
    )
}
