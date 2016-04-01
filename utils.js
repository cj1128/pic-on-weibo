/*
* @Author: CJ Ting
* @Date:   2016-03-24 13:39:26
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-04-01 15:07:11
*/

import $ from "jquery"
import CRC32 from "crc-32"

function save(url) {
  const ls = window.localStorage
  const store = ls.getItem("history") ? JSON.parse(ls.getItem("history")) : []
  store.push(url)
  ls.setItem("history", JSON.stringify(store))
}

// types: bmiddle, large, small
export function pid2url(pid, type = "large") {
  var url, zone, ext
  if (pid[9] === "w") {
    zone = (CRC32.str(pid) & 3) + 1
    ext = (pid[21] == "g") ? "gif" : "jpg"
    url = `http://ww${zone}.sinaimg.cn/${type}/${pid}.${ext}`
  } else {
    zone = ((pid.substr(-2, 2), 16) & 0xf) + 1
    url = `http://ss${zone}.sinaimg.cn/${type}/${pid}&690`
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
    $.ajax({
      method: "POST",
      url: "http://picupload.service.weibo.com/interface/pic_upload.php?&mime=image%2Fjpeg&data=base64&url=0&markpos=1&logo=&nick=0&marks=1&app=miniblog",
      processData: false,
      contentType: false,
      xhrFields: {
        withCredentials: __DEV__ ? true : false,
      },
      data: formData,
      success: result => {
        const json = JSON.parse(result.slice(140))
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
            const url = {
              large: pid2url(pid, "large"),
              middle: pid2url(pid, "bmiddle"),
              small: pid2url(pid, "small"),
            }
            save(url)
            cb(null, url)
            break
          default:
            cb(new Error("未知错误！"))
        }
      },
      error: (jqXHR, status, err) => {
        cb(new Error(err))
      },
    })
  })
}
