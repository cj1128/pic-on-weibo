/*
* @Author: dingxijin
* @Date:   2016-03-24 12:22:22
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-03-30 18:10:01
*/

import "./app.styl"
import React from "react"
import Dropzone from "react-dropzone"
import "sweetalert/dist/sweetalert.css"
import swal from "sweetalert"
import { pid2url, sendRequest } from "utils"

export default class App extends React.Component {
  state = {
    files: [],
  }

  handleDrop = (files) => {
    this.setState({files: files}, () => {
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
    })
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
      <div id="app">
        <Dropzone
          accept="image/*"
          className="dropzone"
          activeClassName="dropzone--active"
          onDrop={ this.handleDrop }
        >
          {
            this.state.files.length === 0 ?
              <p className="placeholder">
                拖拽或复制上传~支持多个文件~
              </p>
              :
              this.renderFiles()
          }
        </Dropzone>
        <p className="tip">
          注意：上传的图片无法删除，请不要上传任何隐私图片。
        </p>
      </div>
    )
  }
}

const Item = ({file, url}) =>
  <div
    className="item"
  >
    <img src={ file.preview } />
    {
      url ?
        <ItemResult url={ url } />
        :
        <span className="item__status">
          上传中...
        </span>
    }
  </div>

class ItemResult extends React.Component {
  static propTypes = {
    url: React.PropTypes.object.isRequired,
  }

  handleClick(evt) {
    evt.stopPropagation()
  }

  render() {
    const url = this.props.url
    return (
      <ul
        className="item__result"
        onClick={ this.handleClick }
      >
        <li>
          <span>大图</span>
          <span>
            { url.large }
          </span>
          <span>复制</span>
        </li>
        <li>
          <span>中图</span>
          <span>
            { url.middle }
          </span>
          <span>复制</span>
        </li>
        <li>
          <span>小图</span>
          <span>
            { url.small }
          </span>
          <span>复制</span>
        </li>
      </ul>
    )
  }
}
