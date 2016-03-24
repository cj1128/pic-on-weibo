/*
* @Author: dingxijin
* @Date:   2016-03-24 12:22:22
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-03-24 16:01:20
*/

import "./app.styl"
import React from "react"
import Dropzone from "dropzone"
import { pid2url, sendRequest } from "utils"

export default class App extends React.Component {
  componentDidMount() {
    this.dropzone = new Dropzone("#dropzone", {
      paramName: "pic1",
      autoProcessQueue: false,
    })
    this.dropzone.on("addedfile", file => {
      console.log("Added file: ", file)
      sendRequest(file, text => {
        var result = JSON.parse(text.slice(140))
        switch(result.code) {
          case "A20001":
            alert("请先登录微博!")
            break
          case "A00006":
            const pid = result.data.pics.pic_1.pid
            console.log("URL: ", pid2url(pid))
            break
          default:
            alert("未知错误")
        }
      })
    })
  }

  render() {
    return (
      <div id="app">
        <form
          id="dropzone"
          action= "http://picupload.service.weibo.com/interface/pic_upload.php?&mime=image%2Fjpeg&url=0&markpos=1&logo=&nick=0&marks=1&app=miniblog"
        />
      </div>
    )
  }
}
