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

            <Route path="/home" exact>
                <Redirect to="/login" />
            </Route>

            <Route path="/notificações">
                <Redirect to="/login" />
            </Route>

            <Route path="/mensagens">
                <Redirect to="/login" />
            </Route>

            <Route path="/perfil">
                <Redirect to="/login" />
            </Route>

            <Route path="/configurações">
                <Redirect to="/login" />
            </Route>

            <Route path="/user">
                <Redirect to="/login" />
            </Route>

            <Route path="/" exact>
                <Redirect to="/login" />
            </Route>
        </Switch>
    )
}