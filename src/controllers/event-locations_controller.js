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

  router.post("",MIDLEWARE.authMiddelware ,async (req,res) =>
  {
    try
    {
        const location = await svcl.getLocationsById(req.body.id_location);
        const event_location = await svc.createEventLocation(req.body);
        if (event_location != null) {
            return res.status(200).json(event_location);
        } else {
            return res.status(500).send('Error interno');
        }
    }
    catch
    {
        return res.status(500).send('Error interno');
    }
  })


export default router;