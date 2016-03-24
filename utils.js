/*
* @Author: CJ Ting
* @Date:   2016-03-24 13:39:26
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-03-24 16:01:02
*/

import $ from "jquery"
import CRC32 from "crc-32"

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

export function sendRequest(file, success) {
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
      success: success,
    })
  })
}
