import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Index from './pages/Index'

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact component={Index}></Route>
            <Route path="/user"></Route>
        </Switch>
    )
}

export default Router