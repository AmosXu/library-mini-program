# 基于小程序云开发的一个图书管理系统
## 目前已经实现的功能
#### 1.扫码上传图书
#### 2.从数据库拿出图书并展示
#### 3.微信授权获得用户信息，头像和用户名
#### 4.编辑用户信息

## 项目运行
#### 1.依次进入云函数的目录下执行npm install（/cloudfuntions/getUser下）
#### 2.将云函数上传并部署
#### 3.在数据库中新建集合“book”和“user”


## 项目效果
![](https://dn-testimage.qbox.me/Files/a9/17/a9175bb7b0f3496af9ec0fd6ada2b362bc7638a2_75236.png)![](https://dn-testimage.qbox.me/Files/5a/6f/5a6faaa0b60e5a40d355b360a3df904a6fb55f1d_29619.png)

## 接下来要实现的功能
#### 1.删除图书
#### 2.发送模板消息（目前云函数这还不支持这个功能，不过马上要完善了）
#### 3.申请借书功能
#### 4.同意借书功能
#### 5.修改图书信息等等

## 参考文档
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
