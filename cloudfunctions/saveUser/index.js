const cloud = require('wx-server-sdk')
// 默认配置
cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  try {
    let { avatar, address, name, number } = event
    if (event._id) {
      return await db.collection('user').doc(event._id).update({
        // data 传入需要局部更新的数据
        data: { avatar, address, name, number }
      })
    } else {
      return await db.collection('user').add({
        data: {
          avatar, address, name, number,
          _openid: event.userInfo.openId
        }
      })
    }
  } catch(e) {
    console.error(e)
  }
}
