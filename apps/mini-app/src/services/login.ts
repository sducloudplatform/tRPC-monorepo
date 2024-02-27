import {http} from '@/utils/http'
 
type LoginParams ={
    code:string
    encryptedData:string
    iv:string
}

/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinAPI = (data: LoginParams) => {
    return http({
      method: 'POST',
      url: '/login/wxMin',
      data,
    })
  }