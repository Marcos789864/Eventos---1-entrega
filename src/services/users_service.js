import UserRepository from "../repositories/users_repository.js";
import jwt from 'jsonwebtoken'

export default class UserService
{
    
    login = async (username,password) =>
    {
        let respuesta =
        {
            success: false,
            message: "Error de login",
            token: ""
        }
        const repo = new UserRepository();
        const usuario = await repo.getUserByUsername(username,password);
        if(usuario != null)
        {    
            
            const payload = 
            {
                id: usuario.id,
                username: usuario.username 
            }
            const options = 
            {
                expiresIn : '1h',
            }
            const token = jwt.sign(payload,"ChinoMarcos",options);  
            respuesta.success = true;
            respuesta.message = "Login exitoso",
            respuesta.token = token
            return respuesta;
        }
        else
        {
            return "No existe el usuario";
        }
    };

    createAsync = async (entity) => 
    {
        const repo = new UserRepository();
        const success = await repo.createUser(entity);
        return success;
    }
}