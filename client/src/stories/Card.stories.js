import React from 'react';

import Thumbnail from '../components/Card/Thumbnail';
import TagContainer from '../components/Card/TagContainer';
import CardTitle from '../components/Card/CardTitle';
import Bids from '../components/Card/Bids';
import PriceContainer from '../components/Card/PriceContainer';
import BuyNowPrice from '../components/Card/BuyNowPrice';
import TopBid from '../components/Card/TopBid';
import Card from '../components/Card';
import CardContainer from '../components/CardContainer';
import mock from '../mock/popular-items/popular-items.js';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Card',
};

export const FullViewCardContainer = () => (
  <>
    <CardContainer items={mock}></CardContainer>
  </>
);

export const FullCard = () => (
  <>
    <Card item={mock[0]}></Card>
  </>
)

export const CardThumbnail = () => (
  <>
    <Thumbnail thumbnail="https://user-images.githubusercontent.com/37038262/68827678-30d91800-06e6-11ea-83fa-2afd1ada89aa.jpg"></Thumbnail>
  </>
);

export const CardTags = () => (
  <>
    <TagContainer date="2019-11-19" isAuction={true}></TagContainer>
    <TagContainer date="2019-11-19" isAuction={false}></TagContainer>
  </>
);

export const CardMainTitle = () => (
  <>
    <CardTitle title="TEST"></CardTitle>
  </>
);

export const CardBids = () => (
  <>
    <Bids bids={3}></Bids>
  </>
);

export const CardPriceContainer = () => (
  <>
    <PriceContainer buyNowPrice={30000} topBid={23000}></PriceContainer>
  </>
);

export const CardBuyNowPrice = () => (
  <>
    <BuyNowPrice buyNowPrice={2000}></BuyNowPrice>
  </>
);

export const CardTopBid = () => (
  <>
    <TopBid topBid={250000}></TopBid>
  </>
);