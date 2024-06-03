import {Router} from 'express';
import JwtHelper from '../helpers/jwtoken.js';
import UserService from '../services/user-service.js';
const router = Router();
const svc = new UserService();

router.post('/login', async (req, res) => {
    
    try {
        const user = await svc.getUserByUsername(req.body);
        if (user != null) {
            return res.status(200);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        LogHelper.logError(error);
        return res.status(500).send('Error interno.');
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = await svc.createAsync(req.body);
        if (user) {
            return res.status(200).send('Created');
        }
    } catch (error) {
        LogHelper.logError(error);
        return res.status(500).send('Error interno.');
    }
});

export default  router