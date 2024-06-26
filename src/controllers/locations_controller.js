import {Router} from 'express';
import LocationService from '../services/locations_service.js';
const router = Router();
const svc = new LocationService();


router.get('/:id/eventLocation', async (req,res) =>
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
router.get('', async (req,res) =>
{
    try
    {
        const locations = await svc.getAllLocations();
        if (locations != null) {
            return res.status(200).json(locations);
        } else {
            return res.status(500).send('Error interno.');
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
});
export default router