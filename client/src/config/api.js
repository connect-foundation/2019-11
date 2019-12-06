export const devConfig = {
    url: process.env.REACT_APP_DEV_CLIENT,
    apiUrl: process.env.REACT_APP_DEV_API,
    chatUrl: process.env.REACT_APP_DEV_CHAT
}

export const prodConfig = {
    url: process.env.REACT_APP_CLIENT,
    apiUrl: process.env.REACT_APP_API,
    chatUrl: process.env.REACT_APP_CHAT,
}

export default process.env.NODE_ENV === "development" ? devConfig : prodConfig;