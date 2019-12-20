const config = {
  googleKey: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  kakaoKey: {
    APIKey: process.env.KAKAO_API_KEY
  },
  jwtSecret: process.env.JWT_KEY
};

export default config;
