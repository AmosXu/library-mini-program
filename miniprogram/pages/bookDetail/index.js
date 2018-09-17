Page({
  data: {
    bookId: '',
    book: {}
  },
  onLoad(option) {
    this.setData({
      bookId: option.id
    })
    this.getBookDetail()
  },
  getBookDetail() {
    const db = wx.cloud.database()
    db.collection('book').doc(this.data.bookId).get().then((res) => {
      this.setData({
        book: res.data
      })
    })
  }
})
