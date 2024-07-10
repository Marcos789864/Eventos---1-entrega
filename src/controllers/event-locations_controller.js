import {Router} from 'express';
import EventLocationService from '../services/events_locations_service.js';
import mdw from '../middelware/mdw.js';
const router = Router();
const svc =  new EventLocationService();
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


export default router;