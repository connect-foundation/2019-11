export const devConfig = {
    url: process.env.REACT_APP_DEV_CLIENT,
    apiUrl: process.env.REACT_APP_DEV_API,
    chatUrl: process.env.REACT_APP_DEV_CHAT,
    kakaoKey: process.env.REACT_APP_DEV_KAKAO_KEY,
}

export const prodConfig = {
    url: process.env.REACT_APP_CLIENT,
    apiUrl: process.env.REACT_APP_API,
    chatUrl: process.env.REACT_APP_CHAT,
    kakaoKey: process.env.REACT_APP_KAKAO_KEY
}

export default process.env.NODE_ENV === "development" ? devConfig : prodConfig;