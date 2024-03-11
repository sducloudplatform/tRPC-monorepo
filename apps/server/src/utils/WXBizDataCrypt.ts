import * as crypto from 'crypto'

export function WXBizDataCrypt(appId:any,sessionKey:any):void {
    this.appId=appId;
    this.sessionKey=sessionKey;
    
}
WXBizDataCrypt.prototype.decryptData =function(encryptedData:any,iv:any):any{
    var sessionKey = new Buffer(this.sessionKey,'base64')
    encryptedData=new Buffer(encryptedData,'base64')
    iv=new Buffer(iv,'base64')

    try{

        var decipher=crypto.createDecipheriv('aes-128-cbc',sessionKey,iv)

        decipher.setAutoPadding(true)
        var decoded=decipher.update(encryptedData,'binary','utf8')
        decoded+=decipher.final('utf8')

        decoded=JSON.parse(decoded)



        




    }catch(err){

        throw new Error('Illegal Buffer')
    }

    return decoded;

}