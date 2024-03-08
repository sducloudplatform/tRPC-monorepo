/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { smsConfig } from './verificationcode.config';

import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
// import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
// import Util, * as $Util from '@alicloud/tea-util';
// import * as $tea from '@alicloud/tea-typescript';

@Injectable()
export class VerificationCodeService {
  constructor() {}
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  private createClient(
    accessKeyId: string,
    accessKeySecret: string,
  ): Dysmsapi20170525 {
    const config = new $OpenApi.Config({
      accessKeyId: accessKeyId, // AccessKey ID
      accessKeySecret: accessKeySecret, //AccessKey Secret
    });
    // 服务地址：Endpoint 参考 https://api.aliyun.com/product/Dysmsapi
    config.endpoint = `dysmsapi.aliyuncs.com`;
    return new Dysmsapi20170525(config);
  }

  async sendVerificationCode(phone:string): Promise<any> {
    // 生成4位数验证码，最大为9999
    let code: number = 0;
    code = Math.floor(Math.random() * 10000);
    if (code < 1000) {
      code = code + 1000; //保证随机数的位数足够4位
    }
    // 实例化一个客户端
    const client = this.createClient(
      process.env['ALIBABA_CLOUD_ACCESS_KEY_ID']||'',
      process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET']||'',
    );
    // 创建对应 API 的 Request
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      phoneNumbers: phone,
      signName: smsConfig.signName,
      templateCode: smsConfig.verificationTemplateCode,
      templateParam: `{ code: ${code}}`,
    });
    //返回的结果对象
    const toResult = {
      isOk: false,              // 验证码是否发送成功
      phoneNumber: phone,       // 发送验证码的手机号码
      verificationCode: code,   // 验证码
      message: '',              // 打印返回的信息，验证码发送失败显示错误信息
    };
    try {
      // 通过 client 对象获得对应 request 响应 response 。
      const response = await client.sendSms(sendSmsRequest);
      // console.log(response.body);
      
      console.log("vody.code"+response.body.code)
      if (response.body.code === 'OK') {
        toResult.isOk = true;
      }
      return toResult;
    } catch (err) {
      toResult.message = err.data.Message;
      // console.log(err);
      return toResult;
    }
  }
}
