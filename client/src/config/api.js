export const devConfig = {
    apiUrl: process.env.REACT_APP_DEV_API,
    chatUrl: process.env.REACT_APP_DEV_CAHT
}

export const prodConfig = {
    apiUrl: process.env.REACT_APP_API,
    chatUrl: process.env.REACT_APP_CHAT,
}

export default process.env.NODE_ENV === "development" ? devConfig : prodConfig;