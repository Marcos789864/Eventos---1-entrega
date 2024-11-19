import jwt from 'jsonwebtoken';
import userRepository from '../repositories/users_repository.js'


export default class MWD
{

    authMiddelware = async (req,res,next) =>
        {
            let token = req.headers.authorization;
            try
            {
                console.log('Authorization Header:', req.headers.authorization);

                let noBearer = token.slice(7)
                let payload = await jwt.verify(noBearer,'ChinoMarcos');
                req.user = payload;
                console.log(req.user);
                if(payload != null){
                    next();
                }
                else{
                    return res.status(401).send("Token invalido1");
                }
            }catch(e)
            {
                console.log(e);
                return res.status(401).send("Token invalido2");
            }
        }
}