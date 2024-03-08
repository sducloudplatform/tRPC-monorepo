//request[REQUEST_USER_KEY]可获取当前用户信息
//数据注入到req request[REQUEST_USER_KEY] = payload （guard中）
export const REQUEST_USER_KEY = 'user'

// 不需要校验 jwt 的 url 列表
export const trpcPassValidUrlList = [
    '/user.userSignIn',
    '/user.userSignUp',
 
  ];

export const trpcRefreshTokenUrl = '/user.refreshToken'

export const passValidUrlList = [

  '/user/signIn',
  '/user/signUp',
  '/user/getVerifyCode'

]
export const refreshTokenUrl = '/user/refreshToken'
