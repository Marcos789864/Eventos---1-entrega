import {Router} from 'express';
import UserService from '../services/users_service.js';
const router = Router();
const svc = new UserService();

router.post('/login', async (req, res) => {
        
        const user = await svc.login(req.body.username,req.body.password);
        if (user != null) {
            return res.status(200).json(user);
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

export default router