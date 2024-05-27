import {Router} from 'express';
import LogHelper from '../helpers/validacion-helper.js';
import ProvinceService from '../services/locations-service.js';
const router = Router();
const svc = new ProvinceService();


router.get('/:id/locations', async (req,res) =>
{
    try {
        const Location = await svc.getLocationsByIdProvince(req.params.id);
        if (Location != null) {
            return res.status(200).json(Location);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        LogHelper.logError(error);
        return res.status(500).send('Error interno.');
    }

});