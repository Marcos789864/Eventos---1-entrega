import UserRepository from "../repositories/users_repository.js";
import jwt from 'jsonwebtoken'
import validacion from "../helpers/validacion_helper.js";
const validar = new validacion();

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
        if(validar.validarEmail(username))
        {   
            const usuario = await repo.getUserByUsername(username,password);
            if(usuario != null){
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
                respuesta.token = token;
                return respuesta;
            }
        }
        else
        {
            respuesta.success = false;
            respuesta.message = "El mail es invalido",
            respuesta.token = "";
            return respuesta;
        }
    };

    register = async (entity) => 
    {
        let success = false;
        const repo = new UserRepository();

        if(!validar.validarEmail(entity.username))
        {
            return success, "El email es sintacticamente invalido.";
        }
        else if (entity.password.lentgh < 3){
            return success, "La contraseña cuenta con menos de 3 caracteres."
        }
        else
        {
            success = await repo.createUser(entity);
            return success, "Created";
        }
        
    }
}