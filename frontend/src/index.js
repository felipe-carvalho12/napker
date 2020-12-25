import React from 'react';
import ReactDOM from 'react-dom';

import './assets/style/utils/hover.css'
import './assets/style/utils/border.css'

import './assets/style/pages/auth/auth.css'

import './assets/style/pages/global-components/loader.css'
import './assets/style/pages/global-components/modal.css'
import './assets/style/pages/global-components/buttons.css'
import './assets/style/pages/global-components/viewMoreSelect.css'

import './assets/style/pages/main-app/components/bottomMenu.css'
import './assets/style/pages/main-app/chat.css'
import './assets/style/pages/main-app/components/commentModal.css'
import './assets/style/pages/main-app/home/components/explore.css'
import './assets/style/pages/main-app/home/home.css'
import './assets/style/pages/main-app/home/components/posts.css'
import './assets/style/pages/main-app/profile.css'
import './assets/style/pages/main-app/home/components/profiles.css'
import './assets/style/pages/main-app/settings.css'
import './assets/style/pages/main-app/components/sidebar.css'

import './assets/style/main/animations.css'
import './assets/style/main/responsivity.css'
import './assets/style/main/style.css'

import AppContextProvider from './context/app/AppContext'
import App from './App'

ReactDOM.render((<AppContextProvider><App /></AppContextProvider>), document.querySelector('#react-root'))
