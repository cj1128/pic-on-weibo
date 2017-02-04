/*
* @Author: CJ Ting
* @Date: 2017-02-04 17:09:18
* @Email: fatelovely1128@gmail.com
*/

const DATA_KEY = "history"
let images = []

if(localStorage.getItem(DATA_KEY) != null) {
  images = JSON.parse(localStorage.getItem(DATA_KEY))
}

export function saveItem(url) {
  images.unshift({
    url: url,
    timestamp: new Date().getTime(),
  })
  localStorage.setItem(DATA_KEY, JSON.stringify(images))
}

export function getItems() {
  return images
}

export function clearItems() {
  images = []
  localStorage.setItem(DATA_KEY, JSON.stringify(images))
}
