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
import Carousel from "../../Molecules/Carousel";
import { getNowDateTime, isTerminated } from "../../../utils/dateUtil";
import SocketContext from "../../../context/SocketContext";

const { apiUrl } = apiConfig;

const ProductInfoStyle = styled.div`
  display: flex;
  min-height: 400px;
  margin: 0 auto;
  justify-content: center;
`;

const ProductImageBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  padding: var(--padding-xs);
`;

const ProductDescBox = styled.div`
  position: relative;
  width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductDesc = styled.div`
  width: 100%;
  height: 352px;
`;

const ProductDescText = styled.span`
  color: ${props => (props.primary ? "var(--color-primary)" : "black")};
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  font-size: ${props => (props.size === "sm" ? "0.8rem" : "1.1rem")};
  margin-left: var(--margin-sm);
`;

const ProductTitle = styled.div`
  margin-top: var(--margin-sm);
  margin-bottom: var(--margin-md);
  font-size: 1.4rem;
  font-weight: bold;
  padding-left: var(--padding-lg);
  color: var(--color-darkgray);
`;

const ProductSeller = styled.div`
  text-align: right;
`;

const ProductDueDate = styled.div`
  margin: var(--margin-md) 0px;
  text-align: right;
`;

const ProductBid = styled.form`
  margin: var(--margin-sm) 0px;
  margin-bottom: 0px;
  text-align: right;
`;

const BidInput = styled.input`
  border: 1px solid var(--color-gray);
  border-right: none;
  padding: var(--padding-md);
  font-size: 0.8rem;
  min-width: 200px;
  ${ProductBid}:hover & {
    border-color: var(--color-darkgray-lighter);
  }
`;

const NoBidInput = styled.input`
  border: 1px solid var(--color-gray);
  border-right: none;
  padding: var(--padding-md);
  font-size: 0.8rem;
  min-width: 200px;
`;

const BidButton = styled.button`
  border: 1px solid black;
  padding: var(--padding-md);
  background-color: black;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;

  &:disabled {
    background-color: var(--color-gray);
    border-color: var(--color-gray);
    cursor: default;
  }
`;

const ProductPurchase = styled(ProductBid)`
  margin-top: var(--margin-md);
  margin-bottom: var(--margin-sm);
  display: flex;
  justify-content: flex-end;
`;

const PurchasePrice = styled.span`
  border: 1px solid var(--color-gray);
  display: inline-block;
  border-right: none;
  padding: var(--padding-md);
  font-size: 0.8rem;
  min-width: 200px;
  text-align: left;

  ${ProductPurchase}:hover & {
    border-color: var(--color-primary);
  }
`;

const PurchaseComplete = styled.div`
  border: 1px solid var(--color-primary);
  border-right: none;
  padding: var(--padding-md);
  font-size: 0.8rem;
  min-width: 200px;
  text-align: left;
  color: var(--color-primary);
  font-weight: bold;
`;

const PurchaseButton = styled(BidButton)`
  background-color: var(--color-primary);
  border-color: var(--color-primary);

  &:disabled {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    text-decoration: line-through;
  }
`;

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

const ShareWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ProductInfo = () => {
  const [user] = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [productPageState, dispatchProductPage] = useContext(
    ProductPageContext
  );
  const { product, chats, bids } = productPageState;

  const [modal, setModal] = useContext(ModalContext);
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
  'auctionDeadline' 
  'modal',
  */

  const {
    id,
    title,
    images,
    immediatePrice,
    thumbnailUrl,
    isAuction,
    extensionDate,
    seller,
    soldPrice,
    startBidPrice
  } = product;

  const minBidPrice =
    bids.length > 0
      ? Math.floor(bids[bids.length - 1].bidPrice * 1.2)
      : startBidPrice;

  const purchasePrice =
    minBidPrice < immediatePrice
      ? immediatePrice
      : Math.floor(minBidPrice * 1.2);

  const isTerminatedProduct = isTerminated(extensionDate);
  const baseURL = apiUrl;

  const handleBidSubmit = e => {
    e.preventDefault();

    if (isTerminatedProduct) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "판매가 종료된 상품입니다." }
      });
    }

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

    if (soldPrice) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "구매가 완료된 상품입니다." }
      });
    }

    const bidPrice = e.target.bidPrice.value;

    const params = {
      bidPrice: bidPrice === "" ? minBidPrice : bidPrice,
      bidDate: getNowDateTime(),
      userId: user.id,
      productId: id
    };

    if (params.bidPrice < minBidPrice) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "최소 경매가격을 확인해주세요." }
      });
    }

    axios
      .post(`${baseURL}${pathConfig.bids}`, params)
      .then(response => {
        socket.emit("bid", {
          type: "bid",
          roomId: id,
          sender: { ...user, sessionId: user.sessionId },
          bid: response.data,
          createdAt: getNowDateTime()
        });

        setModal({
          isOpen: true,
          component: SuccessModal,
          props: { message: "입찰 성공" }
        });
      })
      .catch(e => {
        const errorMessage = e.response.data.message || "입찰 실패";
        setModal({
          isOpen: true,
          component: FailModal,
          props: { message: errorMessage }
        });
      });
  };

  const handleImmediateSubmit = price => e => {
    e.preventDefault();

    if (isTerminatedProduct) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "판매가 종료된 상품입니다." }
      });
    }

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

    if (soldPrice) {
      return setModal({
        isOpen: true,
        component: FailModal,
        props: { message: "구매가 완료된 상품입니다." }
      });
    }

    const params = {
      soldPrice: price,
      soldDate: getNowDateTime(),
      buyerId: user.id
    };

    axios
      .patch(`${baseURL}${pathConfig.products}/${id}`, params)
      .then(response => {
        socket.emit("purchase", {
          roomId: id,
          sender: { ...user, sessionId: socket.id },
          sold: response.data,
          createdAt: getNowDateTime()
        });

        dispatchProductPage({
          type: "UPDATE_PRODUCT",
          product: response.data
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
        <Carousel list={images.map(value => value.imageUrl)} readOnly={true} />
      </ProductImageBox>

      <ProductDescBox>
        <ProductDesc>
          <ProductTitle>
            {title}
            <ReportButton
              userId={seller.id}
              productId={id}
              text={"판매자 신고"}
            />
            <MessengerCreateButton
              userId={user.id}
              sellerId={seller.id}
              text={"판매자와 대화하기"}
            />
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
              {extensionDate &&
                moment(extensionDate).format("YYYY년 MM월 DD일")}
            </ProductDescText>
          </ProductDueDate>

          <ProductDueDate>
            <ProductDescText size="sm">남은 시간</ProductDescText>
            <ProductDescText primary bold>
              <TextTimer datetime={extensionDate} />
            </ProductDescText>
          </ProductDueDate>

          <ProductBid onSubmit={handleBidSubmit}>
            {isAuction ? (
              <>
                <BidTootip>{`최소: ${convert2Price(
                  minBidPrice || 0
                )} 원`}</BidTootip>
                <BidInput
                  name="bidPrice"
                  type="number"
                  placeholder="바로입찰"
                />
                <BidButton>입찰</BidButton>
              </>
            ) : (
              <>
                <NoBidInput
                  disabled
                  placeholder="본 상품은 일반 상품 입니다."
                ></NoBidInput>
                <BidButton disabled>입찰</BidButton>
              </>
            )}
          </ProductBid>

          <ProductPurchase onSubmit={handleImmediateSubmit(purchasePrice)}>
            {soldPrice ? (
              <>
                <PurchaseComplete>판매 완료(SOLD OUT)</PurchaseComplete>
                <PurchaseButton disabled>구매</PurchaseButton>
              </>
            ) : (
              <>
                <PurchasePrice>
                  즉시 구매가
                  <ProductDescText primary bold size="sm">
                    {`${convert2Price(purchasePrice)} 원`}
                  </ProductDescText>
                </PurchasePrice>
                <PurchaseButton>구매</PurchaseButton>
              </>
            )}
          </ProductPurchase>

          <ShareWrapper>
            <ShareBox
              width={10}
              url={apiConfig.url + `/products/${id}`}
              object={product}
            />
          </ShareWrapper>
        </ProductDesc>
      </ProductDescBox>
    </ProductInfoStyle>
  );
};

export default ProductInfo;
