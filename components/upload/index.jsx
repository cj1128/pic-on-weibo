/*
* @Author: CJ Ting
* @Date:   2016-04-01 14:51:34
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-04-05 10:16:16
*/

import "./style.styl"
import React from "react"
import Dropzone from "react-dropzone"
import "sweetalert/dist/sweetalert.css"
import swal from "sweetalert"
import { pid2url, sendRequest } from "utils"
import Clipboard from "clipboard"

export default class Upload extends React.Component {
  state = {
    files: [],
  }

  componentDidMount() {
    window.addEventListener("paste", this.handlePaste)
  }

  componentWillUnmount() {
    window.removeEventListener("paste", this.handlePaste)
  }

  handlePaste = (evt) => {
    var items = evt.clipboardData.items
    if(!items) return

    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        var blob = items[i].getAsFile()
        var source = window.URL.createObjectURL(blob)
        blob.preview = source
        this.setState({
          files: [blob],
        }, this.uploadFiles)
      }
    }
  }

  handleDrop = (files) => {
    this.setState({files: files}, this.uploadFiles)
  }

  uploadFiles() {
    const files = this.state.files
    for(let file of files) {
      sendRequest(file, (err, url) => {
        if(err) {
          this.setState({
            files: [],
          }, () => swal(err.message, "", "error"))
        } else {
          file.url = url
          this.setState({
            files: files
          })
        }
      })
    }
  }

  renderFiles() {
    return this.state.files.map(file =>
      <Item
        url={ file.url }
        file={ file }
        key={ file.preview }
      />
    )
  }

  render() {
    return (
      <div className="upload">
        <Dropzone
          accept="image/*"
          className="upload__dropzone"
          activeClassName="upload__dropzone--active"
          onDrop={ this.handleDrop }
        >
          {
            this.state.files.length === 0 ?
              <p className="upload__placeholder">
                点击、拖拽或复制上传~支持多个文件~
              </p>
              :
              this.renderFiles()
          }
        </Dropzone>
        <p className="upload__tip">
          注意：上传前请先登录微博。上传的图片无法删除，请不要上传任何隐私图片。
        </p>
      </div>
    )
  }
}

class Item extends React.Component {
  static propTypes = {
    file: React.PropTypes.object.isRequired,
    url: React.PropTypes.object,
  }

  componentDidMount() {
    this.clipboard = new Clipboard(".upload__copy-btn", {
      target: function(trigger) {
        return trigger.parentNode.children[1]
      },
    })
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  handleClick(evt) {
    evt.stopPropagation()
  }

  renderResults() {
    const url = this.props.url
    return (
      <ul
        ref="results"
        className="upload__item__results"
        onClick={ this.handleClick }
      >
        <li>
          <span>大图</span>
          <span>
            { url.large }
          </span>
          <span className="upload__copy-btn">复制</span>
        </li>
        <li>
          <span>中图</span>
          <span>
            { url.middle }
          </span>
          <span className="upload__copy-btn">复制</span>
        </li>
        <li>
          <span>小图</span>
          <span>
            { url.small }
          </span>
          <span className="upload__copy-btn">复制</span>
        </li>
      </ul>
    )
  }

  render() {
    return (
      <div
        className="upload__item"
        onClick={ this.handleClick }
      >
        <img src={ this.props.file.preview } />
        {
          this.props.url ?
            this.renderResults()
            :
            <span className="upload__item__status">
              上传中...
            </span>
        }
      </div>
    )
  }
}
