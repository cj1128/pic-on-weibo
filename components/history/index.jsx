/*
* @Author: CJ Ting
* @Date:   2016-04-01 14:39:09
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-04-06 12:27:18
*/

import "./style"
import React from "react"
import Clipboard from "clipboard"
import { IconCopy, IconRemove } from "utils"
import swal from "sweetalert"
import { getItems, clearItems } from "history"
import toastr from "toastr"

function formateTime(ts) {
  if(ts == null) {
    return "-"
  }
  const d = new Date(ts)
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
}

export default class History extends React.Component {
  componentDidMount() {
    this.clipboard = new Clipboard(".history__grid__item", {
      text: function(trigger) {
        return trigger.children[0].getAttribute("src")
      },
    })
    this.clipboard.on("success", function(e) {
      toastr.success("拷贝成功")
    })
    this.clipboard.on("error", function() {
      toastr.error("拷贝失败")
    })
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  clearHistory = () => {
    swal({
      title: "确定清除所有历史记录吗?",
      type: "warning",
      showCancelButton: true,
    }, isConfirmed => {
      if(isConfirmed) {
        clearItems()
        this.forceUpdate()
      }
    })
  }

  renderItem(item, index) {
    // compatible with old format
    const url = item.url || item.large
    return (
      <div key={ index } className="history__grid__item">
        <img src={ url } />
        <div className="history__grid__item-info">
          <p>
            { formateTime(item.timestamp) }
          </p>
        </div>
      </div>
    )
  }

  renderGrid(items) {
    const data1 = items.filter((d, i) => i % 3 === 0)
    const data2 = items.filter((d, i) => i % 3 === 1)
    const data3 = items.filter((d, i) => i % 3 === 2)
    return (
      <div className="history__items">
        <div
          className="history__grid"
        >
          { data1.map(this.renderItem) }
        </div>
        <div
          className="history__grid"
        >
          { data2.map(this.renderItem) }
        </div>
        <div
          className="history__grid"
        >
          { data3.map(this.renderItem) }
        </div>
      </div>
    )
  }

  render() {
    const items = getItems()
    return (
      <div className="history">
        <div className="history__btns">
          <img
            src={ IconRemove }
            onClick={ this.clearHistory }
          />
        </div>
        {
          items.length === 0 ?
            <p className="history__tip">
              目前没有任何上传记录
            </p>
            :
            this.renderGrid(items)
        }
      </div>
    )
  }
}
