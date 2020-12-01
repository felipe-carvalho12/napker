import { SERVER_URL } from './settings'

export const csrftoken = getCookie('csrftoken')

export function getCookie(name) {
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

export function handleLogout() {
  const bool = window.confirm('Sair do Napker?\nVocê poderá entrar novamente quando quiser.')
  if (bool) {
    window.location.replace(`${SERVER_URL}/logout`)
  }
}

export function openCloseEmojiList(closing = false) {
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

export function hideBottomMenuPostIcon() {
  if (document.querySelector('#bottom-menu-post-icon') && document.querySelector('#bottom-menu-post-icon').display !== 'none') {
    document.querySelector('#bottom-menu-post-icon').style.display = 'none'
  }
}

export function showBottomMenuPostIcon() {
  if (document.querySelector('#bottom-menu-post-icon') && document.querySelector('#bottom-menu-post-icon').display === 'none') {
    document.querySelector('#bottom-menu-post-icon').style.display = 'initial'
  }
}