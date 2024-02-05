//jwt的配置信息
import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    // accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '60000', 10),
    // accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL),
  }
})



// iss: jwt签发者
// sub: jwt所面向的用户
// aud: 接收jwt的一方
// exp: jwt的过期时间，这个过期时间必须要大于签发时间
// nbf: 定义在什么时间之前，该jwt都是不可用的.
// iat: jwt的签发时间
// jti: jwt的唯一身份标识，主要用来作为一次性token。