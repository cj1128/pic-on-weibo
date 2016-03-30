#图床on微博



##功能

- 拖拽上传，复制上传
- 批量上传
- 浏览历史记录（存储在localStorage中）
- 导出历史记录



**注意： 图片一旦上传，无法删除（可能一直保留到微博倒闭那天），请不要上传任何隐私图片。**




##开发

- `git clone`
- `npm install`
- `npm run dev`



**本地开发时，我们需要跨域调用微博上传接口，此时浏览器需要response header含有`Access-Control-Allow-Credentials`以及`Access-Control-Allow-Origin`这两个字段。这里使用[ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?utm_source=chrome-ntp-icon)插件来修改响应头。如图所示：**

![](http://ww3.sinaimg.cn/large/9b85365djw1f2f2e7te73j20gq07sq3f.jpg)

打包成chrome插件时，我们可以申请跨域请求权限。具体参考[chrome跨域](http://stackoverflow.com/questions/9421933/cross-origin-xmlhttprequest-in-chrome-extensions/9422216#9422216)



##说明

- 图片上传接口？

  图片上传使用的是[http://picupload.service.weibo.com/interface](http://picupload.service.weibo.com/interface) 这个接口。上传之前需要登录微博，上传的图片不会显示在你的微博相册中，也不会和你的任何微博挂钩，完全的“野生图片”。

- 换一台电脑没有历史记录？

  历史记录存在浏览器本地存储中。目前没有可靠办法跨设备存储历史记录。

  ​

  ​