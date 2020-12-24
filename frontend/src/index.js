import React from 'react';
import ReactDOM from 'react-dom';

import './assets/style/auth.css'
import './assets/style/bottomMenu.css'
import './assets/style/chat.css'
import './assets/style/commentModal.css'
import './assets/style/explore.css'
import './assets/style/animations.css'
import './assets/style/home.css'
import './assets/style/posts.css'
import './assets/style/profile.css'
import './assets/style/profiles.css'
import './assets/style/settings.css'
import './assets/style/sidebar.css'
import './assets/style/style.css'
import './assets/style/responsivity.css'

import AppContextProvider from './context/app/AppContext'
import App from './App'

ReactDOM.render((<AppContextProvider><App /></AppContextProvider>), document.querySelector('#react-root'))
