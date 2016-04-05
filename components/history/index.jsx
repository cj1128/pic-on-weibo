/*
* @Author: CJ Ting
* @Date:   2016-04-01 14:39:09
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-04-05 12:30:22
*/

import "./style"
import React from "react"
import Clipboard from "clipboard"
import { IconCopy } from "utils"

const IconDownload = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAV1BMVEUAAAAAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/fjXlVDAAAAHHRSTlMAAQUHCQoRGBkcHz9AUFZecYCVqLTK0dPp7ff5cWDvugAAAGlJREFUGNO1zckKwCAMBNDYfdfui/n/76xKDFZKbx1yGB7oAHyk0YhLjB2a/I3JiRzJOrFdFaPwetXBB6QPI43MaWCje7inQpbQu34UQBNbDjBQbz2inndfO8AwKrMX4arstTQUxgy95Qa+KRMWu5MJ+wAAAABJRU5ErkJggg=="

const IconListActive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAAAAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/fAwRjQAAAAGnRSTlMAAQIHCx0nKissLjg7paaqvL7Z2uLk7e/5+wGfAG4AAABiSURBVBjTpdDbCoAgEATQSe1+11Lb///QkDI0JALnSYZlPQox6qXEKzMR6QJoFV3ZesC4Awc76An3k8yGpZjM6nbW8q72AbnxziYk+dsj0pczfpF3ZpIqmSDZ36ROBb+UIp3E0hIdQF/DiAAAAABJRU5ErkJggg=="

const IconListGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAACqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo7vbaqAAAAGnRSTlMAAQIHCx0nKissLjg7paaqvL7Z2uLk7e/5+wGfAG4AAABiSURBVBjTpdDbCoAgEATQSe1+11Lb///QkDI0JALnSYZlPQox6qXEKzMR6QJoFV3ZesC4Awc76An3k8yGpZjM6nbW8q72AbnxziYk+dsj0pczfpF3ZpIqmSDZ36ROBb+UIp3E0hIdQF/DiAAAAABJRU5ErkJggg=="

const IconGridActive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAgMAAADw5/WeAAAADFBMVEUAAAAAh/cAh/cAh/eCopStAAAAA3RSTlMAEEDGaJcfAAAAHklEQVQImWP4/49h/38GYshVKxmyVjHgAhBZok0DAGMLOQkltiVSAAAAAElFTkSuQmCC"

const IconGridGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAgMAAADw5/WeAAAADFBMVEUAAACqqqqqqqqqqqqK98J9AAAAA3RSTlMAEEDGaJcfAAAAHklEQVQImWP4/49h/38GYshVKxmyVjHgAhBZok0DAGMLOQkltiVSAAAAAElFTkSuQmCC"

const IconRemove = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAARVBMVEUAAAAAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/d7s64wAAAAFnRSTlMAAQMECAoRFBgmWHudvMXHzN7m8fP9sGJYjAAAAG9JREFUGFeFz8kWwBAMQNGgk5bO8v+f2iiHRBe1MNyNPADtjx7KsmGhXXvEqjYgkg4XVo2GqwYYqyYz8VqUWVFhWU9pWRsjvaNtwtIfbN5qUl/beUWZj1WwmX/apm+bAeXatplO5WRbNFLR0fEHXw/Y0g0Vul7qvgAAAABJRU5ErkJggg=="

export default class History extends React.Component {
  state = {
    layout: "grid",
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
    const items = JSON.parse(localStorage.getItem("history")) || []
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
            <img title="批量下载" src={ IconDownload } />
            <img title="清除历史" src={ IconRemove } />
          </div>
        </header>

        {
          items.length === 0 ?
            <p className="history__tip">
            暂时没有任何上传记录
            </p>
            :
            <div
              className={ this.state.layout === "grid" ? "history__grid-items" : "history__list-items" }
            >
              { this.renderItems(items) }
            </div>
        }
      </div>
    )
  }
}
