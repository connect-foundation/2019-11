import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Index from './pages/Index'
import CategoryBar from './components/CategoryBar'

const Router = () => {
    return (
        <>
            <CategoryBar>
            </CategoryBar>
            <Switch>
                <Route path="/" exact component={Index}></Route>
                <Route path="/user"></Route>
            </Switch>
        </>
    )
}

export default Router