import UserRepository from "../repositories/users_repository.js";
import jwt from '../modules/jsonwebtoken.js';

export default class UserService
{
    
    login = async (user,password) =>
    {
        console.log("entre")

        let returnObject = {
            success: false,
            message: "Error de login",
            token: ""
        }
        const repo = new UserRepository();
        const usuario = await repo.getUserByUsername(user);
        if(usuario != null)
        {
            
            console.log(usuario);

            if(usuario.password == password)
            {
                returnObject.success = true;
                returnObject.message = "Exito";
                returnObject.token = jwt.generateJwtToken(usuario);
            }
            else
            {
                returnObject.message = "Contraseña incorrecta";
            }
        }
        else
        {
            returnObject.message = "No existe el usuario"
        }
    };

    createAsync = async (entity) => 
    {
        const repo = new UserRepository();
        const success = await repo.createUser(entity);
        return success;
    }
}