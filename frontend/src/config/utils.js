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

// EXPANDABLE TEXTAREA

function getScrollHeight(elm) {
  var savedValue = elm.value
  elm.value = ''
  elm._baseScrollHeight = elm.scrollHeight
  elm.value = savedValue
}

export function onExpandableTextareaInput({ target: elm }) {
  // make sure the input event originated from a textarea and it's desired to be auto-expandable
  if (!elm.classList.contains('autoExpand') || !elm.nodeName == 'TEXTAREA') return

  var minRows = elm.getAttribute('data-min-rows') | 0, rows;
  !elm._baseScrollHeight && getScrollHeight(elm)

  elm.rows = minRows
  rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16)
  elm.rows = minRows + rows
}

// THEME

export const setTheme = theme => {
  const cssVariables = document.documentElement.style

  if (theme === 'light') {
      cssVariables.setProperty('--border-color', '#f3f3f3')
      cssVariables.setProperty('--background', '#f3f3f3')
      cssVariables.setProperty('--fixed-components-background', '#fcfdfc')
      cssVariables.setProperty('--heart-color', '#E0245E')
      cssVariables.setProperty('--heart-background-hover', 'rgba(224, 36, 94, .1)')
      cssVariables.setProperty('--primary-color', '#48D1AF')
      cssVariables.setProperty('--secondary-color', 'rgba(119, 147, 125, .1)')
      cssVariables.setProperty('--primary-color-hover', '#3FB597')
      cssVariables.setProperty('--primary-grey', '#363636')
      cssVariables.setProperty('--loader-background', 'rgba(119, 147, 125, .3)')
      cssVariables.setProperty('--theme-base-color', '#fff')
      cssVariables.setProperty('--theme-base-color-hover', 'rgba(255, 255, 255, 0.5)')
      cssVariables.setProperty('--view-more-select-border', 'rgba(0, 0, 0, .2)')

  } else if (theme === 'dark') {
      cssVariables.setProperty('--border-color', '#000')
      cssVariables.setProperty('--background', '#000')
      cssVariables.setProperty('--fixed-components-background', '#131313')
      cssVariables.setProperty('--heart-color', '#E0245E')
      cssVariables.setProperty('--heart-background-hover', 'rgba(224, 36, 94, .1)')
      cssVariables.setProperty('--primary-color', '#48D1AF')
      cssVariables.setProperty('--secondary-color', 'rgba(119, 147, 125, .1)')
      cssVariables.setProperty('--primary-color-hover', '#3FB597')
      cssVariables.setProperty('--primary-grey', '#D9D9D9')
      cssVariables.setProperty('--loader-background', 'rgba(119, 147, 125, .3)')
      cssVariables.setProperty('--theme-base-color', '#131313')
      cssVariables.setProperty('--theme-base-color-hover', 'rgba(255, 255, 255, 0.1)')
      cssVariables.setProperty('--view-more-select-border', 'rgba(255, 255, 255, .2)')
  }
}
