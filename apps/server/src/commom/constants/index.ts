//request[REQUEST_USER_KEY]可获取当前用户信息
//数据注入到req request[REQUEST_USER_KEY] = payload （guard中）
export const REQUEST_USER_KEY = 'user'

// 不需要校验 jwt 的 url 列表
<<<<<<< HEAD
export const trpcPassValidUrlList = [
=======
export const passValidUrlList = [
>>>>>>> 834b01fd14c1c358e74c3bc31406d14871b63d8d
    '/user.userSignIn',
    '/user.userSignUp',
 
  ];

<<<<<<< HEAD
export const trpcRefreshTokenUrl = '/user.refreshToken'

export const passValidUrlList = [

  '/user/signIn',
  '/user/signUp'

]
export const refreshTokenUrl = '/user/refreshToken'
=======
export const refreshTokenUrl = '/user.refreshToken'
>>>>>>> 834b01fd14c1c358e74c3bc31406d14871b63d8d
