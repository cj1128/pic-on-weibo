/*
* @Author: dingxijin
* @Date:   2016-03-24 12:22:22
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-03-31 18:56:25
*/

import "./app.styl"
import React from "react"
import Upload from "components/upload"
import History from "components/history"
import cx from "classnames"

export default class App extends React.Component {
  state = {
    tab: "upload",
  }

  render() {
    return (
      <div className="app">
        <div className="app__tab">
          <span
            className={ cx({"app__tab__current": this.state.tab === "upload"}) }
            onClick={ () => this.setState({tab: "upload"}) }
          >
            上传
          </span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span
            className={ cx({"app__tab__current": this.state.tab === "history"}) }
            onClick={ () => this.setState({tab: "history"}) }
          >
            历史
          </span>
        </div>
        {
          this.state.tab === "upload" ?
            <Upload />
            :
            <History />
        }
      </div>
    )
  }
}
