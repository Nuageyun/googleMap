import Cookie from 'js-cookie'

const TOKEN_NAME = 'token'

export const getAuthToken = () => {
  return Cookie.get(TOKEN_NAME)
}

export const setAuthToken = token => {
  Cookie.set(TOKEN_NAME, token, { expires: 7 })
}

export const removeAuthToken = () => {
  Cookie.remove(TOKEN_NAME)
}
