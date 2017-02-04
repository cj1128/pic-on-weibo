/*
* @Author: CJ Ting
* @Date:   2016-03-24 13:39:26
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-04-05 12:28:42
*/

import axios from "axios"
import CRC32 from "crc-32"
import { saveItem } from "history"

const UPLOAD_URL = "http://picupload.service.weibo.com/interface/pic_upload.php?mime=image%2Fjpeg&data=base64&url=0&markpos=1&logo=&nick=0&marks=1&app=miniblog"

// types: bmiddle, large, small
export function pid2url(pid) {
  const type = "large"
  let url, zone, ext
  if (pid[9] === "w") {
    zone = (CRC32.str(pid) & 3) + 1
    ext = (pid[21] == "g") ? "gif" : "jpg"
    url = `http://ww${zone}.sinaimg.cn/${type}/${pid}.${ext}`
  } else {
    zone = ((pid.substr(-2, 2), 16) & 0xf) + 1
    url = `http://ww${zone}.sinaimg.cn/${type}/${pid}`
  }
  return url
}

export function file2base64(file, cb) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = e => {
    const base64 = e.target.result.split(",")[1]
    cb(null, base64)
  }
}

export function sendRequest(file, cb) {
  const formData = new FormData()
  file2base64(file, (err, data) => {
    formData.append("b64_data", data)
    axios.post(UPLOAD_URL, formData, {
      withCredentials: true,
    })
      .then(res => {
        let text = res.data
        // response contains some html tags, WTF!
        text = text.replace(/<.*?\/>/, "")
        text = text.replace(/<(\w+).*?>.*?<\/\1>/, "")
        const json = JSON.parse(text)
        switch(json.code) {
          case "A20001":
            if(json.data.count === -1) {
              cb(new Error("请先登录微博！"))
            } else {
              cb(new Error("文件类型错误！"))
            }
            break
          case "A00006":
            const pid = json.data.pics.pic_1.pid
            const url = pid2url(pid)
            saveItem(url)
            cb(null, url)
            break
          default:
            cb(new Error("未知错误！"))
        }
      })
      .catch(error => {
        cb(error)
      })
  })
}

export const IconCopy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAllBMVEUAAAAAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/f+/svYAAAAMXRSTlMAAQIDBQYHCAkLDBEUFRgZHh8gIUJFS1ZYYmNmjpSbnaCytMXO0dXZ2uTm6e/z+fv9ErSjVQAAAJ1JREFUGFeVzkkWgkAUQ9GAJYgWonxFbBDseyT735wDQCg9DnzDO8gJAADwtNa6h3ZqS5IsVMu6e9K2bY/9xpzDbkIAqoXucdOREn0/CIKhApxTaqHCJ0nyDCQkyQuAMYsZACGQxyISuoB+zLMaKeX04L5A+oHebYkvXJMkpybmkYiMLBOp698/8coyA91QRERMrPoDI6mKG1zxXYIX1fwXXesnfg0AAAAASUVORK5CYII="

export const IconRemove = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAARVBMVEUAAAAAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/d7s64wAAAAFnRSTlMAAQMECAoRFBgmWHudvMXHzN7m8fP9sGJYjAAAAG9JREFUGFeFz8kWwBAMQNGgk5bO8v+f2iiHRBe1MNyNPADtjx7KsmGhXXvEqjYgkg4XVo2GqwYYqyYz8VqUWVFhWU9pWRsjvaNtwtIfbN5qUl/beUWZj1WwmX/apm+bAeXatplO5WRbNFLR0fEHXw/Y0g0Vul7qvgAAAABJRU5ErkJggg=="
