import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";

import Header from "../../components/Atoms/Header";
import TradeBox from "../../components/Organism/TradeBox";
import InfiniteScroll from "../../components/Molecules/InfiniteScroll";
import Footer from "../../components/Atoms/Footer";
import AlertDialog from "../../components/Molecules/AlertDialog";
import Spinner from "../../components/Atoms/Spinner";

import userContext from "../../context/UserContext";

import apiConfig from "../../config/api";
import pathConfig from "../../config/path";
import { getFetch, deleteJsonFetch } from "../../services/fetchService";

import { limits } from "./contants";

const { url, apiUrl } = apiConfig;
const { products } = pathConfig;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60rem;
  height: 90%;
  padding: 1rem;
  margin: 5px auto;
  border-radius: 30px;
  overflow-y: auto;
`;

const ScrollFrame = styled.div`
  width: 60rem;
  height: 90%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Page = () => {
  const [user] = useContext(userContext);
  const offset = useRef(0);
  const [hasMore, setHasMore] = useState(true);
  const [refState, refreshTrigger] = useState(false);
  const [open, setOpen] = useState(false);
  const [removeId, setRemoveId] = useState(-1);
  const [onlazy, setOnlazy] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOnlazy(false);
    }, 1000);
  });

  useEffect(() => {
    if (!user.id) window.location.href = "/";
  }, [user]);

  const refresh = () => {
    offset.current = 0;
    setHasMore(true);
    refreshTrigger(true);
    refreshTrigger(false);
  };

  const removeHandler = async () => {
    const result = await deleteJsonFetch(`${apiUrl}${products}/${removeId}`);
    if (result.data.affected) {
      alert("성공적으로 삭제되었습니다.");
      refresh();
    } else alert("이미 삭제 되었거나 경매 완료된 물품입니다.");
  };

  const fetcher = async () => {
    if (!user.id) return [];
    const fetchUrl = `${apiUrl}${products}/onlySale/${user.id}/${offset.current}/${limits}`;
    const [list, cnt] = await getFetch(fetchUrl, {
      "access-token": user.accessToken,
      "refresh-token": user.refreshToken
    });
    offset.current += list.length;
    setHasMore(offset.current < cnt);

    return list.map(value => {
      return {
        key: value.id,
        id: value.id,
        link: `${url}/products/${value.id}`,
        title: value.title,
        status: "경매중",
        thumbnail: value.thumbnailUrl,
        price: value.immediatePrice,
        time: new window.Date(value.registerDate),
        onDelete: () => {
          setOpen(true);
          setRemoveId(value.id);
        },
        onUpdate: () => (window.location = `/productUpdate/${value.id}`)
      };
    });
  };

  const drawer = item => item.map(value => <TradeBox {...value} />);

  return onlazy ? (
    <Spinner text={"로딩 중입니다."} />
  ) : (
    <Container>
      <ContentContainer>
        <Header text={"경매중인 내 상품"} />
        <ScrollFrame>
          <InfiniteScroll fetcher={fetcher} drawer={drawer} hasMore={hasMore} refresh={refState} />
        </ScrollFrame>
      </ContentContainer>
      <Footer />
      {open ? (
        <AlertDialog
          title={"주의"}
          content={"경매중인 상품은 취소시 매너지수가 하락합니다. 취소 하시겠습니까?"}
          cancelAble={true}
          onDismiss={() => {
            setOpen(false);
            setRemoveId(-1);
          }}
          onAccept={() => removeHandler()}
        />
      ) : (
        undefined
      )}
    </Container>
  );
};

export default Page;
