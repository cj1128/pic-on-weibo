/*
* @Author: CJ Ting
* @Date:   2016-04-01 14:39:09
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-04-05 18:54:00
*/

import "./style"
import React from "react"
import Clipboard from "clipboard"
import { IconCopy } from "utils"
import swal from "sweetalert"
const LS = window.localStorage

const IconDownload = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAV1BMVEUAAAAAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/fjXlVDAAAAHHRSTlMAAQUHCQoRGBkcHz9AUFZecYCVqLTK0dPp7ff5cWDvugAAAGlJREFUGNO1zckKwCAMBNDYfdfui/n/76xKDFZKbx1yGB7oAHyk0YhLjB2a/I3JiRzJOrFdFaPwetXBB6QPI43MaWCje7inQpbQu34UQBNbDjBQbz2inndfO8AwKrMX4arstTQUxgy95Qa+KRMWu5MJ+wAAAABJRU5ErkJggg=="

const IconUpload = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAWlBMVEUAAAAAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/eRmVa5AAAAHXRSTlMAAQMFDhITFhgZHB82OD9AXV5jfouVtNfp7e/3+ZdH8s8AAABkSURBVBjTtc5HDsAgDABBk96d3v3/byYgQMFwzYqDGSFkAJ0YCuCJha7KN+KqjKk2V429WhqLD4vUf39FKXylP7C+iVZ7m9UmYyTnfJPzngH5dSFEF6dEHoTTf9lC2iGrERDqAQeqE26RucCwAAAAAElFTkSuQmCC"

const IconListActive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAAAAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/fAwRjQAAAAGnRSTlMAAQIHCx0nKissLjg7paaqvL7Z2uLk7e/5+wGfAG4AAABiSURBVBjTpdDbCoAgEATQSe1+11Lb///QkDI0JALnSYZlPQox6qXEKzMR6QJoFV3ZesC4Awc76An3k8yGpZjM6nbW8q72AbnxziYk+dsj0pczfpF3ZpIqmSDZ36ROBb+UIp3E0hIdQF/DiAAAAABJRU5ErkJggg=="

const IconListGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAACqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo7vbaqAAAAGnRSTlMAAQIHCx0nKissLjg7paaqvL7Z2uLk7e/5+wGfAG4AAABiSURBVBjTpdDbCoAgEATQSe1+11Lb///QkDI0JALnSYZlPQox6qXEKzMR6QJoFV3ZesC4Awc76An3k8yGpZjM6nbW8q72AbnxziYk+dsj0pczfpF3ZpIqmSDZ36ROBb+UIp3E0hIdQF/DiAAAAABJRU5ErkJggg=="

const IconGridActive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAgMAAADw5/WeAAAADFBMVEUAAAAAh/cAh/cAh/eCopStAAAAA3RSTlMAEEDGaJcfAAAAHklEQVQImWP4/49h/38GYshVKxmyVjHgAhBZok0DAGMLOQkltiVSAAAAAElFTkSuQmCC"

const IconGridGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAgMAAADw5/WeAAAADFBMVEUAAACqqqqqqqqqqqqK98J9AAAAA3RSTlMAEEDGaJcfAAAAHklEQVQImWP4/49h/38GYshVKxmyVjHgAhBZok0DAGMLOQkltiVSAAAAAElFTkSuQmCC"

const IconRemove = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAARVBMVEUAAAAAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/d7s64wAAAAFnRSTlMAAQMECAoRFBgmWHudvMXHzN7m8fP9sGJYjAAAAG9JREFUGFeFz8kWwBAMQNGgk5bO8v+f2iiHRBe1MNyNPADtjx7KsmGhXXvEqjYgkg4XVo2GqwYYqyYz8VqUWVFhWU9pWRsjvaNtwtIfbN5qUl/beUWZj1WwmX/apm+bAeXatplO5WRbNFLR0fEHXw/Y0g0Vul7qvgAAAABJRU5ErkJggg=="

export default class History extends React.Component {
  state = {
    layout: "list",
  }

  componentDidMount() {
    this.clipboard = new Clipboard(".history__copy-btn", {
      target: function(trigger) {
        return trigger.parentNode.children[1]
      },
    })
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  exportHistory() {
    if(LS.getItem("history")) {
      window.open().document.write(LS.getItem("history"))
    } else {
      swal("当前没有任何历史记录!", "", "error")
    }
  }

  importHistory = () => {
    swal({
      title: "输入导出的JSON数据",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "json data",
    }, input => {
      try {
        const inputArr = JSON.parse(input)
        const history = JSON.parse(LS.getItem("history")) || []
        history.push(inputArr)
        LS.setItem("history", JSON.stringify(history))
        this.forceUpdate()
      } catch(e) {
        swal("输入数据错误！", "", "error")
      }
    })
  }

  clearHistory = () => {
    swal({
      title: "确定清除所有历史记录吗?",
      type: "warning",
      showCancelButton: true,
    }, isConfirmed => {
      if(isConfirmed) {
        LS.removeItem("history")
        this.forceUpdate()
      }
    })
  }

  renderItems(items) {
    return items.map(item => <div className="history__item" key={ item.large }>
      <div className="history__img-container">
        <img src={ item.large } />
      </div>
      <ul
        ref="results"
        className="history__item__results"
        onClick={ this.handleClick }
      >
        <li>
          <span>大图</span>
          <span>
            { item.large }
          </span>
          <img
            title="复制URL"
            src={ IconCopy }
            className="history__copy-btn"
          />
        </li>
        <li>
          <span>中图</span>
          <span>
            { item.middle }
          </span>
          <img
            title="复制URL"
            src={ IconCopy }
            className="history__copy-btn"
          />
        </li>
        <li>
          <span>小图</span>
          <span>
            { item.small }
          </span>
          <img
            title="复制URL"
            src={ IconCopy }
            className="history__copy-btn"
          />
        </li>
      </ul>
    </div>
    )
  }

  render() {
    const items = JSON.parse(LS.getItem("history")) || []
    let listIcon, gridIcon
    if(this.state.layout === "grid") {
      listIcon = IconListGray
      gridIcon = IconGridActive
    } else {
      listIcon = IconListActive
      gridIcon = IconGridGray
    }
    return (
      <div className="history">
        <header className="history__header">
          <div className="history__header__layout">
            <img
              title="列表布局"
              src={ listIcon }
              onClick={ () => this.setState({layout: "list"}) }
            />
            <img
              title="格子布局"
              src={ gridIcon }
              onClick={ () => this.setState({layout: "grid"}) }
            />
          </div>

          <div className="history__header__btn">
            <img
              onClick={ this.clearHistory }
              title="清除"
              src={ IconRemove }
            />
          </div>
        </header>

        {
          items.length === 0 ?
            <p className="history__tip">
            目前没有任何上传记录
            </p>
            :
            <div
              className={ `history__${this.state.layout}-items` }
            >
              { this.renderItems(items) }
            </div>
        }
      </div>
    )
  }
}
