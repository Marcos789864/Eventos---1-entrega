import {Router} from 'express';
import UserService from '../services/users_service.js';
const router = Router();
const svc = new UserService();

//Ejercicio 6 Start
router.post('/login', async (req, res) => {
        
        const user = await svc.login(req.body.username,req.body.password);
        if (user != null) {
            if(user.respuesta.succes = true){
                return res.status(200).json(user);
            }
            else{
                return res.status(400).json(user);
            }
        } else {
            return res.status(401).json(user);
        }
});

router.post('/register', async (req, res) => {
    
    const user = await svc.register(req.body);
        if (user != null) {
            return res.status(200).send(user);
        }
        else
        {
            return res.status(500).send('Error interno.');
        }
});
//Ejercicio 6 End



export default router