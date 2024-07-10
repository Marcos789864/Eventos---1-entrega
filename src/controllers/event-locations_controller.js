import {Router} from 'express';
import EventLocationService from '../services/events_locations_service.js';
import LocationService from '../services/locations_service.js';
import mdw from '../middelware/mdw.js';
const router = Router();
const svc =  new EventLocationService();
const svcl = new LocationService();

const MIDLEWARE = new mdw();

router.get("", MIDLEWARE.authMiddelware ,async (req,res) =>{

  try{
    const event_locations =  await svc.getAllLocations();
    if (event_locations != null) {
        return res.status(200).json(event_locations);
    } else {
        return res.status(500).send('Error interno.');
    }
  }
  catch{
    return res.status(500).send('Error interno.');
  }
    
})
router.get("/:id", MIDLEWARE.authMiddelware ,async (req,res) =>{

    try{
      const event_locations =  await svc.getByIdAsync(req.params.id,req.user.id);
      if (event_locations != null) {
          return res.status(200).json(event_locations);
      } else {
          return res.status(500).send('Idusuario incorrecto.');
      }
    }
    catch{
      return res.status(500).send('id del evento incorrecto');
    }
      
  })

  router.post("", MIDLEWARE.authMiddelware, async (req, res) => {
    try {
        const { name, full_address, max_capacity } = req.body;
        
        // Validar nombre y dirección
        if (!name || name.length < 3) {
            return res.status(400).send("El nombre está vacío o tiene menos de tres letras.");
        }

        if (!full_address) {
            return res.status(400).send("La dirección completa está vacía.");
        }

        if (max_capacity <= 0) {
            return res.status(400).send("La capacidad máxima debe ser mayor que cero.");
        }

        const event_location = await svc.createEventLocation(req.body, req.user.id);
        if (event_location) {
            return res.status(201).json(event_location);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        console.error('Error en POST /api/event-category/', error);
        return res.status(500).send('Error interno.');
    }
});

router.put("", MIDLEWARE.authMiddelware, async (req, res) => {
    try {
        const { id, name, full_address, max_capacity} = req.body;
        
        // Validar nombre y dirección
        if (!name || name.length < 3) {
            return res.status(400).send("El nombre está vacío o tiene menos de tres letras.");
        }

        if (!full_address) {
            return res.status(400).send("La dirección completa está vacía.");
        }

        if (max_capacity <= 0) {
            return res.status(400).send("La capacidad máxima debe ser mayor que cero.");
        }
        
        const result = await svc.getByIdAsync(id);
        if (result == null) {
            return res.status(404).send('El id es inexistente.');
        }

        const event_location = await svc.updateEventLocation(req.body, req.user.id);
        if (event_location) {
            return res.status(200).json(event_location);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        console.error('Error en PUT /api/event-category/', error);
        return res.status(500).send('Error interno.');
    }
});

router.delete("/:id", MIDLEWARE.authMiddelware, async (req, res) => {
    try {
        const event_location = await svc.deleteEventLocation(parseInt(req.params.id));
        if (event_location) {
            return res.status(200).json(event_location);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        console.error('Error en DELETE /api/event-category/:id', error);
        return res.status(500).send('Error interno.');
    }
});

export default router;