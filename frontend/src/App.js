import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { onExpandableTextareaInput, getTheme } from './config/utils'
import { SERVER_URL } from './config/settings'
import { ThemeContext } from './context/app/AppContext'

import MainApp from './pages/main-app/Router'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import AddInterests from './pages/signup/Interests'

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

    const [theme,] = useContext(ThemeContext)

    const [isLogged, setIsLogged] = useState(null)

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/is-logged`)
            .then(response => response.json())
            .then(data => setIsLogged(data))
        getTheme(theme)
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
                                <Route path="/signup/interesses" component={AddInterests} />
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