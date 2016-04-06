#图床on微博

[![Chrome Web Store](http://ww3.sinaimg.cn/large/5fd37818jw1eq7bx4bc4ej20c0038mx9.jpg)](https://chrome.google.com/webstore/detail/%E5%9B%BE%E5%BA%8Aon%E5%BE%AE%E5%8D%9A/opblldeehobgiedgjgamaklagilmkagc/related)



![](http://ww4.sinaimg.cn/large/9b85365djw1f2my3gabqtg211u0iwkjq.gif)



##功能

- 拖拽上传，复制上传
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



## 致谢

部分代码参考[WeiboPicBed](https://github.com/Suxiaogang/WeiboPicBed)，在此表示感谢。