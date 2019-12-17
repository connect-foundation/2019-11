export const devConfig = {
  url: process.env.REACT_APP_DEV_CLIENT,
  apiUrl: process.env.REACT_APP_DEV_API,
  chatUrl: process.env.REACT_APP_DEV_CHAT,
  kakaoKey: process.env.REACT_APP_DEV_KAKAO_KEY,
  kakaoOAuthKey: process.env.REACT_APP_DEV_OAUTH_KAKAO_KEY,
  googleOAuthKey: process.env.REACT_APP_DEV_OAUTH_GOOGLE_KEY
};

export const prodConfig = {
  url: process.env.REACT_APP_CLIENT,
  apiUrl: process.env.REACT_APP_API,
  chatUrl: process.env.REACT_APP_CHAT,
  kakaoKey: process.env.REACT_APP_KAKAO_KEY,
  kakaoOAuthKey: process.env.REACT_APP_OAUTH_KAKAO_KEY,
  googleOAuthKey: process.env.REACT_APP_OAUTH_GOOGLE_KEY
};

export default process.env.NODE_ENV === "development" ? devConfig : prodConfig;
