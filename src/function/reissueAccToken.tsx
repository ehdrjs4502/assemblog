import { Cookies } from "react-cookie";

const reissueAccToken = (accessToken: string | undefined) => {
    const newCookie = new Cookies();
  
    if (accessToken !== undefined) {
      // 액세스 토큰 만료되면 재발급
      newCookie.set('accessToken', accessToken, {
        path: '/',
        secure: true,
      });
    }
};
  
export default reissueAccToken;