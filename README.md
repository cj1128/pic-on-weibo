#图床on微博

基于微博的图床。

**PS: 基于微博的图床优点是使用方便，登陆微博即可。但是缺点是对图片无法完全控制，同时接口不稳定。无法获取所有已上传图片的列表，无法删除上传的图片等。如果有这方面的需求，可以使用[图床on七牛](https://github.com/fate-lovely/pic-on-qiniu)，使用七牛作为存储空间，图片处于完全控制之中。**

![](http://ww1.sinaimg.cn/large/9b85365dgy1fcel5ctxmwg20z20gramg)



## 安装

### Chrome Web Store

[![Chrome Web Store](http://ww3.sinaimg.cn/large/5fd37818jw1eq7bx4bc4ej20c0038mx9.jpg)](https://chrome.google.com/webstore/detail/%E5%9B%BE%E5%BA%8Aon%E5%BE%AE%E5%8D%9A/opblldeehobgiedgjgamaklagilmkagc/related)

### 下载安装

点击仓库右上角的**Clone or download**下载仓库，打开Chrome[扩展程序设置页面](chrome://extensions/)，勾选**开发者模式**，将下载文件中的**chrome**文件夹拖入即可安装。

##功能

- 拖拽上传，复制上传（使用QQ截图以后可以直接使用Ctrl+V上传）
- 批量上传
- 浏览历史记录（存储在localStorage中）


**注意： 图片一旦上传，无法删除（可能一直保留到微博倒闭那天），请不要上传任何隐私图片。**


##开发

- `git clone https://github.com/fate-lovely/pic-on-weibo  `
- `cd pic-on-weibo`
- `npm install`
- `npm run dev`
- `npm run build  // 打包代码` 


**本地开发时，我们需要跨域调用微博上传接口，此时浏览器需要response header含有`Access-Control-Allow-Credentials`以及`Access-Control-Allow-Origin`这两个字段。这里使用[ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?utm_source=chrome-ntp-icon)插件来修改响应头。如图所示：**

![](http://ww3.sinaimg.cn/large/9b85365djw1f2f2e7te73j20gq07sq3f.jpg)

打包成chrome插件时，我们可以申请跨域请求权限。具体参考[chrome跨域](http://stackoverflow.com/questions/9421933/cross-origin-xmlhttprequest-in-chrome-extensions/9422216#9422216)

##说明

- 图片上传接口？

  图片上传使用的是[http://picupload.service.weibo.com/interface](http://picupload.service.weibo.com/interface) 接口。上传之前需要登录微博，上传的图片不会显示在你的微博相册中，也不会和你的任何微博挂钩，完全的“野生图片”。

- 换一台电脑没有历史记录？

  历史记录存在浏览器本地存储中。目前没有可靠办法跨设备存储历史记录。

- 上传错误？

  微博方面的接口可能不稳定或者修改返回数据结构。遇到这种情况，请[提Issues](https://github.com/fate-lovely/pic-on-weibo/issues)。



## 致谢

部分代码参考[WeiboPicBed](https://github.com/Suxiaogang/WeiboPicBed)，在此表示感谢。
