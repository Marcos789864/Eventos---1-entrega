import {Router} from 'express';
import ProvinceService from '../services/province-service.js';
const router = Router();
const svc = new ProvinceService();

router.get ('',async (req,res) =>{

let respuesta;
const returnArray = await svc.getAllAsync();
if(returnArray != null)
{
respuesta = res.status(200).json(returnArray);
}
else
{
    respuesta = res.status(500).send('Error interno.')
}
return respuesta;
})

router.get('/:id',async (req,res) =>
{
let respuesta;
const province = await svc.getByIdAsync(req.params.id);
if( province != null)
{
    respuesta = res.status(200).json(province);
}
else
{
    respuesta = res.status(500).send('Error interno.');
}
return respuesta;

})

router.post('',async (req,res) => {

    let objeto =  req.body;
    let respuesta;
    const province = await svc.createAsync(objeto);
    if( province != null)
    {
        respuesta = res.status(200).json(province);
    }
    else
    {
        respuesta = res.status(500).send('Error interno.');
    }
    return respuesta;
})

router.put('',async (req,res) =>{

    let objeto =  req.body; 
    let respuesta;
    const province = await svc.updateAsync(objeto);
    if( province != null)
    {
        respuesta = res.status(200).json(province);
    }
    else
    {
        respuesta = res.status(500).send('Error interno.');
    }
    return respuesta;
})

router.delete('/:id', async (req,res) => {

    let respuesta;
const province = await svc.deleteByIdAsync(req.params.id);
if( province != null)
{
    respuesta = res.status(200).json(province);
}
else
{
    respuesta = res.status(500).send('Error interno.');
}
return respuesta;
    
})

export default  router
