import { Injectable } from '@nestjs/common';

import * as Client from 'ali-oss';
import * as dayjs from 'dayjs';


@Injectable()
export class OssService {
    async getSignature() {
        const config = {
            // OSS credentials
            accessKeyId: 'LTAI5t8sLiZzo942RKZiKJgE',
            accessKeySecret: 'lwK5RXB4mf9vvlG3f9fJRsqwyetrO7',
            // bucket name
            bucket: 'oss4zhimei',
            // dir
            dir: 'assets/models'
        }
        const client = new Client(config)
        const date = new Date()
        // expire time + 1 day
        date.setDate(date.getDate() + 1)

        const policy = {
            expiration: date.toISOString,
            conditions: [
                ['content-length-range', 0, 1048576000] // 1000M
            ]
        }

        // generate signature
        const formData = await client.calculatePostSignature(policy);

        // generate bucket location
        const location = await client.getBucketLocation(config.bucket);

        const host = `https://${config.bucket}.${location.location}.aliyuncs.com`;

        // return the upload information to the client
        return {
            expire: dayjs().add(1, 'day').unix().toString(),
            policy: formData.policy,
            signature: formData.Signature,
            accessId: formData.OSSAccessKeyId,
            host,
            dir: config.dir
        }
    }
}
