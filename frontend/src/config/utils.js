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

  if (theme === 'light') {
    cssVariables.setProperty('--border-color'               ,                 'var(--w-09)')
    cssVariables.setProperty('--background'                 ,                 'var(--b-00)')
    cssVariables.setProperty('--fixed-components-background',                 'var(--w-09)')
    cssVariables.setProperty('--b-c'                        ,                 'var(--b-04)')
    cssVariables.setProperty('--heart-color'                ,                     '#E0245E')
    cssVariables.setProperty('--heart-background-hover'     ,       'rgba(224, 36, 94, .1)')
    cssVariables.setProperty('--primary-color'              ,                     '#48D1AF')
    cssVariables.setProperty('--secondary-color'            ,     'rgba(119, 147, 125, .1)')
    cssVariables.setProperty('--primary-color-hover'        ,                     '#3FB597')
    cssVariables.setProperty('--primary-grey'               ,                     '#363636')
    cssVariables.setProperty('--secondary-grey'             ,                     '#757575')
    cssVariables.setProperty('--loader-background'          ,     'rgba(119, 147, 125, .3)')
    cssVariables.setProperty('--theme-base-color'           ,                 'var(--w-09)')
    cssVariables.setProperty('--tertiary-grey'              ,                     '#f2f2f2')
    cssVariables.setProperty('--theme-base-color-hover'     ,          'rgb(248, 248, 248)')
    cssVariables.setProperty('--view-more-select-border'    ,           'rgba(0, 0, 0, .2)')
    cssVariables.setProperty('--img-background'             ,           'rgba(0, 0, 0, .9)')
    cssVariables.setProperty('--img-background-hover'       ,           'rgba(0, 0, 0, .8)')

  } else if (theme === 'dark') {
    cssVariables.setProperty('--border-color'               ,                 'var(--w-00)')
    cssVariables.setProperty('--background'                 ,                 'var(--b-11)')
    cssVariables.setProperty('--fixed-components-background',                 'var(--w-00)')
    cssVariables.setProperty('--b-c'                        ,                 'var(--w-04)')
    cssVariables.setProperty('--heart-color'                ,                     '#E0245E')
    cssVariables.setProperty('--heart-background-hover'     ,       'rgba(224, 36, 94, .1)')
    cssVariables.setProperty('--primary-color'              ,                     '#48D1AF')
    cssVariables.setProperty('--secondary-color'            ,     'rgba(119, 147, 125, .1)')
    cssVariables.setProperty('--primary-color-hover'        ,                     '#3FB597')
    cssVariables.setProperty('--primary-grey'               ,                     '#D9D9D9')
    cssVariables.setProperty('--secondary-grey'             ,                     '#909090')
    cssVariables.setProperty('--loader-background'          ,     'rgba(119, 147, 125, .3)')
    cssVariables.setProperty('--theme-base-color'           ,                 'var(--w-00)')
    cssVariables.setProperty('--tertiary-grey'              ,             '#202020'        )
    cssVariables.setProperty('--theme-base-color-hover'     ,             'rgb(30, 30, 30)')
    cssVariables.setProperty('--view-more-select-border'    ,     'rgba(255, 255, 255, .2)')
    cssVariables.setProperty('--img-background'             ,           'rgba(0, 0, 0, .3)')
    cssVariables.setProperty('--img-background-hover'       ,           'rgba(0, 0, 0, .3)')
  }
}
