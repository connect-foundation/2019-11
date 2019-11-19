import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Index from './pages/Index'
import Main from './pages/Main'
import TradeList from './pages/TradeList'
import CategoryBar from './components/CategoryBar'
import Register from './pages/Regiester'

import Messenger from './components/Messenger'
const Router = () => {
    return (
        <>
            <CategoryBar>
            </CategoryBar>
            <Switch>
                <Route path="/" exact component={Index}></Route>
                <Route path="/user"></Route>
                <Route path="/tradelist" component={TradeList}></Route>
                <Route path="/register" exact component={Register}></Route>
                <Route path="/main" component={Main}></Route>
            </Switch>
            <Messenger/>
        </>
    )
}

export default Router