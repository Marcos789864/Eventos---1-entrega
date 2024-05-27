import UserRepository from "../repositories/users-repository";
import { Jwt } from "jsonwebtoken";

export default class UserService
{
    generateJwtToken = (userId) => {
    return jwt.sign({ userId }, 'secreto'); // Aquí 'secreto' es tu clave secreta, cámbiala por una más segura
    };

    loginUser = async (username, password) => 
    {  
        const user = await userRepository.getUserByUsername(username); 
        if (!user || user.password !== password) {
            throw new Error("Usuario o clave inválida.");
        }
        const token = generateJwtToken(user.id);
        return { success: true, message: "Usuario autenticado.", token };
    };

    createAsync = async (username, password) => 
    {
        const repo = new UserRepository();
        const success = await repo.createUser(entity);
        return success;
    }
}