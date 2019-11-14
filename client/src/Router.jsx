import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Index from './pages/Index'
import TradeList from './pages/TradeList'
import CategoryBar from './components/CategoryBar'
import Messenger from './components/Messenger'
const Router = () => {
    return (
        <>
            <CategoryBar>
            </CategoryBar>
            <Messenger/>
            <Switch>
                <Route path="/" exact component={Index}></Route>
                <Route path="/user"></Route>
                <Route path="/tradelist" component={TradeList}></Route>
            </Switch>
        </>
    )
}

export default Router