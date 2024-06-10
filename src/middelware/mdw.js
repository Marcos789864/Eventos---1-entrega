import jwt from 'jsonwebtoken';
import userRepository from '../repositories/users_repository.js'


export default class MWD
{
    quitarBearer  = (header) =>
    {
        let noBearer = header;
        if (header && header.startsWith('Bearer ')){
            noBearer = header.slice(7);
        }
        return noBearer;
    }



    authMiddelware = async (req,res,next) =>
        {
            try
            {
                let noBearer = quitarBearer(req.headers.authorization);
                payload = await jwt.verify(noBearer,'ChinoMarcos');
                if(payload != null){
                    next();
                }
                else{
                    return res.status(401).send("Token invalido");
                }
            }catch(e)
            {
                console.log(e);
                return res.status(401).send("Token invalido");
            }
            req.user = payload;
        }
}