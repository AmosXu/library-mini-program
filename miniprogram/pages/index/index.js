Page({
  data: {
    bookList: []
  },
  onLoad() {
    this.setData({
      db: wx.cloud.database()
    })
    this.getBookList()
  },
  goDetail(e) {
    let id  = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/bookDetail/index?id=${id}`
    })
  },
  getBookList() {
    const db = wx.cloud.database()
    db.collection('book').get().then((res) => {
      this.setData({
        bookList: res.data
      })
    })
  },
  putaway() {
    let that = this
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        wx.request({
          url: `https://douban.uieee.com/v2/book/isbn/${res.result}`,
          header: {
            'content-type': ' '
          },
          success(data) {
            let { author, pubdate, image, publisher, title, summary, price } = data.data
            const db = wx.cloud.database()
            db.collection('book').add({
              data: { author, pubdate, image, publisher, title, summary, price  }
            }).then(() => {
              that.getBookList()
              wx.showToast({
                title: "添加成功"
              })
            })
          }
        })
      }
    })
  }
})
