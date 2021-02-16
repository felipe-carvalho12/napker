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

  //Colors

  const toRgb = value => `rgba(${value})`

  const rgbToCss = (cssVar, defaultVar, theme) => {

    const colorVariants = ["-0", "-1", "-2", "-3", "-4", "-5", "-6", "-7"]
    const variantWeights = [0.8, 0.6, 0.4, 0.20, 0.16, 0.12, 0.08, 0.04]

    let data = ((window.localStorage.getItem(`${cssVar},${theme}`) && window.localStorage.getItem(`${theme}-switch`) === "true") ?
      window.localStorage.getItem(`${cssVar},${theme}`)
      :
      defaultVar
    ).replace(/ /g, "").split(",")

    data = data.map(val => parseFloat(val))

    cssVariables.setProperty(cssVar, toRgb(rgbToString(data[0], data[1], data[2], data[3])))
    cssVariables.setProperty(cssVar + "-hover", toRgb(rgbToString(hoverFormula(data[0]), hoverFormula(data[1]), hoverFormula(data[2]), data[3])))
    for (let i in colorVariants) {
      cssVariables.setProperty(cssVar + colorVariants[i], toRgb(rgbToString(data[0], data[1], data[2], variantWeights[i] * data[3])))
    }
  }

  const rgbToString = (redValue, greenValue, blueValue, opacityValue) => {
    return `${String(redValue)},${String(greenValue)},${String(blueValue)},${String(opacityValue)}`
  }

  const hoverFormula = color => {
    return ((color + ((255 - color) * 0.2)) >= 255 ?
      (color - (color * 0.05))
      :
      (color + ((255 - color) * 0.2))
    )
  }

  //Variables

  const varToCss = (cssVar, defaultVar, theme) => {


    const sizeVariants = ["-0", "-1", "-2", "-3", "-4", "-5"]
    const variantSizes = [0.5, 1, 2, 3, 4, 5]

    let data = parseInt((window.localStorage.getItem(`${cssVar},${theme}`) && window.localStorage.getItem(`${theme}-switch`) === "true") ?
      window.localStorage.getItem(`${cssVar},${theme}`)
      :
      defaultVar
    )

    for (let i in sizeVariants) {
      cssVariables.setProperty(cssVar + sizeVariants[i], String(data * variantSizes[i]) + "px")
    }

    cssVariables.setProperty(cssVar, data + "px")
  }

  //Apply

  if (theme === 'light') {
    varToCss('--sz', "10", 'light')
    varToCss('--b-r', "10", 'light')
    rgbToCss('--primary-color', "0  , 192, 136, 1   ", 'light')
    rgbToCss('--background', "235, 235, 235, 1   ", 'light')
    rgbToCss('--primary-grey', "000, 000, 000,  .90", 'light')
    rgbToCss('--secondary-grey', "000, 000, 000,  .60", 'light')
    rgbToCss('--theme-base-color', "255, 255, 255,  .60", 'light')
    rgbToCss('--fixed-components-background', "255, 255, 255,  .60", 'light')
    cssVariables.setProperty('--border-color', 'var(--w-08)')
    cssVariables.setProperty('--b-c', 'var(--b-04)')
    cssVariables.setProperty('--b-w-10', 'var(--w-10)')
    cssVariables.setProperty('--b-w-11', 'var(--w-11)')
    cssVariables.setProperty('--b-w-12', 'var(--w-12)')
    cssVariables.setProperty('--heart-color', '#E0245E')
    cssVariables.setProperty('--heart-background-hover', 'rgba(224, 36, 94, .1)')
    cssVariables.setProperty('--loader-background', 'rgba(119, 147, 125, .3)')
    cssVariables.setProperty('--tertiary-grey', '#f2f2f2')
    cssVariables.setProperty('--view-more-select-border', 'rgba(0, 0, 0, .2)')
    cssVariables.setProperty('--img-background', 'rgba(0, 0, 0, .9)')
    cssVariables.setProperty('--img-background-hover', 'rgba(0, 0, 0, .8)')

  } else if (theme === 'dark') {
    varToCss('--sz', "10", 'dark')
    varToCss('--b-r', "10", 'dark')
    rgbToCss('--primary-color', '  0, 192, 136, 1   ', 'dark')
    rgbToCss('--background', '051, 051, 051, 1   ', 'dark')
    rgbToCss('--primary-grey', '255, 255, 255,  .90', 'dark')
    rgbToCss('--secondary-grey', '255, 255, 255,  .70', 'dark')
    rgbToCss('--theme-base-color', '255, 255, 255,  .04', 'dark')
    rgbToCss('--fixed-components-background', '255, 255, 255,  .04', 'dark')
    cssVariables.setProperty('--border-color', 'var(--w-00)')
    cssVariables.setProperty('--b-c', 'var(--w-04)')
    cssVariables.setProperty('--b-w-10', 'var(--b-10)')
    cssVariables.setProperty('--b-w-11', 'var(--b-11)')
    cssVariables.setProperty('--b-w-12', 'var(--b-12)')
    cssVariables.setProperty('--heart-color', '#E0245E')
    cssVariables.setProperty('--heart-background-hover', 'rgba(224, 36, 94, .1)')
    cssVariables.setProperty('--loader-background', 'rgba(119, 147, 125, .3)')
    cssVariables.setProperty('--tertiary-grey', '#202020')
    cssVariables.setProperty('--view-more-select-border', 'rgba(255, 255, 255, .2)')
    cssVariables.setProperty('--img-background', 'rgba(0, 0, 0, .3)')
    cssVariables.setProperty('--img-background-hover', 'rgba(0, 0, 0, .3)')
  }
}


// YOUTUBE IFRAME

export const getThumbnailSrc = iframeSrc => {
  const youtube_video_id = iframeSrc.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop()

  return `https://img.youtube.com/vi/${youtube_video_id}/0.jpg`
}


// ALGORITHM WEIGHTS SORTING

export const sortedPosts = (posts, weights) => {
  const getPoints = post => {
    const authorPoints = (
      (post.interest_points * weights.profile.interest_weight) +
      (post.age_points * weights.profile.age_weight) +
      (post.friends_points * weights.profile.friends_weight) +
      (post.is_friend_boolean * weights.profile.is_friend_weight)
    )
    return authorPoints * weights.post.author_weight + post.date_points * weights.post.date_weight + post.likes_points * weights.post.likes_weight
  }


  return posts.sort((a, b) => {
      if (getPoints(a) > getPoints(b)) return -1
      else if (getPoints(a) < getPoints(b)) return 1
      return 0
  })
}
