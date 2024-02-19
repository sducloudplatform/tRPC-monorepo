import { registerAs } from '@nestjs/config'

export default registerAs('redis', () => {
  return {
        port:process.env.REDIS_PORT,
        host:process.env.REDIS_HOST,
        password:process.env.REDIS_PASSWORD,
        db:process.env.REDIS_DB,
        ttl:parseInt(process.env.REDIS_TTL||'')
  }
})
