import { AUTH_WHITE_LIST } from '../../constants/config'
import { getAuthToken } from '../../constants/cookie'
// 分支流的route next() 必须放在else中 ，否则会永远命中
export default (to, from, next) => {
  console.log('!getAuthToken()', !getAuthToken())
  if (~AUTH_WHITE_LIST.indexOf(to.name)) {
    next()
  } else if (!getAuthToken()) {
    next({
      name: 'login',
      // 防止无限跳转login本页
      query: {
        t: Math.random()
          .toString(16)
          .slice(2)
      }
    })
  } else {
    next()
  }
}
