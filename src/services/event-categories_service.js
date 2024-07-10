import event_categoriesRepository from '../repositories/events_catogories-repository.js';
import validacion from "../helpers/validacion_helper.js";
const validar = new validacion();
export default class events_CategoriesService
{

    getAllCategories = async() =>
     {
    const repo = new event_categoriesRepository;
    const categories = await repo.getAllCateogories();
    return categories;
    };

    GetCategoryByid = async(id) =>
    {
    const repo = new event_categoriesRepository;
    const categoriesID = await repo.getCateogoryById(id);
    return categoriesID;
    };

    createCategory = async (entity) => {
        if (!entity.name || entity.name.length < 3) {
            return { success: false, statusCode: 400, message: "El nombre debe tener al menos 3 caracteres." };
        }
    
        const repo = new event_categoriesRepository();
        try {
            const result = await repo.createCategory(entity.name, entity.display_order);
            return { success: true, statusCode: 201, message: result };
        } catch (error) {
            console.error('Error en createCategory:', error);
            return { success: false, statusCode: 500, message: 'Error al crear la categoría.' };
        }
    }
    
    updateCategory = async (entity) => {
        if (!entity.name || entity.name.length < 3) {
            return { success: false, statusCode: 400, message: "El nombre debe tener al menos 3 caracteres." };
        }
    
        const repo = new event_categoriesRepository();
        try {
            const result = await repo.updateCategory(entity);
            return { success: true, statusCode: 200, message: result };
        } catch (error) {
            console.error('Error en updateCategory:', error);
            if (error.message === 'El id proporcionado no ha sido encontrado.') {
                return { success: false, statusCode: 404, message: error.message };
            }
            return { success: false, statusCode: 500, message: 'Error al actualizar la categoría.' };
        }
    }    
    
    deleteCategory = async (id) => {
        const repo = new event_categoriesRepository();
        try {
            const result = await repo.deleteCategory(id);
            return { success: true, statusCode: 200, message: result };
        } catch (error) {
            console.error('Error en deleteCategory:', error);
            return { success: false, statusCode: 500, message: 'Error al eliminar la categoría.' };
        }
    };
}
