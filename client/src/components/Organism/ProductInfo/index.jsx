import React, { useContext } from "react";
import styled from "styled-components";
import { convert2Price } from "../../../utils/converter";
import axios from "axios";
import apiConfig from "../../../config/api";
import pathConfig from "../../../config/path";
import moment from "moment";
import ModalContext from "../../../context/ModalContext";
import FailModal from "../../Molecules/CustomModal/FailModal";
import SuccessModal from "../../Molecules/CustomModal/SuccessModal";
import UserContext from "../../../context/UserContext";
import TextTimer from "../../Atoms/TextTimer";
import ProductPageContext from "../../../context/ProductPageContext";
import ShareBox from "../../Molecules/ShareBox";
import ReportButton from "../../Atoms/ReportButton";
import MessengerCreateButton from "../../Messenger/CreateButton";

const { apiUrl } = apiConfig;

const BidTootip = styled.div`
  display: none;
  position: relative;
  width: 10rem;
  background-color: black;
  color: white;
  padding: 0.7rem 0 0.7rem 0.2rem;
  margin-right: 1rem;
  border-radius: 5px;
  text-align: left;
  font-size: 0.7rem;
  text-align: center;
  font-weight: bold;
  &::after {
    content: "";
    position: absolute;
    border-left: 1rem solid black;
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    top: 0.8rem;
    right: -1rem;
  }
  ${ProductBid}:hover & {
    display: inline-block;
  }
`;

