import store from '../../store'
import { AUTH_WHITE_LIST } from '../../constants/config'

// 分支流的route next() 必须放在else中 ，否则会永远命中
export default (to, from, next) => {
  console.log(store.state.user_info)
  if (~AUTH_WHITE_LIST.indexOf(to.name)) {
    next()
  } else if (!Object.keys(store.state.user_info).length) {
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
