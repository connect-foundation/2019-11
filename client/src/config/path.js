export default {
  storage: {
    image: "/api/storage/image",
    profile: "/api/storage/profile"
  },
  bids: "/api/bids/",
  logfilter: "/api/log/filter/",
  sign: {
    in: "/api/sign/login/",
    out: "/api/sign/logout/"
  },
  products: {
    find: "/api/products",
    update: "/api/products/",
    create: "/api/products/",
    onSale: "/api/products/onlySale/"
  },
  users: {
    find: "/api/users/",
    create: "/api/users/",
    update: "/api/users/",
    delete: "/api/users"
  },
  items: "/api/items/"
}
