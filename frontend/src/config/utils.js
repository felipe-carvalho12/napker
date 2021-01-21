import { SERVER_URL } from './settings'

export const getCookie = name => {
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

export const csrftoken = getCookie('csrftoken')

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

export const setTheme = () => {
  const cssVariables = document.documentElement.style
  const theme = window.localStorage.getItem('theme') || 'light'

  const toRgb = value => `rgba(${value})`

  const toCss = (cssVar, defaultVar, theme) => {
    const data = window.localStorage.getItem(`${cssVar},${theme}`) && window.localStorage.getItem(`${cssVar},${theme}`).split(",")
    cssVariables.setProperty(cssVar, 
      (data && window.localStorage.getItem(`${theme}-switch`) === "true") ? 
        toRgb(data)
        :
        defaultVar
    )
  }

  if (theme === 'light') {
    toCss('--primary-color'              ,        'rgba(0,192,136,1   )', 'light')
    toCss('--primary-color-0'            ,        'rgba(0,192,136,0.8 )', 'light')
    toCss('--primary-color-1'            ,        'rgba(0,192,136,0.6 )', 'light')
    toCss('--primary-color-2'            ,        'rgba(0,192,136,0.4 )', 'light')
    toCss('--primary-color-3'            ,        'rgba(0,192,136,0.20)', 'light')
    toCss('--primary-color-4'            ,        'rgba(0,192,136,0.16)', 'light')
    toCss('--primary-color-5'            ,        'rgba(0,192,136,0.12)', 'light')
    toCss('--primary-color-6'            ,        'rgba(0,192,136,0.08)', 'light')
    toCss('--primary-color-7'            ,        'rgba(0,192,136,0.04)', 'light')
    toCss('--primary-color-hover'        ,        'rgba(0,178,125,1   )', 'light')
    toCss('--border-color'               ,                 'var(--w-08)', 'light')
    toCss('--background'                 ,               'var(--s-b-01)', 'light')
    toCss('--fixed-components-background',                 'var(--w-08)', 'light')
    toCss('--b-c'                        ,                 'var(--b-04)', 'light')
    toCss('--b-w-10'                     ,                 'var(--w-10)', 'light')
    toCss('--b-w-11'                     ,                 'var(--w-11)', 'light')
    toCss('--b-w-12'                     ,                 'var(--w-12)', 'light')
    toCss('--heart-color'                ,                     '#E0245E', 'light')
    toCss('--heart-background-hover'     ,       'rgba(224, 36, 94, .1)', 'light')
    toCss('--primary-grey'               ,                 'var(--b-11)', 'light')
    toCss('--secondary-grey'             ,                 'var(--b-08)', 'light')
    toCss('--loader-background'          ,     'rgba(119, 147, 125, .3)', 'light')
    toCss('--theme-base-color'           ,                 "var(--w-08)", 'light')
    toCss('--theme-base-color-hover'     ,                 'var(--w-11)', 'light')
    toCss('--tertiary-grey'              ,                     '#f2f2f2', 'light')
    toCss('--view-more-select-border'    ,           'rgba(0, 0, 0, .2)', 'light')
    toCss('--img-background'             ,           'rgba(0, 0, 0, .9)', 'light')
    toCss('--img-background-hover'       ,           'rgba(0, 0, 0, .8)', 'light')

  } else if (theme === 'dark') {
    toCss('--primary-color'              ,        'rgba(0,192,136,1   )', 'dark')
    toCss('--primary-color-0'            ,        'rgba(0,192,136,0.8 )', 'dark')
    toCss('--primary-color-1'            ,        'rgba(0,192,136,0.6 )', 'dark')
    toCss('--primary-color-2'            ,        'rgba(0,192,136,0.4 )', 'dark')
    toCss('--primary-color-3'            ,        'rgba(0,192,136,0.20)', 'dark')
    toCss('--primary-color-4'            ,        'rgba(0,192,136,0.16)', 'dark')
    toCss('--primary-color-5'            ,        'rgba(0,192,136,0.12)', 'dark')
    toCss('--primary-color-6'            ,        'rgba(0,192,136,0.08)', 'dark')
    toCss('--primary-color-7'            ,        'rgba(0,192,136,0.04)', 'dark')
    toCss('--primary-color-hover'        ,         'rgba(0,178,125,  1)', 'dark')
    toCss('--border-color'               ,                 'var(--w-00)', 'dark')
    toCss('--background'                 ,               'var(--s-b-10)', 'dark')
    toCss('--fixed-components-background',                 'var(--w-00)', 'dark')
    toCss('--b-c'                        ,                 'var(--w-04)', 'dark')
    toCss('--b-w-10'                     ,                 'var(--b-10)', 'dark')
    toCss('--b-w-11'                     ,                 'var(--b-11)', 'dark')
    toCss('--b-w-12'                     ,                 'var(--b-12)', 'dark')
    toCss('--heart-color'                ,                     '#E0245E', 'dark')
    toCss('--heart-background-hover'     ,       'rgba(224, 36, 94, .1)', 'dark')
    toCss('--primary-grey'               ,                 'var(--w-11)', 'dark')
    toCss('--secondary-grey'             ,                 'var(--w-09)', 'dark')
    toCss('--loader-background'          ,     'rgba(119, 147, 125, .3)', 'dark')
    toCss('--theme-base-color'           ,                 'var(--w-00)', 'dark')
    toCss('--theme-base-color-hover'     ,               'var(--s-b-09)', 'dark')
    toCss('--tertiary-grey'              ,                     '#202020', 'dark')
    toCss('--view-more-select-border'    ,     'rgba(255, 255, 255, .2)', 'dark')
    toCss('--img-background'             ,           'rgba(0, 0, 0, .3)', 'dark')
    toCss('--img-background-hover'       ,           'rgba(0, 0, 0, .3)', 'dark')
  }
}


// YOUTUBE IFRAME

export const getThumbnailSrc = iframeSrc => {
  const youtube_video_id = iframeSrc.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop()

  return `https://img.youtube.com/vi/${youtube_video_id}/0.jpg`
}