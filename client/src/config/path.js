export default {
  storage: {
    image: "/api/storage/image",
    profile: "/api/storage/profile"
  },
  bids: "/api/bids",
  logfilter: "/api/log/filter",
  sign: {
    in: "/api/sign/login",
    out: "/api/sign/logout",
    kakao: "/api/sign/kakao",
    google: "/api/sign/google"
  },
  products: "/api/products",
  productsWithBids: "/api/products/withBids",
  productsRating: "/api/products/rating",
  users: "/api/users",
  userid: "/api/users/idx",
  items: {
    category: "/api/items/category",
    hot: "/api/items/hot",
    deadline: "/api/items/deadline",
    related: "/api/items/related"
  },
  statics: {
    categories: "/api/statics/categories"
  }
};
