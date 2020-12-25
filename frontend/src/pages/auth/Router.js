import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './login/Login'
import Signup from './signup/Signup'

export default function AuthRouter() {

    return (
        <Switch>
            <Route path="/login">
                <Login />
            </Route>

            <Route path="/signup" exact>
                <Signup />
            </Route>

            <Route path="/" exact>
                <Redirect to="/login" />
            </Route>
        </Switch>
    )
}