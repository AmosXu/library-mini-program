Page({
  data: {
    bookList: [],
    page: 0,
    pageSize: 20,
    totalCount: 0,
  },
  onLoad() {
    this.setData({
      db: wx.cloud.database()
    })
    this.getBookList()
    this.getListCount()
  },
  goDetail(e) {
    let id  = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/bookDetail/index?id=${id}`
    })
  },

  /**
   * 获得书的列表
   */
  getBookList() {
    const db = wx.cloud.database()
    //因为skip的参数不能为0,所以只能这样判断
    if (this.data.page === 0) {
      db.collection('book')
      .limit(this.data.pageSize)
      .get()
      .then((res) => {
        this.setData({
          bookList: res.data
        })
      })
    } else {
      db.collection('book')
      .skip(this.data.page * this.data.pageSize)
      .limit(this.data.pageSize)
      .get()
      .then((res) => {
        let bookList = this.data.bookList
        bookList.push(res.data)
        this.setData({
          bookList: bookList
        })
      })
    }
  },

  /**
   * 获得书的总数
   */
  getListCount() {
    const db = wx.cloud.database()
    db.collection('book').count().then(res => {
      this.setData({
        totalCount: res.total
      })
    })
  },
  
  /**
   * 通过豆瓣接口，扫码获得书的信息
   */
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
              data: { author, pubdate, image, publisher, title, summary, price}
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
  },
  //到达底部加载
  onReachBottom() {
    if ((this.data.page + 1) * this.data.pageSize < this.data.totalCount) {
      this.setData({
        page: ++this.data.page
      })
      this.getBookList()
    }
  },
})
