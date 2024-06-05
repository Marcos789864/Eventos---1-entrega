import jwt from 'jsonwebtoken';
import userRepository from '../repositories/users_repository.js'


export default class MWD
{
    authMiddelware = async (req,res,next) =>
    {
        desencriptado = async (req,res,next) =>
        {
            const noBearer = (req.headers.authorizations).slice(7);
            let payload;
            try
            {
                payload = await jwt.verify(noBearer,'ChinoMarcos');
            }catch(e)
            {
                console.log(e);
                return res.status(401).send("Token invalido");
            }
            req.user = payload;
            next();
        }
    }
}