import UserRepository from "../repositories/users-repository";
import { Jwt } from "jsonwebtoken";

export default class UserService
{
    generateJwtToken = (userId) => {
    return jwt.sign({ userId }, 'secreto'); // Aquí 'secreto' es tu clave secreta, cámbiala por una más segura
    };

    getUserByUsername = async (username, password) => 
    {  
        const repo = new UserRepository();
        const success = await repo.getUserByUsername(username,password);
        return success;
    };

    createAsync = async (entity) => 
    {
        const repo = new UserRepository();
        const success = await repo.createUser(entity);
        return success;
    }
}