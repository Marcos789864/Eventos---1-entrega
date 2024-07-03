import {Router} from 'express';
import ProvinceService from '../services/provinces_service.js';
const router = Router();
const svc = new ProvinceService();

//Ejercicio 7 Start
router.get('', async (req, res) => {
    try {
        const returnArray = await svc.getAllProvinces();
        if (returnArray != null) {
            return res.status(200).json(returnArray);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        return res.status(500).send('Error interno.');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const province = await svc.getById(req.params.id);
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

router.get('/:id/locations', async (req,res) =>
{
    try {
        const province = await svc.getLocationsById(req.params.id);
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
        console.log(req.body);
        if (req.body.name.length < 3) {
            return res.status(400).send('Nombre vacio o menos de 3 letras.')
        } 
        else if(!Number.parseFloat(req.body.latitude) || !Number.parseFloat(req.body.longitude)){
            return res.status(400).send('Latitud o Longitud no son numeros.')
        }
        else {
            const province = await svc.postProvince(req.body);
            return res.status(200).json(province);
        }
    } catch (error) {
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

export default router
