import {Router} from 'express';
import ProvinceService from '../services/province_service.js';
const router = Router();
const svc = new ProvinceService();

//Ejercicio 7 Start
router.get('', async (req, res) => {
    try {
        const returnArray = await svc.getAllAsync();
        if (returnArray != null) {
            return res.status(200).json(returnArray);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        LogHelper.logError(error);
        return res.status(500).send('Error interno.');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const province = await svc.getByIdAsync(req.params.id);
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

router.put('', async (req, res) => {
    try {
        const province = await svc.updateAsync(req.body);
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

router.delete('/:id', async (req, res) => {
    try {
        const province = await svc.deleteByIdAsync(req.params.id);
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
//Ejercicio 7 End

router.get('/:id/locations', async (req,res) =>
{
    try {
        const province = await svc.getLocationsByIdProvince(req.params.id);
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
