import {http} from '@/utils/http'
 
type LoginwxParams ={
    code:string
    encryptedData:string
    iv:string
}

type LoginpasswordParams={
  username:string
  password:string
}

/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinAPI = (data: LoginwxParams) => {
    return http({
      method: 'POST',
      url: '/user/signIn',
      data,
    })
  }

  export const postLoginPasswordAPI = (data: LoginpasswordParams) => {
    return http({
      method: 'POST',
      url: '/user/signIn',
      data,
    })
  }