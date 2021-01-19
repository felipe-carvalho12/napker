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

// TIMESTAMP

export const renderTimestamp = timestamp => {
  const ts = new Date(timestamp)
  const day = ts.getDate() >= 10 ? ts.getDate() : `0${ts.getDate()}`
  const month = ts.getMonth() + 1 >= 10 ? ts.getMonth() + 1 : `0${ts.getMonth() + 1}`
  const hour = ts.getHours() >= 10 ? ts.getHours() : `0${ts.getHours()}`
  const minute = ts.getMinutes() >= 10 ? ts.getMinutes() : `0${ts.getMinutes()}`
  return `${day}/${month}/${ts.getFullYear()} - ${hour}:${minute}`
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

  const toRgb = value => `rgba(${value})`

  const toCss = (cssVar, defaultVar) => {
    cssVariables.setProperty(cssVar, 
      window.localStorage.getItem(cssVar) ? 
        toRgb(window.localStorage.getItem(cssVar).split(","))
        :
        defaultVar
    )
  }

  if (theme === 'light') {
    toCss('--border-color'               ,                 'var(--w-08)')
    toCss('--background'                 ,               'var(--s-b-01)')
    toCss('--fixed-components-background',                 'var(--w-08)')
    toCss('--b-c'                        ,                 'var(--b-04)')
    toCss('--heart-color'                ,                     '#E0245E')
    toCss('--heart-background-hover'     ,       'rgba(224, 36, 94, .1)')
    toCss('--primary-grey'               ,                 'var(--b-11)')
    toCss('--secondary-grey'             ,                 'var(--b-08)')
    toCss('--loader-background'          ,     'rgba(119, 147, 125, .3)')
    toCss('--theme-base-color'           ,                 "var(--w-08)")
    toCss('--theme-base-color-hover'     ,                 'var(--w-11)')
    toCss('--tertiary-grey'              ,                     '#f2f2f2')
    toCss('--view-more-select-border'    ,           'rgba(0, 0, 0, .2)')
    toCss('--img-background'             ,           'rgba(0, 0, 0, .9)')
    toCss('--img-background-hover'       ,           'rgba(0, 0, 0, .8)')

  } else if (theme === 'dark') {
    toCss('--border-color'               ,                 'var(--w-00)')
    toCss('--background'                 ,               'var(--s-b-10)')
    toCss('--fixed-components-background',                 'var(--w-00)')
    toCss('--b-c'                        ,                 'var(--w-04)')
    toCss('--heart-color'                ,                     '#E0245E')
    toCss('--heart-background-hover'     ,       'rgba(224, 36, 94, .1)')
    toCss('--primary-grey'               ,                 'var(--w-11)')
    toCss('--secondary-grey'             ,                 'var(--w-09)')
    toCss('--loader-background'          ,     'rgba(119, 147, 125, .3)')
    toCss('--theme-base-color'           ,                 'var(--w-00)')
    toCss('--theme-base-color-hover'     ,               'var(--s-b-09)')
    toCss('--tertiary-grey'              ,                     '#202020')
    toCss('--view-more-select-border'    ,     'rgba(255, 255, 255, .2)')
    toCss('--img-background'             ,           'rgba(0, 0, 0, .3)')
    toCss('--img-background-hover'       ,           'rgba(0, 0, 0, .3)')
  }
}
