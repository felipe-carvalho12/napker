import { SERVER_URL } from './settings'

export const csrftoken = getCookie('csrftoken')

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export const handleLogout = () => {
  const bool = window.confirm('Sair do Napker?\nVocê poderá entrar novamente quando quiser.')
  if (bool) {
    window.location.replace(`${SERVER_URL}/logout`)
  }
}

export const openCloseEmojiList = (closing = false) => {
  const el = document.querySelector('#emoji-list-container')
  const style = el.style
  if (closing) {
    style.display = 'none'
    document.querySelector('#emoji-button').classList.remove('emoji-button-active')
  } else {
    if (!style.display || style.display === 'none') {
      style.display = 'initial'
      document.querySelector('#emoji-button').classList.add('emoji-button-active')
    } else {
      style.display = 'none'
      document.querySelector('#emoji-button').classList.remove('emoji-button-active')
    }
  }
}

// nav AND BOTTOM MENU

export const getActivePageOnLoad = () => {
  document.querySelectorAll('.nav-menu-item-active').forEach(el => {
    el.classList.remove('nav-menu-item-active')
  })
  const currentUrl = window.location.href.split('/')
  if (currentUrl.includes('home')) {
    document.querySelector('#home-menu').classList.add('nav-menu-item-active')
    document.querySelector('#bottom-home-menu').classList.add('nav-menu-item-active')
  }
  else if (currentUrl.includes('notifica%C3%A7%C3%B5es')) {
    document.querySelector('#notifications-menu').classList.add('nav-menu-item-active')
    document.querySelector('#bottom-notifications-menu').classList.add('nav-menu-item-active')
  }
  else if (currentUrl.includes('mensagens')) {
    document.querySelector('#messages-menu').classList.add('nav-menu-item-active')
    document.querySelector('#bottom-messages-menu').classList.add('nav-menu-item-active')
  }
  else if (currentUrl.includes('perfil')) {
    document.querySelector('#profile-menu').classList.add('nav-menu-item-active')
    document.querySelector('#bottom-profile-menu').classList.add('nav-menu-item-active')
  }
  else if (currentUrl.includes('configura%C3%A7%C3%B5es')) {
    document.querySelector('#settings-menu').classList.add('nav-menu-item-active')
    document.querySelector('#bottom-settings-menu').classList.add('nav-menu-item-active')
  }
}

export const switchPage = (e, isHome = false) => {
  if (!isHome) {
    document.querySelectorAll('.nav-menu-item-active').forEach(el => {
      el.classList.remove('nav-menu-item-active')
    })
    e.target.classList.add('nav-menu-item-active')
  } else {
    document.querySelectorAll('.nav-menu-item-active').forEach(el => {
      el.classList.remove('nav-menu-item-active')
    })
    document.querySelector('#home-menu').classList.add('nav-menu-item-active')
  }
}