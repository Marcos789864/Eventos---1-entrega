import UserRepository from "../repositories/users_repository.js";
import jwt from 'jsonwebtoken'
import validacion from "../helpers/validacion_helper.js";

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

    register = async (entity) => 
    {
        const repo = new UserRepository();
        const validar = new validacion();

        if(entity.first_name.length < 3 || entity.last_name.length < 3 || entity.password.length < 3)
        {
            return "El nombre o el apellido o la contraseña, es nulo o posee menos de 3 caracteres";
        }
        else if(!validar.validarEmail(entity.username))
        {
            return "El email no es valido";
        }
        else
        {
            const success = await repo.createUser(entity);
            return "Created";
        }
        
    }
}