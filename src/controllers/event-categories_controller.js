import {Router} from 'express';
import events_CategoriesService from '../services/event-categories_service.js'
import mdw from '../middelware/mdw.js';
const router = Router();
const svc =  new events_CategoriesService();
const MIDLEWARE = new mdw();

//Ejercicio 12 Start
router.get('' ,async (req,res) =>
{
    try
    {
        const cateogries = await svc.getAllCategories()
        if (cateogries != null) {
            return res.status(200).json(cateogries);
        } else {
            return res.status(500).send('Error interno.');
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
});

router.get('/:id', async (req,res) => 
{
    const id = parseInt(req.params.id);
    try
{
    const cateogries = await svc.GetCategoryByid(id)
    if (cateogries != null) {
        return res.status(200).json(cateogries);
    } else {
        return res.status(404).send('Not Found.');
    }
}catch{
    return res.status(500).send('Error interno.');
}
});

router.post('', async (req, res) => {
    try {
        const category = await svc.createCategory(req.body);
        if (category.success) {
            return res.status(201).json(category.message);
        } else {
            return res.status(category.statusCode).send(category.message);
        }
    } catch (error) {
        console.error('Error en POST /api/categories', error);
        return res.status(500).send('Error interno.');
    }
});

router.put('', async (req, res) => {
    try {
        const category = await svc.updateCategory(req.body);
        if (category.success) {
            return res.status(200).json(category.message);
        } else {
            return res.status(category.statusCode).send(category.message);
        }
    } catch (error) {
        console.error('Error en PUT /api/categories', error);
        return res.status(500).send('Error interno.');
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const category = await svc.deleteCategory(id);
        if (category.success) {
            return res.status(200).json(category.message);
        } else {
            return res.status(category.statusCode).send(category.message);
        }
    } catch (error) {
        console.error('Error en DELETE /api/categories/:id', error);
        return res.status(500).send('Error interno.');
    }
});
//Ejercicio 12 End

export default router;