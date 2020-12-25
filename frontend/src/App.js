import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { onExpandableTextareaInput, setTheme } from './config/utils'
import { SERVER_URL } from './config/settings'

import MainApp from './pages/main-app/Router'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import PageLoader from './pages/PageLoader'
import ActivationLinkSent from './pages/signup/components/ActivationLinkSent'

export default function App() {
    // global event listeners
    document.addEventListener('input', onExpandableTextareaInput)
    document.addEventListener('click', e => {
        if (!e.target.classList.contains('view-more-select') && !e.target.classList.contains('view-more-icon')) {
            document.querySelectorAll('.view-more-select').forEach(el => {
                el.style.display = 'none'
            })
        }
    })

    const [isLogged, setIsLogged] = useState(null)

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/is-logged`)
            .then(response => response.json())
            .then(data => setIsLogged(data))
        setTheme(window.localStorage.getItem('theme') || 'light')
    }, [])

    return (
        <>
            {isLogged !== null ?
                <>
                    {isLogged === 'True' ?
                        <MainApp />
                        :
                        <Router>
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/signup" exact component={Signup} />
                                <Route path="/">
                                    <Redirect to="/login" />
                                </Route>
                            </Switch>
                        </Router>
                    }
                </>
                :
                <PageLoader />
            }
        </>
    )
}