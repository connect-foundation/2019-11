import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from "./pages/Main";
import TradeList from "./pages/TradeList";
import CategoryBar from "./components/CategoryBar";
import Register from "./pages/Register";
import Messenger from "./components/Messenger";
import ProductPage from "./components/Product/ProductPage";
import MyItem from './pages/MyItems'

const Router = () => {
  return (
    <>
      <CategoryBar></CategoryBar>
      <Switch>
        <Route path="/" exact component={Main}></Route>
        <Route path="/user"></Route>
        <Route path="/tradelist" component={TradeList}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/products" component={ProductPage}></Route>
        <Route path="/myItems" component={MyItem}></Route>
      </Switch>
      <Messenger />
    </>
  );
};

export default Router;
