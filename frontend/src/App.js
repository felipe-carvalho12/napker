import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { onExpandableTextareaInput, setTheme } from './config/utils'
import { SERVER_URL } from './config/settings'

import ResetPassword from './pages/auth/reset-password/ResetPassword'
import PageLoader from './pages/PageLoader'
import MainAppRouter from './pages/main-app/Router'
import AuthRouter from './pages/auth/Router'

export default function App() {
    // global event listeners
    document.addEventListener('input', onExpandableTextareaInput)
    document.addEventListener('click', e => {
        if (!e.target.classList.contains('view-more-select') && !e.target.classList.contains('view-more-icon')) {
            document.querySelectorAll('.view-more-select').forEach(el => {
                el.style.display = 'none'
            })
        }
        if (!e.target.classList.contains('emoji-list-container')) {
            document.querySelectorAll('.emoji-list-container').forEach(el => {
                el.style.display = 'none'
            })
        }
    })

    const [isLogged, setIsLogged] = useState(null)

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/is-logged`)
            .then(response => response.json())
            .then(data => setIsLogged(data))
        setTheme()
    }, [])

    return (
        <Router>
            <Switch>
                <Route path="/recuperar-senha">
                    <ResetPassword />
                </Route>
                
                {isLogged !== null ?
                    <Route path="/">
                        {isLogged === 'True' ?
                            <MainAppRouter />
                            :
                            <AuthRouter />
                        }
                    </Route>
                    :
                    <PageLoader />
                }
                
            </Switch>
        </Router>
    )
}