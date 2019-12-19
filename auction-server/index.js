/**
 * AUCTION-SERVER 동작 방식
 * [작업 할당 크론]
 * 1. 15초 간격 crontab으로 아래 조건에 해당하는 상품을 쿼리로 가져온다.
 *  - extension_date 가 현재 시간보다 이전인 경우
 *  - is_end 가 false 인 경우
 * 2. 상품이 있는 경우, 가져온 상품의 is_end 필드값을 true로 처리한다.
 * 3. 1번에서 가져온 상품을 작업큐에 할당한다.
 *
 * [작업 처리 클론]
 * 1. 15초 간격 crontab으로 아래 작업 수행
 *  - 작업큐에서 하나의 종료된 경매(상품)을 가져온다.
 *  - 그 경매(상품)의 sold_price가 존재한다면 즉시 구매된 상품으로 판단한다.
 *  - 그렇지 않은 경우 입찰 상품으로 판단한다.
 * 2. 즉시 구매 상품의 경우
 *  - 판매자, 구매자, 입찰자에게 판매 여부를 알린다.
 * 3. 입찰 상품의 경우
 *  - 낙찰 / 유찰 여부를 판매자, 구매자, 입찰자에게 알린다.
 *  - 낙찰의 경우 product buyer_id 필드값을 업데이트한다.
 */

const cron = require("node-cron");
const mysql = require("mysql2");
require("dotenv").config();
var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const { sendMail } = require('./mailService')

const pool = mysql.createPool({
  host:
    process.env.NODE_ENV === "production"
      ? process.env.DB_HOST
      : process.env.DB_DOCKER_COMPOSE_SERVICE_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const chatURL =
  process.env.NODE_ENV === "production"
    ? process.env.CHAT_SERVER
    : process.env.CHAT_DEV_SERVER;
const socket = require("socket.io-client")(chatURL);
socket.on("connect", () => {
  console.log(` => ${chatURL} connected`);
});
socket.on("event", data => { });
socket.on("disconnect", () => { });

let queue = [];

//1분 반복 예시 "*/1 * * * *"
//[작업 할당 클론]
cron.schedule("*/2 * * * * *", () => {
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(now);
  pool.query(
    `SELECT * FROM products WHERE extension_date < ? and is_end = 0 ORDER BY extension_date`,
    [now],
    (err, rows, fields) => {
      if (err) {
        return console.log(err);
      }
      const products = rows;
      const ids = rows.map(row => row.id).join(",");
      //1. 해당 경매(상품)의 is_end 필드값을 True로 변경한다.
      if (rows.length === 0) return console.log("NO MATHCED PRODUCTS");
      pool.query(
        `UPDATE products SET is_end = 1 WHERE id in (${ids})`,
        (err, rows, filed) => {
          if (err) {
            return console.log(err);
          }
          console.log(
            `UPDATED ${rows.changedRows} MATCHED PRODUCTS TO HAVE IS_END=1`
          );
          //2. queue에 해당 경매(상품)에 대한 정보를 넣는다.
          queue = [...queue, ...products];
        }
      );
    }
  );
});

// [작업 처리 클론]
cron.schedule("*/2 * * * * *", () => {
  if (queue.length === 0) return console.log("QUEUE IS EMPTY");
  console.dir(queue);
  console.dir(queue.length);

  while (queue.length > 0) {
    //1. 큐에 있는 경매(상품)을 꺼낸다.
    const product = queue.shift();
    //2. 해당 상품의 입찰에 대한 정보를 가져온다.(쿼리)
    // 해당 상품의 user가 입찰한 가장 비싼 가격(가장 최근) 입찰 정보를 쿼리로 가져온다.
    // 가장 비싸게 입찰한 유저순으로 쿼리를 가져온다.
    pool.query(
      `SELECT user_id, MAX(bid_price) as bid_price, MAX(bid_date) as bid_date FROM bids WHERE product_id=? GROUP BY user_id ORDER BY MAX(bid_price) DESC;`,
      [product.id],
      (err, rows, filed) => {
        const bids = rows;
        const productInfo = {
          id: product.id,
          title: product.title,
          thumbnailUrl: product.thumbnail_url,
          soldDate: product.sold_date,
          soldPrice: product.sold_price
        };

        //2. 즉시구매된 상품인 경우
        if (product.sold_price) {
          console.log(
            `[즉시구매] ${product.id}상품 ${product.buyer_id}가 즉시구매 `
          );
          // 2-1. 구매자에게 즉시 구매가 성공됨을 알린다.(mongo, socket.io)
          socket.emit("auctionResult", {
            userId: product.buyer_id,
            type: "PURCHASE_SUCCESS",
            product: productInfo
          });
          // 2-2. 판매자에게 경매(상품)이 즉시 구매되었음을 알린다.(mongo, socket.io)
          socket.emit("auctionResult", {
            userId: product.seller_id,
            type: "SALE_SUCCESS",
            product: productInfo
          });

          bids.forEach(bid => {
            // 2-3. 입찰한 유저들에게 경매(상품)이 즉시 구매로 팔렸음을 알린다.(mongo, socket.io)
            if (bid.user_id === product.buyer_id) return;

            socket.emit("auctionResult", {
              userId: bid.user_id,
              type: "AUCTION_END_BY_PURCHASE",
              product: productInfo
            });
          });

          sendMail(pool, product.buyer_id, product.title, false, true)
          sendMail(pool, product.seller_id, product.title, true, true)
        } else {
          //3. 즉시 구매가 아닌 상품인 경우, 낙찰/유찰 여부를 확인한다.(쿼리)
          //3-1. 유찰인 경우
          if (bids.length === 0) {
            console.log(
              `[유찰] ${product.seller_id} 판매자의 상품 ${productInfo.id} 유찰됨`
            );
            //3-1-1. 판매자에게 유찰을 알림(mongo, socket.io)
            socket.emit("auctionResult", {
              userId: product.seller_id,
              type: "AUCTION_FAIL",
              product: productInfo
            });

            sendMail(pool, product.seller_id, product.title, true, false)
          } else {
            //3-2. 낙찰인 경우
            // 가장 비싼 가격으로 구매한 buyer_id의 값을 product 테이블에 업데이트 한다.
            const buyerId = bids[0].user_id;
            product.soldDate = bids[0].bid_date;
            product.soldPrice = bids[0].bid_price;

            pool.query(
              `Update products SET buyer_id=? WHERE id=?`,
              [product.id, buyerId],
              (err, rows, filed) => {
                console.log(
                  `[낙찰] ${product.id}상품 ${buyerId}가 구매 / ${rows.changedRows}개 ROW UPDATED`
                );
                //3-2-1. 판매자에게 낙찰되었음을 알린다.(mongo, socket.io)
                socket.emit("auctionResult", {
                  userId: product.seller_id,
                  type: "AUCTION_SUCCESS",
                  product: productInfo
                });
                //3-2-2. 입찰자에게 낙찰되었음을 알린다.(mongo, socket.io)
                socket.emit("auctionResult", {
                  userId: buyerId,
                  type: "BID_WINNING",
                  product: productInfo
                });

                //3-2-3. 입찰한 유저들에게 경매(상품)이 얼마에 낙찰되었음을 알린다.
                bids.forEach((bid, i) => {
                  if (i === 0) return;
                  socket.emit("auctionResult", {
                    userId: bid.user_id,
                    type: "AUCTION_END_BY_BID",
                    product: productInfo
                  });
                });
              }
            );
            sendMail(pool, product.buyer_id, product.title, false, true)
            sendMail(pool, product.seller_id, product.title, true, true)
          }
        }
      }
    );
  }
});
