import {Router} from 'express';
import LogHelper from '../helpers/validacion-helper.js';
import EventsService from '../services/events-service.js';
const router = Router();
const svc = new EventsService();

router.get('', async (req,res) =>
{
    try
    {
        const events = await svc.getEvents();
        if (events != null) {
            return res.status(200).json(events);
        } else {
            return res.status(500).send('Error interno.');
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
});


router.get('/:name', async (req,res) =>
{
    try
    {
        const events = await svc.getEventByName(req.params.name);
        if (events != null) {
            return res.status(200).json(events);
        } else {
            return res.status(500).send('Error interno.');
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
});

router.get('/:category', async (req,res) =>
{
    try
    {
        const events = await svc.getEventByName(req.params.category);
        if (events != null) {
            return res.status(200).json(events);
        } else {
            return res.status(500).send('Error interno.');
        }
    }catch{
        LogHelper.logError(error);
        return res.status(500).send('Error interno.');
    }
});

export default router





