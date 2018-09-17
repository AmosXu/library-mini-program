Page({
  data: {
    user: {
      avatar: "./images/user-unlogin.png",
      name: "点击获得用户名",
      number: '',
      address: '',
      _id: 0
    }
  },
  onLoad() {
    this.getUserInfo()
  },
  onGetUserInfo(e) {
    let user = this.data.user
    user.avatar = e.detail.userInfo.avatarUrl
    user.name = e.detail.userInfo.nickName
    this.setData({ user })
    this.saveUserInfo()
  },
  saveUserInfo() {
    wx.cloud.callFunction({
      name: 'saveUser',
      data: this.data.user,
    })
  },
  getUserInfo() {
    wx.cloud.callFunction({
      name: 'getUser',
    }).then((res) => {
      if (res.result.data.length) {
        this.setData({
          user: res.result.data[0]
        })
      }
    })
  },
  numberConfirm(e) {
    this.setData({
      'user.number': e.detail.value
    });
    console.log(this.data.user)
    this.saveUserInfo()
  },
  addressConfirm(e) {
    this.setData({
      'user.address': e.detail.value
    });
    this.saveUserInfo()
  }
})
