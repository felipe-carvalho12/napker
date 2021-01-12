import React from 'react';
import ReactDOM from 'react-dom';

import './assets/style/utils/generalUtils.css'
import './assets/style/utils/box.css'
import './assets/style/utils/color.css'
import './assets/style/utils/hover.css'
import './assets/style/utils/border.css'
import './assets/style/utils/focus.css'

import './assets/style/pages/auth/auth.css'
import './assets/style/pages/auth/landing-page.css'

import './assets/style/pages/global-components/materialUi.css'
import './assets/style/pages/global-components/loader.css'
import './assets/style/pages/global-components/content-editable.css'
import './assets/style/pages/global-components/modal.css'
import './assets/style/pages/global-components/buttons.css'
import './assets/style/pages/global-components/viewMoreSelect.css'
import './assets/style/pages/global-components/emojiList.css'
import './assets/style/pages/global-components/summary.css'

import './assets/style/pages/main-app/components/bottomMenu.css'
import './assets/style/pages/main-app/components/draft-js-editor.css'
import './assets/style/pages/main-app/components/themeSwitcher.css'
import './assets/style/pages/main-app/components/sidebar.css'
import './assets/style/pages/main-app/chat.css'
import './assets/style/pages/main-app/home/components/explore.css'
import './assets/style/pages/main-app/home/home.css'
import './assets/style/pages/main-app/home/components/posts.css'
import './assets/style/pages/main-app/profile.css'
import './assets/style/pages/main-app/home/components/profiles.css'
import './assets/style/pages/main-app/settings.css'

import './assets/style/main/animations.css'
import './assets/style/main/responsivity.css'
import './assets/style/main/style.css'

import AppContextProvider from './context/app/AppContext'
import App from './App'

ReactDOM.render((<AppContextProvider><App /></AppContextProvider>), document.querySelector('#react-root'))
