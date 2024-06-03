import jwt from 'jsonwebtoken';
const secretKey= 'ClaveSecreta2000$';
const options = 
{
    expiresIn : '1h',
    issuer: 'mi_organizacion'
}
class Token
{

    constructor(secretKey)
    {
        this.secretKey = secretKey;
    }
    
    async desencriptar(token) {
        let payloadOriginal = null;
        try{
            payloadOriginal = await jwt.verify(token, secretKey);
        }
        catch(e){
            console.log(e);
        }
        return payloadOriginal;
    }

}

module.exports = Token;