const ProductInfo = () => {
  const [user] = useContext(UserContext);
  const [productPageState] = useContext(ProductPageContext);
  const { socketClient, product, chats } = productPageState;
  const [, setModal] = useContext(ModalContext);
  /*   
  'dispatchProductPage' 
  'buyerId' 
  'categoryCode' 
  'contents' 
  'startBidPrice' 
  'hopePrice' 
  'images' 
  'soldPrice' 
  'soldDate' 
  'registerDate' 
  'extensionDate' 
  'modal',
  */

  const { id, title, immediatePrice, thumbnailUrl, isAuction, auctionDeadline, seller } = product;

  const baseURL = apiUrl;
  /**
   * "~~님이 ~~원에 입찰" 에서 가격만 추출
   * @param {string} text
   */
  function parsing(text) {
    let word = text.split(" ")[1];
    let num = word.split("원")[0];
    return Number(num.split(",").join(""));
  }

  /**
   * 현재 최고 입찰가 다음 입찰할 가격을 계산
   * @param {number} topbid
   */
  function Setbidprice(topbid) {
    return Math.floor(topbid + topbid * 0.2);
  }

  /**
   * 현재 입력된 채팅에서 즉시 구매가 된 메시지를 찾아낸다.
   *
   * @param {Array} chatlist
   */
  function findsoldmessage(chatlist) {
    let alertchat = chatlist.filter(
      chat => chat.type === "alert" && chat.text.split("즉시 구매").length > 1
    );
    return alertchat.length > 0;
  }
  /**
   * 현재 입력된 채팅중 알림의 마지막을 뽑는다.
   *
   * @param {Array} chatlist
   */
  function findlastalert(chatlist) {
    let alertchat = chatlist.filter(chat => chat.type === "alert");
    if (alertchat.length) {
      return alertchat[alertchat.length - 1].text;
    } else {
      return false;
    }
  }

  let isSold = false;
  if (product.soldPrice) {
    isSold = true;
  }
  let settedimmediatePrice = immediatePrice;
  let minimumbid = Setbidprice(product.startBidPrice);
  if (product.bids.length) {
    minimumbid = Setbidprice(product.bids[product.bids.length - 1].bidPrice);
  }
  if (chats.length) {
    if (findsoldmessage(chats)) {
      isSold = true;
    } else {
      let lastalert = findlastalert(chats);
      if (lastalert) {
        minimumbid = Setbidprice(parsing(lastalert));
      }
    }
  }
  if (immediatePrice < minimumbid) {
    settedimmediatePrice = Math.floor(minimumbid + minimumbid * 0.4);
  }
  const handleBidSubmit = e => {
    e.preventDefault();

    if (Object.keys(user).length === 0) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "로그인이 필요합니다." }
      });
    }

    if (user.id === seller.id) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "자신의 상품은 구매가 불가 합니다." }
      });
    }
    if (isSold) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "구매가 완료된 상품입니다." }
      });
    }
    const params = {
      bidPrice: e.target.bidPrice.value,
      bidDate: moment().format("YYYY-MM-DD h:mm:ss"),
      userId: user.id,
      productId: id
    };

    if (params.bidPrice === "") {
      params.bidPrice = minimumbid;
    }

    if (minimumbid > params.bidPrice) {
      setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "최소 경매가격을 확인해주세요." }
      });
    } else {
      axios
        .post(`${baseURL}${pathConfig.bids}`, params)
        .then(response => {
          if (response.status < 300) {
            socketClient.emit("bid", {
              type: "alert",
              roomId: id,
              sender: { ...user, sessionId: user.sessionId },
              bid: response.data,
              createdAt: Date.now()
            });

            setModal({
              isOpen: true,
              component: SuccessModal,
              props: { message: "입찰 성공" }
            });
          }
        })
        .catch(e => {
          setModal({
            isOpen: true,
            component: FailModal,
            props: { message: "입찰 실패" }
          });
        });
    }
  };

  const handleImmediateSubmit = price => e => {
    e.preventDefault();

    if (Object.keys(user).length === 0) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "로그인이 필요합니다." }
      });
    }

    if (user.id === seller.id) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "자신의 상품은 구매가 불가 합니다." }
      });
    }

    if (isSold) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "구매가 완료된 상품입니다." }
      });
    }

    const params = {
      soldPrice: price,
      soldDate: moment().format("YYYY-MM-DD h:mm:ss"),
      buyerId: user.id
    };

    axios
      .patch(`${baseURL}${pathConfig.products}/${id}`, params)
      .then(response => {
        socketClient.emit("purchase", {
          roomId: id,
          sender: { ...user, sessionId: socketClient.id },
          sold: response.data,
          createdAt: Date.now()
        });

        setModal({
          isOpen: true,
          component: SuccessModal,
          props: { message: "즉시 구매 성공" }
        });
      })
      .catch(() => {
        setModal({
          isOpen: true,
          component: FailModal,
          props: { message: "즉시 구매 실패" }
        });
      });
  };

  return (
    <ProductInfoStyle>
      <ProductImageBox>
        <ProductImage src={thumbnailUrl} />
      </ProductImageBox>

      <ProductDescBox>
        <ProductTitle>
          {title}
          <ReportButton userId={seller.id} productId={id} text={"판매자 신고"} />
          <MessengerCreateButton userId={user.id} sellerId={seller.id} text={"판매자와 대화하기"} />
        </ProductTitle>
        <ProductSeller>
          <ProductDescText size="sm">판매자</ProductDescText>
          <ProductDescText primary bold>
            {seller.name}
          </ProductDescText>
        </ProductSeller>
        <ProductDueDate>
          <ProductDescText size="sm">판매 종료일</ProductDescText>
          <ProductDescText primary bold>
            {auctionDeadline ? moment(auctionDeadline).format("YYYY년 MM월 DD일") : "비경매 상품"}
          </ProductDescText>
        </ProductDueDate>
        {isAuction ? (
          <ProductDueDate>
            <ProductDescText size="sm">남은 시간</ProductDescText>
            <ProductDescText primary bold>
              {<TextTimer auctionDeadline={auctionDeadline} /> || "비경매 상품"}
            </ProductDescText>
          </ProductDueDate>
        ) : null}
        <ProductBid onSubmit={handleBidSubmit}>
          <BidTootip>{`최소: ${convert2Price(minimumbid)} 원`}</BidTootip>
          <BidInput name="bidPrice" placeholder="바로입찰" />
          <BidButton>입찰</BidButton>
        </ProductBid>
        <ProductPurchase onSubmit={handleImmediateSubmit(settedimmediatePrice)}>
          <PurchasePrice>
            즉시 구매가
            <ProductDescText primary bold size="sm">
              {`${convert2Price(settedimmediatePrice)} 원`}
            </ProductDescText>
          </PurchasePrice>
          <PurchaseButton>구매</PurchaseButton>
        </ProductPurchase>
        <ShareWrapper>
          <ShareBox width={10} url={apiConfig.url + `/products/${id}`} object={product} />
        </ShareWrapper>
      </ProductDescBox>
    </ProductInfoStyle>
  );
};

export default ProductInfo;
