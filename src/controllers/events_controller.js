import {Router} from 'express';
import EventsService from '../services/events_service.js';
import events_enrollmentsService from '../services/events_enrollments-service.js';
import mdw from '../middelware/mdw.js';
const router = Router();
const svc = new EventsService();
const svcE = new events_enrollmentsService();
const MIDLEWARE = new mdw();


//Ejercicio 2
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

//Ejercicio 3
router.get('/params/', async (req, res) => {
    try {
        const query = req.query;

        const events = await svc.getEvent(query);

        if (events != null) {
            return res.status(200).json(events);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno.');
    }
});

//Ejercicio 4
router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id;

        const event = await svc.getEventDetail(id);

        if (event != null) {
            return res.status(200).json(event);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno.');
    }
});

//Ejercicio 5
router.get('/:id/enrollment', async (req, res) => {
    
    try {
        const eventId = req.params.id;
        const query = { eventId };

        if (req.query.first_name) query.first_name = req.query.first_name;
        if (req.query.last_name) query.last_name = req.query.last_name;
        if (req.query.username) query.username = req.query.username;
        if (req.query.attended !== undefined) query.attended = req.query.attended === 'true';
        if (req.query.rating) query.rating = parseInt(req.query.rating, 10);

        const users = await svcE.getUserFromEvent(query);

        if (users.length > 0) {
            return res.status(200).json(users);
        } else {
            return res.status(404).send('No se encontraron usuarios con los criterios dados.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno.');
    }
});

router.post('', MIDLEWARE.authMiddelware, async (req,res) =>
{
    let cuerpo = req.body;
    try
    {
        const events = await svc.createEvent(cuerpo);
        if (events == true) {
            return res.status(200).json("Creacion exitosa");
        } else {
            return res.status(500).send(events);
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
})

router.put('',async (req,res) =>{
    try
    {
        const events = await svc.updateEvent(req.body);
        if (events == true) {
            return res.status(200).json("Modificacion exitosa");
        } else {
            return res.status(500).send(events);
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
    
})

export default router