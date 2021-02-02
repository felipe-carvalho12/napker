import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './login/Login'
import Signup from './signup/Signup'
import LandingPage from './landing-page/LandingPage'
import NotFound from '../not-found/NotFound'

export default function AuthRouter() {

    return (
        <Switch>

            <Route path="/bem-vindo">
                <LandingPage />
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/signup" exact>
                <Signup />
            </Route>

            <Route path="/home" exact>
                <Redirect to="/bem-vindo" />
            </Route>

            <Route path="/notificações">
                <Redirect to="/bem-vindo" />
            </Route>

            <Route path="/mensagens">
                <Redirect to="/bem-vindo" />
            </Route>

            <Route path="/perfil">
                <Redirect to="/bem-vindo" />
            </Route>

            <Route path="/configurações">
                <Redirect to="/bem-vindo" />
            </Route>

            <Route path="/user">
                <Redirect to="/bem-vindo" />
            </Route>

            <Route path="/" exact>
                <Redirect to="/bem-vindo" />
            </Route>

            <Route component={NotFound} />
        </Switch>
    )
}