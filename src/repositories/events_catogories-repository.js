import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class events_categories
{
    getAllCateogories = async() =>{
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_categories';
            const result = await client.query(sql);
            
            await client.end();
            return result.rows
        } 
        catch (error) {
          return  console.log(error);
        }
    }

    getCateogoryById = async(id) =>{
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_categories WHERE id = $1';
            const result = await client.query(sql,[id]);
            await client.end();
            return result.rows[0];
        } 
        catch (error) {
            return console.log(error);
        }
    }

    createCategory = async (name, display_order) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'INSERT INTO event_categories(name, display_order) VALUES($1, $2)';
            await client.query(sql, [name, display_order]);
            await client.end();
            return "Categoría creada exitosamente.";
        } catch (error) {
            console.error('Error en createCategory:', error);
            await client.end();
            throw new Error('Error al crear la categoría.');
        }
    }
    
    updateCategory = async (entity) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'UPDATE event_categories SET name = $1, display_order = $2 WHERE id = $3';
            const result = await client.query(sql, [entity.name, entity.display_order, entity.id]);
            await client.end();
            if (result.rowCount === 0) {
                throw new Error('El id proporcionado no ha sido encontrado.');
            }
            return "Categoría actualizada exitosamente.";
        } catch (error) {
            console.error('Error en updateCategory:', error);
            await client.end();
            throw new Error('Error al actualizar la categoría.');
        }
    }    
    
    deleteCategory = async (id) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM event_categories WHERE id = $1';
            const result = await client.query(sql, [id]);
            await client.end();
            if (result.rowCount === 0) {
                throw new Error('El id proporcionado no ha sido encontrado.');
            }
            return "Categoría eliminada exitosamente.";
        } catch (error) {
            console.error('Error en deleteCategory:', error);
            await client.end();
            throw new Error('Error al eliminar la categoría.');
        }
    }
}