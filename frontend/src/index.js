import React from 'react';
import ReactDOM from 'react-dom';

import './assets/bottomMenu.css'
import './assets/chat.css'
import './assets/commentModal.css'
import './assets/explore.css'
import './assets/animations.css'
import './assets/home.css'
import './assets/posts.css'
import './assets/profile.css'
import './assets/profiles.css'
import './assets/settings.css'
import './assets/sidebar.css'
import './assets/style.css'
import './assets/responsivity.css'

import AppContextProvider from './context/app/AppContext'
import App from './App'

document.addEventListener('DOMContentLoaded', () => {
    const style = getComputedStyle(document.body)
    console.log(style.getPropertyValue('--primary-color'))
    //document.documentElement.style.setProperty('--primary-color', '#f00')
})

ReactDOM.render((<AppContextProvider><App /></AppContextProvider>), document.querySelector('#root'))
