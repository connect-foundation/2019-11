export const devConfig = {
  Bucket: process.env.DEV_BUCKET
}

export const prodConfig = {
  Bucket: process.env.Bucket
}

export default process.env.NODE_ENV === "development" ? devConfig : prodConfig
