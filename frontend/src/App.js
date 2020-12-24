import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { SERVER_URL } from './config/settings'

import { onExpandableTextareaInput } from './config/utils'

import MainApp from './pages/main-app/Router'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

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
                                <Route path="/signup" component={Signup} />
                                <Route path="/">
                                    <Redirect to="/login" />
                                </Route>
                            </Switch>
                        </Router>
                    }
                </>
                :
                <div>
                    Loading...
                </div>
            }
        </>
    )
}