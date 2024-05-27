import {Router} from 'express';
import LogHelper from '../helpers/validacion-helper.js';
import UserService from '../services/user-service.js';
const router = Router();
const svc = new UserService();

router.post('', async (req, res) => {
    try {
        const province = await svc.createAsync(req.body);
        if (province != null) {
            return res.status(200).json(province);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        LogHelper.logError(error);
        return res.status(500).send('Error interno.');
    }
});

router.post('', async (req, res) => {
    try {
        const province = await svc.createAsync(req.body);
        if (province != null) {
            return res.status(200).json(province);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        LogHelper.logError(error);
        return res.status(500).send('Error interno.');
    }
});

export default  router